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
            var rowsButton = new Btn_1.Btn(this.stage, this.sprites, "arrowup", 200, window.innerHeight - 50, function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0J0bi50cyIsInNyYy9Db2xvclBhbGV0dGVzLnRzIiwic3JjL0d1aS50cyIsInNyYy9Tb3VuZEVmZmVjdHMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBT0ksWUFBWSxTQUFhLEVBQUUsT0FBVyxFQUFFLE9BQWUsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQWU7UUFONUYsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFtRDFCLGlCQUFZLEdBQUcsVUFBUyxFQUFFLEVBQUMsUUFBUTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQTtRQUNPLGVBQVUsR0FBRyxVQUFTLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FB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LENBQUM7QUFDcEMsQ0FBQyxDQUFDO0FBQ0YsSUFBSSxRQUFRLEdBQUc7SUFDYiwyQkFBMkI7SUFDM0IscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQnRuIHtcbiAgICBwcml2YXRlIGJ1dHRvbk9iamVjdDogT2JqZWN0ID0ge307XG4gICAgcHJpdmF0ZSBuYW1lOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBjYWxsYmFjazpGdW5jdGlvbjtcbiAgICBwcml2YXRlIHN0YWdlOlBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgc3ByaXRlczpQSVhJLlNwcml0ZTtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTphbnksIHNwcml0ZXM6YW55LCBidG5raW5kOiBzdHJpbmcsIHhwb3M6IG51bWJlciwgeXBvczogbnVtYmVyLCBjYWxsYms6RnVuY3Rpb24pIHtcbiAgICAgICAgLy8gY3JlYXRlIHNvbWUgdGV4dHVyZXMgZnJvbSBhbiBpbWFnZSBwYXRoXG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMubmFtZSA9IGJ0bmtpbmQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYms7XG4gICAgICAgIHRoaXMuc3ByaXRlcyA9IHNwcml0ZXM7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJidG5uYW1lOiBcIiArIHRoaXMubmFtZSk7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W3RoaXMubmFtZSArIFwiX3VwXCJdID0gdGhpcy5zcHJpdGVzW3RoaXMubmFtZSArIFwiX3VwXCJdO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFt0aGlzLm5hbWUgKyBcIl9vdmVyXCJdID0gdGhpcy5zcHJpdGVzW3RoaXMubmFtZSArIFwiX292ZXJcIl07XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W3RoaXMubmFtZSArIFwiX2hpdFwiXSA9IHRoaXMuc3ByaXRlc1t0aGlzLm5hbWUgKyBcIl9oaXRcIl07XG5cbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXSA9IHRoaXMuc3ByaXRlc1t0aGlzLm5hbWUgKyBcIl91cFwiXTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXS5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ10ueCA9IHhwb3M7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ10ueSA9IHlwb3M7XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGludGVyYWN0aXZlLi4uXG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ10uaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddLmJ1dHRvbk1vZGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIE1vdXNlICYgdG91Y2ggZXZlbnRzIGFyZSBub3JtYWxpemVkIGludG9cbiAgICAgICAgLy8gdGhlIHBvaW50ZXIqIGV2ZW50cyBmb3IgaGFuZGxpbmcgZGlmZmVyZW50XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ11cbiAgICAgICAgICAgIC5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uQnV0dG9uRG93bi5iaW5kKHRoaXMsIHRoaXMubmFtZSwgdGhpcy5jYWxsYmFjaykpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25CdXR0b25VcC5iaW5kKHRoaXMsIHRoaXMubmFtZSkpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCB0aGlzLm9uQnV0dG9uVXAuYmluZCh0aGlzLCB0aGlzLm5hbWUpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyb3ZlcicsIHRoaXMub25CdXR0b25PdmVyLmJpbmQodGhpcywgdGhpcy5uYW1lKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm91dCcsIHRoaXMub25CdXR0b25PdXQuYmluZCh0aGlzLCB0aGlzLm5hbWUpKTtcblxuICAgICAgICAvLyBVc2UgbW91c2Utb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCdtb3VzZWRvd24nLCBvbkJ1dHRvbkRvd24pXG4gICAgICAgIC8vIC5vbignbW91c2V1cCcsIG9uQnV0dG9uVXApXG4gICAgICAgIC8vIC5vbignbW91c2V1cG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNlb3ZlcicsIG9uQnV0dG9uT3ZlcilcbiAgICAgICAgLy8gLm9uKCdtb3VzZW91dCcsIG9uQnV0dG9uT3V0KVxuXG4gICAgICAgIC8vIFVzZSB0b3VjaC1vbmx5IGV2ZW50c1xuICAgICAgICAvLyAub24oJ3RvdWNoc3RhcnQnLCBvbkJ1dHRvbkRvd24pXG4gICAgICAgIC8vIC5vbigndG91Y2hlbmQnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kb3V0c2lkZScsIG9uQnV0dG9uVXApXG5cbiAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBzdGFnZVxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ10pO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uRG93biA9IGZ1bmN0aW9uKG1lLGNhbGxiYWNrKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25Eb3duXCIpO1xuICAgICAgICB0aGlzLmlzZG93biA9IHRydWU7XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfaGl0XCJdO1xuICAgICAgICB0aGlzLmFscGhhID0gMTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvblVwID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvblVwXCIpO1xuICAgICAgICB0aGlzLmlzZG93biA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc092ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfb3ZlclwiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfdXBcIl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvbk92ZXIgPSBmdW5jdGlvbihtZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uT3ZlclwiKTtcbiAgICAgICAgdGhpcy5pc092ZXIgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX292ZXJcIl07XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25PdXQgPSBmdW5jdGlvbihtZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uT3V0XCIpO1xuICAgICAgICB0aGlzLmlzT3ZlciA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX3VwXCJdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBCdG4gfSBmcm9tIFwiLi9CdG5cIjtcblxuZXhwb3J0IGNsYXNzIEd1aSB7XG4gICAgcHJpdmF0ZSBzdGFnZTogUElYSS5Db250YWluZXI7XG4gICAgcHJpdmF0ZSBjb2xvcnM6IGFueTtcbiAgICBwcml2YXRlIHNvdW5kczogYW55O1xuXG4gICAgLy90ZXh0IGVsZW1lbnRzXG4gICAgcHJpdmF0ZSBzdGF0dXM6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIHJvd3NUaXRsZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgcm93c1ZhbHVlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSBjb2xzVGl0bGU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIGNvbHNWYWx1ZTogUElYSS5UZXh0O1xuXG4gICAgcHJpdmF0ZSBsaW5lOiBQSVhJLkdyYXBoaWNzO1xuICAgIHByaXZhdGUgbG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXIoKTtcbiAgICBwcml2YXRlIHNwcml0ZXM6IGFueSA9IHt9O1xuXG4gICAgcHJpdmF0ZSByb3dzOiBudW1iZXIgPSAxMDtcbiAgICBwcml2YXRlIGNvbHM6IG51bWJlciA9IDEwO1xuICAgIHByaXZhdGUgc3BhY2luZzogbnVtYmVyID0gNTA7XG4gICAgcHJpdmF0ZSByZXNvdXJjZXM6IGFueTtcbiAgICBwcml2YXRlIGdyaWRjb250YWluZXI6IGFueTtcbiAgICBwcml2YXRlIG1hcmtzOiBhbnkgPSBbXTtcbiAgICBwcml2YXRlIHBsYXllcjogUElYSS5TcHJpdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihtYWluU3RhZ2U6IFBJWEkuQ29udGFpbmVyLCBtYWluQ29sb3JzOiBhbnksIG1haW5Tb3VuZHM6IGFueSkge1xuICAgICAgICB0aGlzLnN0YWdlID0gbWFpblN0YWdlO1xuICAgICAgICB0aGlzLmNvbG9ycyA9IG1haW5Db2xvcnM7XG4gICAgICAgIHRoaXMuc291bmRzID0gbWFpblNvdW5kcztcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2VzKCk7XG4gICAgfVxuICAgIHByaXZhdGUgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvL2xvYWQgaW1hZ2VzJ1xuICAgICAgICB0aGlzLmxvYWRlciA9IFBJWEkubG9hZGVyXG4gICAgICAgICAgICAuYWRkKCdwbGF5ZXJfYmx1ZScsICdzcmMvZ3JhcGhpY3MvcGxheWVyX2JsdWUucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ21hcmtfYnJhY2tldCcsICdzcmMvZ3JhcGhpY3MvbWFya19icmFja2V0LnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX3VwJywgJ3NyYy9ncmFwaGljcy9hcnJvd3VwX3VwLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX292ZXInLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfb3Zlci5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3d1cF9oaXQnLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfaGl0LnBuZycpXG4gICAgICAgICAgICAub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24obG9hZGVyLCByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucGxheWVyX2JsdWUgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLnBsYXllcl9ibHVlLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5tYXJrX2JyYWNrZXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLm1hcmtfYnJhY2tldC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuYXJyb3d1cF91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuYXJyb3d1cF9vdmVyID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93dXBfdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubG9hZGVyLmxvYWQoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgb25Mb2FkQ29tcGxldGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxpbmUoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVUZXh0KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucygpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbnMgPSBmdW5jdGlvbigpe1xuICAgICAgdmFyIHJvd3NCdXR0b24gPSBuZXcgQnRuKHRoaXMuc3RhZ2UsIHRoaXMuc3ByaXRlcywgXCJhcnJvd3VwXCIsIDIwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNTAgLCBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnJvd3MrKztcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVmFsdWUsIHRoaXMucm93cy50b1N0cmluZygpLDAsMClcbiAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG5cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlUGxheWVyID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vcGxheWVyXG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlO1xuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueCA9IDUwMDtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueSA9IDUwMDtcbiAgICAgICAgdGhpcy5zb3VuZHMucGxheShcInN0YXJ0XCIpO1xuXG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlR3JpZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQoY29udGFpbmVyKTtcblxuICAgICAgICBsZXQgdG90YWxtYXJrcyA9IHRoaXMucm93cyAqIHRoaXMuY29scztcbiAgICAgICAgY29uc29sZS5sb2codG90YWxtYXJrcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxtYXJrczsgaSsrKSB7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coO1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwieDogXCIgKyBNYXRoLmZsb29yKGkgKiB0aGlzLnJvd3MpICogdGhpcy5zcGFjaW5nICsgXCJ5OiBcIiArIChpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZyk7KTtcbiAgICAgICAgICAgIHZhciBtYXJrID0gdGhpcy5zcHJpdGVzLm1hcmtfYnJhY2tldDtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChtYXJrKTtcblxuICAgICAgICAgICAgbWFyay5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgICAgICBtYXJrLnggPSAoaSAlIHRoaXMuY29scykgKiB0aGlzLnNwYWNpbmc7Ly8oaSAlIHRoaXMuY29scykgKiB0aGlzLnNwYWNpbmc7XG4gICAgICAgICAgICBtYXJrLnkgPSBNYXRoLmZsb29yKGkgLyB0aGlzLnJvd3MpICogdGhpcy5zcGFjaW5nOyAvLyhpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZztcbiAgICAgICAgICAgIC8vIGJ1bm55LnggPSAoaSAlIDUpICogNDA7XG4gICAgICAgICAgICAvLyBidW5ueS55ID0gTWF0aC5mbG9vcihpIC8gNSkgKiA0MDsgICAgICAgICAgICBtYXJrLnkgPSBNYXRoLmZsb29yKGkgLyB0aGlzLnJvd3MpICogdGhpcy5zcGFjaW5nO1xuICAgICAgICAgICAgbWFyay5zY2FsZS54ID0gMTtcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDZW50ZXIgb24gdGhlIHNjcmVlblxuICAgICAgICBjb250YWluZXIueCA9ICh0aGlzLnN0YWdlLndpZHRoIC0gY29udGFpbmVyLndpZHRoKSAvIDI7XG4gICAgICAgIGNvbnRhaW5lci55ID0gKHRoaXMuc3RhZ2UuaGVpZ2h0IC0gY29udGFpbmVyLmhlaWdodCkgLyAyO1xuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTGluZSA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuXG4gICAgICAgIC8vIHNldCBhIGZpbGwgYW5kIGxpbmUgc3R5bGVcbiAgICAgICAgdGhpcy5saW5lLmxpbmVTdHlsZSgwLjUsIHRoaXMuY29sb3JzLmxpbmUsIDAuNSk7XG5cbiAgICAgICAgLy8gZHJhdyBhIHNoYXBlXG4gICAgICAgIHRoaXMubGluZS5tb3ZlVG8oMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG4gICAgICAgIHRoaXMubGluZS5saW5lVG8od2luZG93LmlubmVyV2lkdGggLSAxMDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKTtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlVGV4dCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvL3RleHQgdGVzdFxuICAgICAgICBsZXQgc3R5bGUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmNvbG9ycy5mb250LFxuICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzRhMTg1MCcsXG4gICAgICAgICAgICAvLyBzdHJva2VUaGlja25lc3M6IDUsXG4gICAgICAgICAgICBkcm9wU2hhZG93OiB0cnVlLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Qmx1cjogNCxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dBbmdsZTogTWF0aC5QSSAvIDYsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93RGlzdGFuY2U6IDYsXG4gICAgICAgICAgICB3b3JkV3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHdvcmRXcmFwV2lkdGg6IDQ0MFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRsaW5lID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuaGVhZGxpbmUsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IGZhbHNlLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Qmx1cjogNCxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dBbmdsZTogTWF0aC5QSSAvIDYsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93RGlzdGFuY2U6IDYsXG4gICAgICAgICAgICB3b3JkV3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHdvcmRXcmFwV2lkdGg6IDQ0MFxuICAgICAgICB9KTtcbiAgICAgICAgLy9zdGF0dXNcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMuc3RhdHVzLnggPSAxMTA7XG4gICAgICAgIHRoaXMuc3RhdHVzLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3RhdHVzKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiSW5pdGlhbGl6aW5nLi4uXCIsIDAsIDIwMDApO1xuXG4gICAgICAgIC8vcm93cyB0aXRsZVxuICAgICAgICB0aGlzLnJvd3NUaXRsZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUueCA9IDMwMDtcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb3dzVGl0bGUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NUaXRsZSwgXCJyb3dzOlwiLCAwLCAzNTAwKTtcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbHMpO1xuICAgICAgICBjb25zb2xlLmxvZyh0eXBlb2YgdGhpcy5jb2xzKTtcblxuICAgICAgICAvL3Jvd3MgdmFsdWVcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnggPSAzNTA7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucm93c1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVmFsdWUsIHRoaXMucm93cy50b1N0cmluZygpLCAwLCA0MDAwKTtcblxuICAgICAgICAvL2NvbHMgdGl0bGVcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUgPSBuZXcgUElYSS5UZXh0KCcuLi46Jywgc3R5bGUpO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS54ID0gNTAwO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNvbHNUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1RpdGxlLCAnY29sczonLCAwLCA0NTAwKTtcblxuICAgICAgICAvLyAvL2NvbHMgdmFsdWVcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnggPSA1NTA7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY29sc1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuY29scy50b1N0cmluZygpLCAwLCA1MDAwKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiUmVhZHlcIiwgMCwgNjAwMCk7XG5cbiAgICB9XG4gICAgcHJpdmF0ZSB0eXBlTWUgPSBmdW5jdGlvbih0ZXh0T2JqOiBQSVhJLlRleHQsIG1lc3NhZ2U6IHN0cmluZywgbWVzc2FnZUxlbmd0aDogbnVtYmVyLCBkZWxheTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UgKyAnIHwgJyArIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICBpZiAobWVzc2FnZUxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIHR5cGVcIik7XG4gICAgICAgICAgICB0ZXh0T2JqLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgbWVzc2FnZUxlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvb3AgdGhyb3VnaCB0eXBpbmdcbiAgICAgICAgbGV0IG5ld1N0cmluZzogc3RyaW5nID0gbWVzc2FnZS5zdWJzdHJpbmcoMCwgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIHRleHRPYmoudGV4dCA9IG5ld1N0cmluZztcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcy5wbGF5KFwia2V5cHJlc3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3U3RyaW5nKTtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGVuZ3RoIG9mIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUxlbmd0aCsrO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCwgNTApLCBkZWxheSk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgc2V0dXBQaXhpKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vLyAvL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbi8vICAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG4vLyB9XG4vLyAvL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbi8vIGxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4vLyAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8gICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4vLyAgIC8vIGFwcC52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbi8vICAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4vLyAgIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xuLy8gfVxuXG4vL0NyZWF0ZSB0aGUgYXBwXG5sZXQgcmVuZGVyZXI6IGFueTtcbmxldCBzdGFnZTogUElYSS5Db250YWluZXI7XG5cbi8vYnV0dG9uXG5sZXQgcGxheUJ1dHRvbldhaXQ7XG5sZXQgcGxheUJ1dHRvbkRvd247XG5sZXQgcGxheUJ1dHRvbk92ZXI7XG5sZXQgcGxheUJ1dHRvbjtcblxubGV0IHNldHVwUGl4aSA9IGZ1bmN0aW9uKCk6dm9pZHtcblxuICByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDk2MCw1NDAsXG4gICAge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxLCBhdXRvUmVzaXplOiB0cnVlfVxuICApO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLy9DcmVhdGUgYSBjb250YWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgYHN0YWdlYFxuICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBzdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgLy9BZGQgdGhlIGNhbnZhcyB0byB0aGUgSFRNTCBkb2N1bWVudFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIC8vVXBkYXRlIGJhY2tncm91bmQgY29sb3JcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3JzWydiYWNrZ3JvdW5kJ107XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIE9WRVJMQVkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0ZWQgZ2FtZUxvb3BcIik7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuIl19
