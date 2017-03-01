(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jiboProgrammingChallenge = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Btn {
    constructor(mainStage, sprites, btnkind, xpos, ypos, callbk) {
        this.buttonObject = {};
        this.onButtonDown = function (me, callback) {
            console.log("onButtonDown");
            this.isdown = true;
            this.texture = this.buttonObject[me + "_hit"];
            this.alpha = 1;
            callback();
        };
        this.onButtonUp = function (me) {
            console.log("onButtonUp");
            this.isdown = false;
            if (this.isOver) {
                this.texture = this.buttonObject[me + "_over"];
            }
            else {
                this.texture = this.buttonObject[me + "_up"];
            }
        };
        this.onButtonOver = function (me) {
            console.log("onButtonOver");
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            this.texture = this.buttonObject[me + "_over"];
        };
        this.onButtonOut = function (me) {
            console.log("onButtonOut");
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            this.texture = this.buttonObject[me + "_up"];
        };
        // create some textures from an image path
        this.stage = mainStage;
        this.name = btnkind;
        this.callback = callbk;
        this.sprites = sprites;
        console.log("btnname: " + this.name);
        this.buttonObject[this.name + "_up"] = this.sprites[this.name + "_up"];
        this.buttonObject[this.name + "_over"] = this.sprites[this.name + "_over"];
        this.buttonObject[this.name + "_hit"] = this.sprites[this.name + "_hit"];
        this.buttonObject['textureButton'] = this.sprites[this.name + "_up"];
        this.buttonObject['textureButton'].anchor.set(0.5);
        this.buttonObject['textureButton'].x = xpos;
        this.buttonObject['textureButton'].y = ypos;
        // make the button interactive...
        this.buttonObject['textureButton'].interactive = true;
        this.buttonObject['textureButton'].buttonMode = true;
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        this.buttonObject['textureButton']
            .on('pointerdown', this.onButtonDown.bind(this, this.name, this.callback))
            .on('pointerup', this.onButtonUp.bind(this, this.name))
            .on('pointerupoutside', this.onButtonUp.bind(this, this.name))
            .on('pointerover', this.onButtonOver.bind(this, this.name))
            .on('pointerout', this.onButtonOut.bind(this, this.name));
        // Use mouse-only events
        // .on('mousedown', onButtonDown)
        // .on('mouseup', onButtonUp)
        // .on('mouseupoutside', onButtonUp)
        // .on('mouseover', onButtonOver)
        // .on('mouseout', onButtonOut)
        // Use touch-only events
        // .on('touchstart', onButtonDown)
        // .on('touchend', onButtonUp)
        // .on('touchendoutside', onButtonUp)
        // add it to the stage
        this.stage.addChild(this.buttonObject['textureButton']);
    }
}
exports.Btn = Btn;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorPalettes {
    constructor() {
        this.loadColors = function (pindex) {
            this.paletteIndex = pindex;
            return new Promise(function (resolve, reject) {
                let url = 'src/colors.json';
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                var data;
                xhr.onload =
                    function () {
                        if (this.status >= 200 && this.status < 300) {
                            // Success!
                            data = JSON.parse(xhr.responseText);
                            let activePalette = data.colors[pindex];
                            resolve(activePalette);
                        }
                        else {
                            console.log("We reached our target server, but it returned an error");
                        }
                    };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                xhr.send();
            });
        };
    }
}
exports.ColorPalettes = ColorPalettes;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const Btn_1 = require("./Btn");
class Gui {
    constructor(mainStage, mainColors, mainSounds) {
        this.loader = new PIXI.loaders.Loader();
        this.sprites = {};
        this.rows = 10;
        this.cols = 10;
        this.spacing = 50;
        this.marks = [];
        this.loadImages = function () {
            //load images'
            this.loader = PIXI.loader
                .add('player_blue', 'src/graphics/player_blue.png')
                .add('mark_bracket', 'src/graphics/mark_bracket.png')
                .add('arrowup_up', 'src/graphics/arrowup_up.png')
                .add('arrowup_over', 'src/graphics/arrowup_over.png')
                .add('arrowup_hit', 'src/graphics/arrowup_hit.png')
                .on('complete', function (loader, resources) {
                this.sprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                this.sprites.mark_bracket = new PIXI.Sprite(resources.mark_bracket.texture);
                this.sprites.arrowup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.arrowup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.arrowup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.onLoadCompleted();
            }.bind(this));
            this.loader.load();
        };
        this.onLoadCompleted = function () {
            this.createGrid();
            this.createLine();
            this.createText();
            this.createButtons();
        };
        this.createButtons = function () {
            var rowsButton = new Btn_1.Btn(this.stage, this.sprites, "arrowup", 100, 100, function () {
                this.rows++;
                this.typeMe(this.rowsValue, this.rows.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
        };
        this.createPlayer = function () {
            //player
            this.player = this.sprites.player_blue;
            this.stage.addChild(this.player);
            this.player.position.x = 500;
            this.player.position.y = 500;
            this.sounds.play("start");
        };
        this.createGrid = function () {
            var container = new PIXI.Container();
            this.stage.addChild(container);
            let totalmarks = this.rows * this.cols;
            console.log(totalmarks);
            for (var i = 0; i < totalmarks; i++) {
                // console.log(;
                // console.log("x: " + Math.floor(i * this.rows) * this.spacing + "y: " + (i % this.cols) * this.spacing););
                var mark = this.sprites.mark_bracket;
                container.addChild(mark);
                mark.anchor.set(0.5);
                mark.x = (i % this.cols) * this.spacing; //(i % this.cols) * this.spacing;
                mark.y = Math.floor(i / this.rows) * this.spacing; //(i % this.cols) * this.spacing;
                // bunny.x = (i % 5) * 40;
                // bunny.y = Math.floor(i / 5) * 40;            mark.y = Math.floor(i / this.rows) * this.spacing;
                mark.scale.x = 1;
                mark.scale.y = 1;
            }
            // Center on the screen
            container.x = (this.stage.width - container.width) / 2;
            container.y = (this.stage.height - container.height) / 2;
            this.createPlayer();
        };
        this.createLine = function () {
            this.line = new PIXI.Graphics();
            // set a fill and line style
            this.line.lineStyle(0.5, this.colors.line, 0.5);
            // draw a shape
            this.line.moveTo(100, window.innerHeight - 70);
            this.line.lineTo(window.innerWidth - 100, window.innerHeight - 70);
            this.stage.addChild(this.line);
        };
        this.createText = function () {
            //text test
            let style = new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontSize: 18,
                fontStyle: 'normal',
                fontWeight: 'normal',
                fill: this.colors.font,
                // stroke: '#4a1850',
                // strokeThickness: 5,
                dropShadow: true,
                // dropShadowColor: '#000000',
                // dropShadowBlur: 4,
                // dropShadowAngle: Math.PI / 6,
                // dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            });
            let headline = new PIXI.TextStyle({
                fontFamily: 'Helvetica',
                fontSize: 18,
                fontStyle: 'normal',
                fontWeight: 'normal',
                fill: this.colors.headline,
                // stroke: '#4a1850',
                // strokeThickness: 5,
                dropShadow: false,
                // dropShadowColor: '#000000',
                // dropShadowBlur: 4,
                // dropShadowAngle: Math.PI / 6,
                // dropShadowDistance: 6,
                wordWrap: true,
                wordWrapWidth: 440
            });
            //status
            this.status = new PIXI.Text('...', headline);
            this.status.x = 110;
            this.status.y = window.innerHeight - 50;
            this.stage.addChild(this.status);
            this.typeMe(this.status, "Initializing...", 0, 2000);
            //rows title
            this.rowsTitle = new PIXI.Text('...', style);
            this.rowsTitle.x = 300;
            this.rowsTitle.y = window.innerHeight - 50;
            this.stage.addChild(this.rowsTitle);
            this.typeMe(this.rowsTitle, "rows:", 0, 3500);
            console.log(this.cols);
            console.log(typeof this.cols);
            //rows value
            this.rowsValue = new PIXI.Text('...', headline);
            this.rowsValue.x = 350;
            this.rowsValue.y = window.innerHeight - 50;
            this.stage.addChild(this.rowsValue);
            this.typeMe(this.rowsValue, this.rows.toString(), 0, 4000);
            //cols title
            this.colsTitle = new PIXI.Text('...:', style);
            this.colsTitle.x = 500;
            this.colsTitle.y = window.innerHeight - 50;
            this.stage.addChild(this.colsTitle);
            this.typeMe(this.colsTitle, 'cols:', 0, 4500);
            // //cols value
            this.colsValue = new PIXI.Text('...', headline);
            this.colsValue.x = 550;
            this.colsValue.y = window.innerHeight - 50;
            this.stage.addChild(this.colsValue);
            this.typeMe(this.colsValue, this.cols.toString(), 0, 5000);
            this.typeMe(this.status, "Ready", 0, 6000);
        };
        this.typeMe = function (textObj, message, messageLength, delay) {
            // console.log(message + ' | ' + messageLength);
            if (messageLength === undefined) {
                // console.log("starting type");
                textObj.text = "";
                messageLength = 0;
            }
            //loop through typing
            let newString = message.substring(0, messageLength);
            textObj.text = newString;
            if (messageLength > 1) {
                this.sounds.play("keypress");
            }
            // console.log(newString);
            //increment length of message
            messageLength++;
            if (messageLength < message.length + 1) {
                setTimeout(this.typeMe.bind(this, textObj, message, messageLength, 50), delay);
                // setTimeout(this.declare.bind(this), 1000);
            }
        };
        this.stage = mainStage;
        this.colors = mainColors;
        this.sounds = mainSounds;
        this.loadImages();
    }
}
exports.Gui = Gui;

},{"./Btn":1,"pixi.js":undefined}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const howler_1 = require("howler");
class SoundEffects {
    constructor() {
        this.play = function (snd) {
            console.log("snd", snd);
            this.sndsprite.play(snd);
        };
        //load sprite
        this.sndsprite = new howler_1.Howl({
            src: ['src/audio/sprite.wav'],
            sprite: {
                start: [212, 1664],
                dot: [4000, 1000],
                line: [6000, 5000],
                keypress: [10, 54],
                error: [6000, 5000],
                move: [6000, 5000]
            }
        });
    }
}
exports.SoundEffects = SoundEffects;

},{"howler":undefined}],5:[function(require,module,exports){
/// <reference path="../typings/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const ColorPalettes_1 = require("./ColorPalettes");
const SoundEffects_1 = require("./SoundEffects");
const Gui_1 = require("./Gui");
//Get sound effects
const SOUNDLIB = new SoundEffects_1.SoundEffects;
//Get color information
const COLORLIB = new ColorPalettes_1.ColorPalettes;
let colors;
// Load Gui after colors
let OVERLAY;
//load color palette
let changeColors = function (pindex) {
    COLORLIB.loadColors(pindex)
        .then(function (data) {
        colors = data;
        setupPixi();
    })
        .catch(function (err) {
        console.error('Augh, there was an error!', err);
    });
};
changeColors(0);
// //Resize electron window
// window.onresize = function (event):void{
//   updateRendererSize();
// }
// //Handles update of Canvas and Elements
// let updateRendererSize = function():void{
//   let w = window.innerWidth;
//   let h = window.innerHeight;
//   //this part resizes the canvas but keeps ratio the same
//   // app.view.style.width = w + "px";
//   // app.view.style.height = h + "px";
//   //this part adjusts the ratio:
//   renderer.resize(w,h);
// }
//Create the app
let renderer;
let stage;
//button
let playButtonWait;
let playButtonDown;
let playButtonOver;
let playButton;
let setupPixi = function () {
    renderer = PIXI.autoDetectRenderer(960, 540, { antialias: true, transparent: false, resolution: 1, autoResize: true });
    renderer.view.style.position = "absolute";
    renderer.view.style.display = "block";
    renderer.autoResize = true;
    renderer.resize(window.innerWidth, window.innerHeight);
    //Create a container object called the `stage`
    stage = new PIXI.Container();
    stage.interactive = true;
    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);
    //Update background color
    renderer.backgroundColor = colors['background'];
    drawScene();
};
//Draw scene
let drawScene = function () {
    //init Gui pass in colors
    OVERLAY = new Gui_1.Gui(stage, colors, SOUNDLIB);
    //start rendering engine
    gameLoop();
    console.log("started gameLoop");
};
let gameLoop = function () {
    //loop 60 frames per second
    requestAnimationFrame(gameLoop);
    renderer.render(stage);
};

},{"./ColorPalettes":2,"./Gui":3,"./SoundEffects":4,"pixi.js":undefined}]},{},[5])(5)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0J0bi50cyIsInNyYy9Db2xvclBhbGV0dGVzLnRzIiwic3JjL0d1aS50cyIsInNyYy9Tb3VuZEVmZmVjdHMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBT0ksWUFBWSxTQUFhLEVBQUUsT0FBVyxFQUFFLE9BQWUsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQWU7UUFONUYsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFtRDFCLGlCQUFZLEdBQUcsVUFBUyxFQUFFLEVBQUMsUUFBUTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQTtRQUNPLGVBQVUsR0FBRyxVQUFTLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FB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QztBQUNGLElBQUksUUFBUSxHQUFHO0lBQ2IsMkJBQTJCO0lBQzNCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJ0biB7XG4gICAgcHJpdmF0ZSBidXR0b25PYmplY3Q6IE9iamVjdCA9IHt9O1xuICAgIHByaXZhdGUgbmFtZTogU3RyaW5nO1xuICAgIHByaXZhdGUgY2FsbGJhY2s6RnVuY3Rpb247XG4gICAgcHJpdmF0ZSBzdGFnZTpQSVhJLkNvbnRhaW5lcjtcbiAgICBwcml2YXRlIHNwcml0ZXM6UElYSS5TcHJpdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihtYWluU3RhZ2U6YW55LCBzcHJpdGVzOmFueSwgYnRua2luZDogc3RyaW5nLCB4cG9zOiBudW1iZXIsIHlwb3M6IG51bWJlciwgY2FsbGJrOkZ1bmN0aW9uKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBzb21lIHRleHR1cmVzIGZyb20gYW4gaW1hZ2UgcGF0aFxuICAgICAgICB0aGlzLnN0YWdlID0gbWFpblN0YWdlO1xuICAgICAgICB0aGlzLm5hbWUgPSBidG5raW5kO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJrO1xuICAgICAgICB0aGlzLnNwcml0ZXMgPSBzcHJpdGVzO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYnRubmFtZTogXCIgKyB0aGlzLm5hbWUpO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFt0aGlzLm5hbWUgKyBcIl91cFwiXSA9IHRoaXMuc3ByaXRlc1t0aGlzLm5hbWUgKyBcIl91cFwiXTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbdGhpcy5uYW1lICsgXCJfb3ZlclwiXSA9IHRoaXMuc3ByaXRlc1t0aGlzLm5hbWUgKyBcIl9vdmVyXCJdO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFt0aGlzLm5hbWUgKyBcIl9oaXRcIl0gPSB0aGlzLnNwcml0ZXNbdGhpcy5uYW1lICsgXCJfaGl0XCJdO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ10gPSB0aGlzLnNwcml0ZXNbdGhpcy5uYW1lICsgXCJfdXBcIl07XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ10uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddLnggPSB4cG9zO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddLnkgPSB5cG9zO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGJ1dHRvbiBpbnRlcmFjdGl2ZS4uLlxuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXS5idXR0b25Nb2RlID0gdHJ1ZTtcblxuICAgICAgICAvLyBNb3VzZSAmIHRvdWNoIGV2ZW50cyBhcmUgbm9ybWFsaXplZCBpbnRvXG4gICAgICAgIC8vIHRoZSBwb2ludGVyKiBldmVudHMgZm9yIGhhbmRsaW5nIGRpZmZlcmVudFxuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJkb3duJywgdGhpcy5vbkJ1dHRvbkRvd24uYmluZCh0aGlzLCB0aGlzLm5hbWUsIHRoaXMuY2FsbGJhY2spKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXAnLCB0aGlzLm9uQnV0dG9uVXAuYmluZCh0aGlzLCB0aGlzLm5hbWUpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkJ1dHRvblVwLmJpbmQodGhpcywgdGhpcy5uYW1lKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm92ZXInLCB0aGlzLm9uQnV0dG9uT3Zlci5iaW5kKHRoaXMsIHRoaXMubmFtZSkpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJvdXQnLCB0aGlzLm9uQnV0dG9uT3V0LmJpbmQodGhpcywgdGhpcy5uYW1lKSk7XG5cbiAgICAgICAgLy8gVXNlIG1vdXNlLW9ubHkgZXZlbnRzXG4gICAgICAgIC8vIC5vbignbW91c2Vkb3duJywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ21vdXNldXAnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNldXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCdtb3VzZW92ZXInLCBvbkJ1dHRvbk92ZXIpXG4gICAgICAgIC8vIC5vbignbW91c2VvdXQnLCBvbkJ1dHRvbk91dClcblxuICAgICAgICAvLyBVc2UgdG91Y2gtb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCd0b3VjaHN0YXJ0Jywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCd0b3VjaGVuZG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuXG4gICAgICAgIC8vIGFkZCBpdCB0byB0aGUgc3RhZ2VcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvbkRvd24gPSBmdW5jdGlvbihtZSxjYWxsYmFjayk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uRG93blwiKTtcbiAgICAgICAgdGhpcy5pc2Rvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX2hpdFwiXTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25VcCA9IGZ1bmN0aW9uKG1lKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25VcFwiKTtcbiAgICAgICAgdGhpcy5pc2Rvd24gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX292ZXJcIl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX3VwXCJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25PdmVyID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbk92ZXJcIik7XG4gICAgICAgIHRoaXMuaXNPdmVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl9vdmVyXCJdO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uT3V0ID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbk91dFwiKTtcbiAgICAgICAgdGhpcy5pc092ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl91cFwiXTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lQYWxldHRlfSBmcm9tICcuL2ludGVyZmFjZXMvSVBhbGV0dGUnO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JQYWxldHRlcyB7XG4gICAgcHJpdmF0ZSBwYWxldHRlSW5kZXg6IDA7XG4gICAgcHVibGljIHBhbGV0dGVzOiBudWxsO1xuICAgIHByaXZhdGUgYWN0aXZlUGFsZXR0ZTogbnVsbDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKTpQcm9taXNlPGFueT4ge1xuICAgICAgdGhpcy5wYWxldHRlSW5kZXggPSBwaW5kZXg7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9ICdzcmMvY29sb3JzLmpzb24nO1xuICAgICAgICAgICAgbGV0IHhocjogYW55ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICAgIHZhciBkYXRhOiBhbnk7XG4gICAgICAgICAgICB4aHIub25sb2FkID1cbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU3VjY2VzcyFcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUGFsZXR0ZTpJUGFsZXR0ZSA9IGRhdGEuY29sb3JzW3BpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhY3RpdmVQYWxldHRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgQnRuIH0gZnJvbSBcIi4vQnRuXCI7XG5cbmV4cG9ydCBjbGFzcyBHdWkge1xuICAgIHByaXZhdGUgc3RhZ2U6IFBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgY29sb3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBzb3VuZHM6IGFueTtcblxuICAgIC8vdGV4dCBlbGVtZW50c1xuICAgIHByaXZhdGUgc3RhdHVzOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSByb3dzVGl0bGU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIHJvd3NWYWx1ZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgY29sc1RpdGxlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSBjb2xzVmFsdWU6IFBJWEkuVGV4dDtcblxuICAgIHByaXZhdGUgbGluZTogUElYSS5HcmFwaGljcztcbiAgICBwcml2YXRlIGxvYWRlciA9IG5ldyBQSVhJLmxvYWRlcnMuTG9hZGVyKCk7XG4gICAgcHJpdmF0ZSBzcHJpdGVzOiBhbnkgPSB7fTtcblxuICAgIHByaXZhdGUgcm93czogbnVtYmVyID0gMTA7XG4gICAgcHJpdmF0ZSBjb2xzOiBudW1iZXIgPSAxMDtcbiAgICBwcml2YXRlIHNwYWNpbmc6IG51bWJlciA9IDUwO1xuICAgIHByaXZhdGUgcmVzb3VyY2VzOiBhbnk7XG4gICAgcHJpdmF0ZSBncmlkY29udGFpbmVyOiBhbnk7XG4gICAgcHJpdmF0ZSBtYXJrczogYW55ID0gW107XG4gICAgcHJpdmF0ZSBwbGF5ZXI6IFBJWEkuU3ByaXRlO1xuXG4gICAgY29uc3RydWN0b3IobWFpblN0YWdlOiBQSVhJLkNvbnRhaW5lciwgbWFpbkNvbG9yczogYW55LCBtYWluU291bmRzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdGFnZSA9IG1haW5TdGFnZTtcbiAgICAgICAgdGhpcy5jb2xvcnMgPSBtYWluQ29sb3JzO1xuICAgICAgICB0aGlzLnNvdW5kcyA9IG1haW5Tb3VuZHM7XG4gICAgICAgIHRoaXMubG9hZEltYWdlcygpO1xuICAgIH1cbiAgICBwcml2YXRlIGxvYWRJbWFnZXMgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy9sb2FkIGltYWdlcydcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBQSVhJLmxvYWRlclxuICAgICAgICAgICAgLmFkZCgncGxheWVyX2JsdWUnLCAnc3JjL2dyYXBoaWNzL3BsYXllcl9ibHVlLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdtYXJrX2JyYWNrZXQnLCAnc3JjL2dyYXBoaWNzL21hcmtfYnJhY2tldC5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3d1cF91cCcsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF91cC5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3d1cF9vdmVyJywgJ3NyYy9ncmFwaGljcy9hcnJvd3VwX292ZXIucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfaGl0JywgJ3NyYy9ncmFwaGljcy9hcnJvd3VwX2hpdC5wbmcnKVxuICAgICAgICAgICAgLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKGxvYWRlciwgcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5wbGF5ZXJfYmx1ZS50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMubWFya19icmFja2V0ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrX2JyYWNrZXQudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93dXBfdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93dXBfb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF9vdmVyLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5hcnJvd3VwX3VwID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkQ29tcGxldGVkKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKCk7XG4gICAgfVxuXG5cbiAgICBwcml2YXRlIG9uTG9hZENvbXBsZXRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVMaW5lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b25zID0gZnVuY3Rpb24oKXtcbiAgICAgIHZhciByb3dzQnV0dG9uID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLnNwcml0ZXMsIFwiYXJyb3d1cFwiLCAxMDAsIDEwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5yb3dzKys7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLnJvd3MudG9TdHJpbmcoKSwwLDApXG4gICAgICAgIC8vdXBkYXRlIGJvYXJkL21hdHJpeFxuICAgICAgICBcbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlUGxheWVyID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vcGxheWVyXG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlO1xuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueCA9IDUwMDtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueSA9IDUwMDtcbiAgICAgICAgdGhpcy5zb3VuZHMucGxheShcInN0YXJ0XCIpO1xuXG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlR3JpZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQoY29udGFpbmVyKTtcblxuICAgICAgICBsZXQgdG90YWxtYXJrcyA9IHRoaXMucm93cyAqIHRoaXMuY29scztcbiAgICAgICAgY29uc29sZS5sb2codG90YWxtYXJrcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxtYXJrczsgaSsrKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwieDogXCIgKyBNYXRoLmZsb29yKGkgKiB0aGlzLnJvd3MpICogdGhpcy5zcGFjaW5nICsgXCJ5OiBcIiArIChpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZyk7KTtcbiAgICAgICAgICAgIHZhciBtYXJrID0gdGhpcy5zcHJpdGVzLm1hcmtfYnJhY2tldDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChtYXJrKTtcblxuICAgICAgICAgICAgbWFyay5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgICAgICBtYXJrLnggPSAoaSAlIHRoaXMuY29scykgKiB0aGlzLnNwYWNpbmc7Ly8oaSAlIHRoaXMuY29scykgKiB0aGlzLnNwYWNpbmc7XG4gICAgICAgICAgICBtYXJrLnkgPSBNYXRoLmZsb29yKGkgLyB0aGlzLnJvd3MpICogdGhpcy5zcGFjaW5nOyAvLyhpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZztcbiAgICAgICAgICAgIC8vIGJ1bm55LnggPSAoaSAlIDUpICogNDA7XG4gICAgICAgICAgICAvLyBidW5ueS55ID0gTWF0aC5mbG9vcihpIC8gNSkgKiA0MDsgICAgICAgICAgICBtYXJrLnkgPSBNYXRoLmZsb29yKGkgLyB0aGlzLnJvd3MpICogdGhpcy5zcGFjaW5nO1xuICAgICAgICAgICAgbWFyay5zY2FsZS54ID0gMTtcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDZW50ZXIgb24gdGhlIHNjcmVlblxuICAgICAgICBjb250YWluZXIueCA9ICh0aGlzLnN0YWdlLndpZHRoIC0gY29udGFpbmVyLndpZHRoKSAvIDI7XG4gICAgICAgIGNvbnRhaW5lci55ID0gKHRoaXMuc3RhZ2UuaGVpZ2h0IC0gY29udGFpbmVyLmhlaWdodCkgLyAyO1xuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTGluZSA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuXG4gICAgICAgIC8vIHNldCBhIGZpbGwgYW5kIGxpbmUgc3R5bGVcbiAgICAgICAgdGhpcy5saW5lLmxpbmVTdHlsZSgwLjUsIHRoaXMuY29sb3JzLmxpbmUsIDAuNSk7XG5cbiAgICAgICAgLy8gZHJhdyBhIHNoYXBlXG4gICAgICAgIHRoaXMubGluZS5tb3ZlVG8oMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG4gICAgICAgIHRoaXMubGluZS5saW5lVG8od2luZG93LmlubmVyV2lkdGggLSAxMDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKTtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlVGV4dCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvL3RleHQgdGVzdFxuICAgICAgICBsZXQgc3R5bGUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmNvbG9ycy5mb250LFxuICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzRhMTg1MCcsXG4gICAgICAgICAgICAvLyBzdHJva2VUaGlja25lc3M6IDUsXG4gICAgICAgICAgICBkcm9wU2hhZG93OiB0cnVlLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Qmx1cjogNCxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dBbmdsZTogTWF0aC5QSSAvIDYsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93RGlzdGFuY2U6IDYsXG4gICAgICAgICAgICB3b3JkV3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHdvcmRXcmFwV2lkdGg6IDQ0MFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRsaW5lID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuaGVhZGxpbmUsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IGZhbHNlLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Qmx1cjogNCxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dBbmdsZTogTWF0aC5QSSAvIDYsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93RGlzdGFuY2U6IDYsXG4gICAgICAgICAgICB3b3JkV3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHdvcmRXcmFwV2lkdGg6IDQ0MFxuICAgICAgICB9KTtcbiAgICAgICAgLy9zdGF0dXNcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMuc3RhdHVzLnggPSAxMTA7XG4gICAgICAgIHRoaXMuc3RhdHVzLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3RhdHVzKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiSW5pdGlhbGl6aW5nLi4uXCIsIDAsIDIwMDApO1xuXG4gICAgICAgIC8vcm93cyB0aXRsZVxuICAgICAgICB0aGlzLnJvd3NUaXRsZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUueCA9IDMwMDtcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb3dzVGl0bGUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NUaXRsZSwgXCJyb3dzOlwiLCAwLCAzNTAwKTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbHMpO1xuICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2YgdGhpcy5jb2xzKTtcblxuICAgICAgICAvL3Jvd3MgdmFsdWVcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnggPSAzNTA7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucm93c1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVmFsdWUsIHRoaXMucm93cy50b1N0cmluZygpLCAwLCA0MDAwKTtcblxuICAgICAgICAvL2NvbHMgdGl0bGVcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUgPSBuZXcgUElYSS5UZXh0KCcuLi46Jywgc3R5bGUpO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS54ID0gNTAwO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNvbHNUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1RpdGxlLCAnY29sczonLCAwLCA0NTAwKTtcblxuICAgICAgICAvLyAvL2NvbHMgdmFsdWVcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnggPSA1NTA7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY29sc1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuY29scy50b1N0cmluZygpLCAwLCA1MDAwKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiUmVhZHlcIiwgMCwgNjAwMCk7XG5cbiAgICB9XG4gICAgcHJpdmF0ZSB0eXBlTWUgPSBmdW5jdGlvbih0ZXh0T2JqOiBQSVhJLlRleHQsIG1lc3NhZ2U6IHN0cmluZywgbWVzc2FnZUxlbmd0aDogbnVtYmVyLCBkZWxheTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UgKyAnIHwgJyArIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICBpZiAobWVzc2FnZUxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIHR5cGVcIik7XG4gICAgICAgICAgICB0ZXh0T2JqLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgbWVzc2FnZUxlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvb3AgdGhyb3VnaCB0eXBpbmdcbiAgICAgICAgbGV0IG5ld1N0cmluZzogc3RyaW5nID0gbWVzc2FnZS5zdWJzdHJpbmcoMCwgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIHRleHRPYmoudGV4dCA9IG5ld1N0cmluZztcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcy5wbGF5KFwia2V5cHJlc3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3U3RyaW5nKTtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGVuZ3RoIG9mIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUxlbmd0aCsrO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCwgNTApLCBkZWxheSk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgc2V0dXBQaXhpKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vLyAvL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbi8vICAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG4vLyB9XG4vLyAvL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbi8vIGxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4vLyAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8gICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4vLyAgIC8vIGFwcC52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbi8vICAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4vLyAgIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xuLy8gfVxuXG4vL0NyZWF0ZSB0aGUgYXBwXG5sZXQgcmVuZGVyZXI6IGFueTtcbmxldCBzdGFnZTogUElYSS5Db250YWluZXI7XG5cbi8vYnV0dG9uXG5sZXQgcGxheUJ1dHRvbldhaXQ7XG5sZXQgcGxheUJ1dHRvbkRvd247XG5sZXQgcGxheUJ1dHRvbk92ZXI7XG5sZXQgcGxheUJ1dHRvbjtcblxubGV0IHNldHVwUGl4aSA9IGZ1bmN0aW9uKCk6dm9pZHtcblxuICByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDk2MCw1NDAsXG4gICAge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxLCBhdXRvUmVzaXplOiB0cnVlfVxuICApO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLy9DcmVhdGUgYSBjb250YWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgYHN0YWdlYFxuICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBzdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgLy9BZGQgdGhlIGNhbnZhcyB0byB0aGUgSFRNTCBkb2N1bWVudFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIC8vVXBkYXRlIGJhY2tncm91bmQgY29sb3JcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3JzWydiYWNrZ3JvdW5kJ107XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIE9WRVJMQVkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0ZWQgZ2FtZUxvb3BcIik7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuIl19
