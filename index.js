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
                .add('arrowdown_up', 'src/graphics/arrowdown_up.png')
                .add('arrowdown_over', 'src/graphics/arrowdown_over.png')
                .add('arrowdown_hit', 'src/graphics/arrowdown_hit.png')
                .on('complete', function (loader, resources) {
                this.sprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                this.sprites.mark_bracket = new PIXI.Sprite(resources.mark_bracket.texture);
                this.sprites.arrowup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.arrowup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.arrowup_hit = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.arrowdown_up = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.sprites.arrowdown_over = new PIXI.Sprite(resources.arrowdown_over.texture);
                this.sprites.arrowdown_hit = new PIXI.Sprite(resources.arrowdown_up.texture);
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
            var rowsButtonUp = new Btn_1.Btn(this.stage, this.sprites, "arrowup", 405, window.innerHeight - 40, function () {
                this.rows++;
                this.typeMe(this.rowsValue, this.rows.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
            var rowsButtonDown = new Btn_1.Btn(this.stage, this.sprites, "arrowdown", 400, window.innerHeight - 25, function () {
                this.rows--;
                this.typeMe(this.rowsValue, this.rows.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
            var colsButtonUp = new Btn_1.Btn(this.stage, this.sprites, "arrowup", 505, window.innerHeight - 40, function () {
                this.cols++;
                this.typeMe(this.colsValue, this.cols.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
            var colsButtonDown = new Btn_1.Btn(this.stage, this.sprites, "arrowdown", 500, window.innerHeight - 25, function () {
                this.cols--;
                this.typeMe(this.colsValue, this.cols.toString(), 0, 0);
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
            if (messageLength >= 1) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0J0bi50cyIsInNyYy9Db2xvclBhbGV0dGVzLnRzIiwic3JjL0d1aS50cyIsInNyYy9Tb3VuZEVmZmVjdHMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBT0ksWUFBWSxTQUFhLEVBQUUsT0FBVyxFQUFFLE9BQWUsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLE1BQWU7UUFONUYsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFtRDFCLGlCQUFZLEdBQUcsVUFBUyxFQUFFLEVBQUMsUUFBUTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFDZixRQUFRLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQTtRQUNPLGVBQVUsR0FBRyxVQUFTLEVBQUU7WUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFDRCxJQUFJLENBQUMsQ0FBQztnQkFDRixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FB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VSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV2RCw4Q0FBOEM7SUFDOUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBRXpCLHFDQUFxQztJQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekMseUJBQXlCO0lBQ3pCLFFBQVEsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWhELFNBQVMsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBO0FBRUQsWUFBWTtBQUNaLElBQUksU0FBUyxHQUFHO0lBQ1oseUJBQXlCO0lBQ3pCLE9BQU8sR0FBRyxJQUFJLFNBQUcsQ0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLHdCQUF3QjtJQUN4QixRQUFRLEVBQUUsQ0FBQztJQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUM7QUFDRixJQUFJLFFBQVEsR0FBRztJQUNiLDJCQUEyQjtJQUMzQixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVoQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCdG4ge1xuICAgIHByaXZhdGUgYnV0dG9uT2JqZWN0OiBPYmplY3QgPSB7fTtcbiAgICBwcml2YXRlIG5hbWU6IFN0cmluZztcbiAgICBwcml2YXRlIGNhbGxiYWNrOkZ1bmN0aW9uO1xuICAgIHByaXZhdGUgc3RhZ2U6UElYSS5Db250YWluZXI7XG4gICAgcHJpdmF0ZSBzcHJpdGVzOlBJWEkuU3ByaXRlO1xuXG4gICAgY29uc3RydWN0b3IobWFpblN0YWdlOmFueSwgc3ByaXRlczphbnksIGJ0bmtpbmQ6IHN0cmluZywgeHBvczogbnVtYmVyLCB5cG9zOiBudW1iZXIsIGNhbGxiazpGdW5jdGlvbikge1xuICAgICAgICAvLyBjcmVhdGUgc29tZSB0ZXh0dXJlcyBmcm9tIGFuIGltYWdlIHBhdGhcbiAgICAgICAgdGhpcy5zdGFnZSA9IG1haW5TdGFnZTtcbiAgICAgICAgdGhpcy5uYW1lID0gYnRua2luZDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiaztcbiAgICAgICAgdGhpcy5zcHJpdGVzID0gc3ByaXRlcztcblxuICAgICAgICBjb25zb2xlLmxvZyhcImJ0bm5hbWU6IFwiICsgdGhpcy5uYW1lKTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbdGhpcy5uYW1lICsgXCJfdXBcIl0gPSB0aGlzLnNwcml0ZXNbdGhpcy5uYW1lICsgXCJfdXBcIl07XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W3RoaXMubmFtZSArIFwiX292ZXJcIl0gPSB0aGlzLnNwcml0ZXNbdGhpcy5uYW1lICsgXCJfb3ZlclwiXTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbdGhpcy5uYW1lICsgXCJfaGl0XCJdID0gdGhpcy5zcHJpdGVzW3RoaXMubmFtZSArIFwiX2hpdFwiXTtcblxuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddID0gdGhpcy5zcHJpdGVzW3RoaXMubmFtZSArIFwiX3VwXCJdO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFsndGV4dHVyZUJ1dHRvbiddLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXS54ID0geHBvcztcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXS55ID0geXBvcztcblxuICAgICAgICAvLyBtYWtlIHRoZSBidXR0b24gaW50ZXJhY3RpdmUuLi5cbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0Wyd0ZXh0dXJlQnV0dG9uJ10uYnV0dG9uTW9kZSA9IHRydWU7XG5cbiAgICAgICAgLy8gTW91c2UgJiB0b3VjaCBldmVudHMgYXJlIG5vcm1hbGl6ZWQgaW50b1xuICAgICAgICAvLyB0aGUgcG9pbnRlciogZXZlbnRzIGZvciBoYW5kbGluZyBkaWZmZXJlbnRcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25CdXR0b25Eb3duLmJpbmQodGhpcywgdGhpcy5uYW1lLCB0aGlzLmNhbGxiYWNrKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkJ1dHRvblVwLmJpbmQodGhpcywgdGhpcy5uYW1lKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25CdXR0b25VcC5iaW5kKHRoaXMsIHRoaXMubmFtZSkpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJvdmVyJywgdGhpcy5vbkJ1dHRvbk92ZXIuYmluZCh0aGlzLCB0aGlzLm5hbWUpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyb3V0JywgdGhpcy5vbkJ1dHRvbk91dC5iaW5kKHRoaXMsIHRoaXMubmFtZSkpO1xuXG4gICAgICAgIC8vIFVzZSBtb3VzZS1vbmx5IGV2ZW50c1xuICAgICAgICAvLyAub24oJ21vdXNlZG93bicsIG9uQnV0dG9uRG93bilcbiAgICAgICAgLy8gLm9uKCdtb3VzZXVwJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCdtb3VzZXVwb3V0c2lkZScsIG9uQnV0dG9uVXApXG4gICAgICAgIC8vIC5vbignbW91c2VvdmVyJywgb25CdXR0b25PdmVyKVxuICAgICAgICAvLyAub24oJ21vdXNlb3V0Jywgb25CdXR0b25PdXQpXG5cbiAgICAgICAgLy8gVXNlIHRvdWNoLW9ubHkgZXZlbnRzXG4gICAgICAgIC8vIC5vbigndG91Y2hzdGFydCcsIG9uQnV0dG9uRG93bilcbiAgICAgICAgLy8gLm9uKCd0b3VjaGVuZCcsIG9uQnV0dG9uVXApXG4gICAgICAgIC8vIC5vbigndG91Y2hlbmRvdXRzaWRlJywgb25CdXR0b25VcClcblxuICAgICAgICAvLyBhZGQgaXQgdG8gdGhlIHN0YWdlXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5idXR0b25PYmplY3RbJ3RleHR1cmVCdXR0b24nXSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25Eb3duID0gZnVuY3Rpb24obWUsY2FsbGJhY2spOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbkRvd25cIik7XG4gICAgICAgIHRoaXMuaXNkb3duID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl9oaXRcIl07XG4gICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uVXAgPSBmdW5jdGlvbihtZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uVXBcIik7XG4gICAgICAgIHRoaXMuaXNkb3duID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzT3Zlcikge1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl9vdmVyXCJdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl91cFwiXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uT3ZlciA9IGZ1bmN0aW9uKG1lKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25PdmVyXCIpO1xuICAgICAgICB0aGlzLmlzT3ZlciA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfb3ZlclwiXTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvbk91dCA9IGZ1bmN0aW9uKG1lKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25PdXRcIik7XG4gICAgICAgIHRoaXMuaXNPdmVyID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfdXBcIl07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJUGFsZXR0ZX0gZnJvbSAnLi9pbnRlcmZhY2VzL0lQYWxldHRlJztcblxuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZXMge1xuICAgIHByaXZhdGUgcGFsZXR0ZUluZGV4OiAwO1xuICAgIHB1YmxpYyBwYWxldHRlczogbnVsbDtcbiAgICBwcml2YXRlIGFjdGl2ZVBhbGV0dGU6IG51bGw7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgIHB1YmxpYyBsb2FkQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcik6UHJvbWlzZTxhbnk+IHtcbiAgICAgIHRoaXMucGFsZXR0ZUluZGV4ID0gcGluZGV4O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSAnc3JjL2NvbG9ycy5qc29uJztcbiAgICAgICAgICAgIGxldCB4aHI6IGFueSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgICB2YXIgZGF0YTogYW55O1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9XG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MhXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVBhbGV0dGU6SVBhbGV0dGUgPSBkYXRhLmNvbG9yc1twaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYWN0aXZlUGFsZXR0ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSByZWFjaGVkIG91ciB0YXJnZXQgc2VydmVyLCBidXQgaXQgcmV0dXJuZWQgYW4gZXJyb3JcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IEJ0biB9IGZyb20gXCIuL0J0blwiO1xuXG5leHBvcnQgY2xhc3MgR3VpIHtcbiAgICBwcml2YXRlIHN0YWdlOiBQSVhJLkNvbnRhaW5lcjtcbiAgICBwcml2YXRlIGNvbG9yczogYW55O1xuICAgIHByaXZhdGUgc291bmRzOiBhbnk7XG5cbiAgICAvL3RleHQgZWxlbWVudHNcbiAgICBwcml2YXRlIHN0YXR1czogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgcm93c1RpdGxlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSByb3dzVmFsdWU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIGNvbHNUaXRsZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgY29sc1ZhbHVlOiBQSVhJLlRleHQ7XG5cbiAgICBwcml2YXRlIGxpbmU6IFBJWEkuR3JhcGhpY3M7XG4gICAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgUElYSS5sb2FkZXJzLkxvYWRlcigpO1xuICAgIHByaXZhdGUgc3ByaXRlczogYW55ID0ge307XG5cbiAgICBwcml2YXRlIHJvd3M6IG51bWJlciA9IDEwO1xuICAgIHByaXZhdGUgY29sczogbnVtYmVyID0gMTA7XG4gICAgcHJpdmF0ZSBzcGFjaW5nOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIHJlc291cmNlczogYW55O1xuICAgIHByaXZhdGUgZ3JpZGNvbnRhaW5lcjogYW55O1xuICAgIHByaXZhdGUgbWFya3M6IGFueSA9IFtdO1xuICAgIHByaXZhdGUgcGxheWVyOiBQSVhJLlNwcml0ZTtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTogUElYSS5Db250YWluZXIsIG1haW5Db2xvcnM6IGFueSwgbWFpblNvdW5kczogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMuY29sb3JzID0gbWFpbkNvbG9ycztcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBtYWluU291bmRzO1xuICAgICAgICB0aGlzLmxvYWRJbWFnZXMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vbG9hZCBpbWFnZXMnXG4gICAgICAgIHRoaXMubG9hZGVyID0gUElYSS5sb2FkZXJcbiAgICAgICAgICAgIC5hZGQoJ3BsYXllcl9ibHVlJywgJ3NyYy9ncmFwaGljcy9wbGF5ZXJfYmx1ZS5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnbWFya19icmFja2V0JywgJ3NyYy9ncmFwaGljcy9tYXJrX2JyYWNrZXQucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfdXAnLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfdXAucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfb3ZlcicsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9vdmVyLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX2hpdCcsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9oaXQucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93ZG93bl91cCcsICdzcmMvZ3JhcGhpY3MvYXJyb3dkb3duX3VwLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd2Rvd25fb3ZlcicsICdzcmMvZ3JhcGhpY3MvYXJyb3dkb3duX292ZXIucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93ZG93bl9oaXQnLCAnc3JjL2dyYXBoaWNzL2Fycm93ZG93bl9oaXQucG5nJylcbiAgICAgICAgICAgIC5vbignY29tcGxldGUnLCBmdW5jdGlvbihsb2FkZXIsIHJlc291cmNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5wbGF5ZXJfYmx1ZSA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMucGxheWVyX2JsdWUudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLm1hcmtfYnJhY2tldCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMubWFya19icmFja2V0LnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5hcnJvd3VwX3VwID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5hcnJvd3VwX292ZXIgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfb3Zlci50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuYXJyb3d1cF9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93ZG93bl91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5hcnJvd2Rvd25fb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93ZG93bl9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZENvbXBsZXRlZCgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkZXIubG9hZCgpO1xuICAgIH1cblxuXG4gICAgcHJpdmF0ZSBvbkxvYWRDb21wbGV0ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9ucyA9IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgcm93c0J1dHRvblVwID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLnNwcml0ZXMsIFwiYXJyb3d1cFwiLCA0MDUsIHdpbmRvdy5pbm5lckhlaWdodCAtIDQwLCBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLnJvd3MrKztcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVmFsdWUsIHRoaXMucm93cy50b1N0cmluZygpLDAsMClcbiAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG5cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB2YXIgcm93c0J1dHRvbkRvd24gPSBuZXcgQnRuKHRoaXMuc3RhZ2UsIHRoaXMuc3ByaXRlcywgXCJhcnJvd2Rvd25cIiwgNDAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSAyNSwgZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5yb3dzLS07XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLnJvd3MudG9TdHJpbmcoKSwwLDApXG4gICAgICAgIC8vdXBkYXRlIGJvYXJkL21hdHJpeFxuXG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgdmFyIGNvbHNCdXR0b25VcCA9IG5ldyBCdG4odGhpcy5zdGFnZSwgdGhpcy5zcHJpdGVzLCBcImFycm93dXBcIiwgNTA1LCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0MCwgZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5jb2xzKys7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1ZhbHVlLCB0aGlzLmNvbHMudG9TdHJpbmcoKSwwLDApXG4gICAgICAgIC8vdXBkYXRlIGJvYXJkL21hdHJpeFxuXG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgdmFyIGNvbHNCdXR0b25Eb3duID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLnNwcml0ZXMsIFwiYXJyb3dkb3duXCIsIDUwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gMjUsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuY29scy0tO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNWYWx1ZSwgdGhpcy5jb2xzLnRvU3RyaW5nKCksMCwwKVxuICAgICAgICAvL3VwZGF0ZSBib2FyZC9tYXRyaXhcblxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVQbGF5ZXIgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy9wbGF5ZXJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB0aGlzLnNwcml0ZXMucGxheWVyX2JsdWU7XG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5wbGF5ZXIpO1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvbi54ID0gNTAwO1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvbi55ID0gNTAwO1xuICAgICAgICB0aGlzLnNvdW5kcy5wbGF5KFwic3RhcnRcIik7XG5cbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVHcmlkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChjb250YWluZXIpO1xuXG4gICAgICAgIGxldCB0b3RhbG1hcmtzID0gdGhpcy5yb3dzICogdGhpcy5jb2xzO1xuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbG1hcmtzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbG1hcmtzOyBpKyspIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyg7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ4OiBcIiArIE1hdGguZmxvb3IoaSAqIHRoaXMucm93cykgKiB0aGlzLnNwYWNpbmcgKyBcInk6IFwiICsgKGkgJSB0aGlzLmNvbHMpICogdGhpcy5zcGFjaW5nKTspO1xuICAgICAgICAgICAgdmFyIG1hcmsgPSB0aGlzLnNwcml0ZXMubWFya19icmFja2V0O1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKG1hcmspO1xuXG4gICAgICAgICAgICBtYXJrLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgICAgIG1hcmsueCA9IChpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZzsvLyhpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZztcbiAgICAgICAgICAgIG1hcmsueSA9IE1hdGguZmxvb3IoaSAvIHRoaXMucm93cykgKiB0aGlzLnNwYWNpbmc7IC8vKGkgJSB0aGlzLmNvbHMpICogdGhpcy5zcGFjaW5nO1xuICAgICAgICAgICAgLy8gYnVubnkueCA9IChpICUgNSkgKiA0MDtcbiAgICAgICAgICAgIC8vIGJ1bm55LnkgPSBNYXRoLmZsb29yKGkgLyA1KSAqIDQwOyAgICAgICAgICAgIG1hcmsueSA9IE1hdGguZmxvb3IoaSAvIHRoaXMucm93cykgKiB0aGlzLnNwYWNpbmc7XG4gICAgICAgICAgICBtYXJrLnNjYWxlLnggPSAxO1xuICAgICAgICAgICAgbWFyay5zY2FsZS55ID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENlbnRlciBvbiB0aGUgc2NyZWVuXG4gICAgICAgIGNvbnRhaW5lci54ID0gKHRoaXMuc3RhZ2Uud2lkdGggLSBjb250YWluZXIud2lkdGgpIC8gMjtcbiAgICAgICAgY29udGFpbmVyLnkgPSAodGhpcy5zdGFnZS5oZWlnaHQgLSBjb250YWluZXIuaGVpZ2h0KSAvIDI7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICAgICAgLy8gc2V0IGEgZmlsbCBhbmQgbGluZSBzdHlsZVxuICAgICAgICB0aGlzLmxpbmUubGluZVN0eWxlKDAuNSwgdGhpcy5jb2xvcnMubGluZSwgMC41KTtcblxuICAgICAgICAvLyBkcmF3IGEgc2hhcGVcbiAgICAgICAgdGhpcy5saW5lLm1vdmVUbygxMDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKTtcbiAgICAgICAgdGhpcy5saW5lLmxpbmVUbyh3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVUZXh0ID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vdGV4dCB0ZXN0XG4gICAgICAgIGxldCBzdHlsZSA9IG5ldyBQSVhJLlRleHRTdHlsZSh7XG4gICAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmZvbnQsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IHRydWUsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGVhZGxpbmUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmNvbG9ycy5oZWFkbGluZSxcbiAgICAgICAgICAgIC8vIHN0cm9rZTogJyM0YTE4NTAnLFxuICAgICAgICAgICAgLy8gc3Ryb2tlVGhpY2tuZXNzOiA1LFxuICAgICAgICAgICAgZHJvcFNoYWRvdzogZmFsc2UsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuICAgICAgICAvL3N0YXR1c1xuICAgICAgICB0aGlzLnN0YXR1cyA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5zdGF0dXMueCA9IDExMDtcbiAgICAgICAgdGhpcy5zdGF0dXMueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zdGF0dXMpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJJbml0aWFsaXppbmcuLi5cIiwgMCwgMjAwMCk7XG5cbiAgICAgICAgLy9yb3dzIHRpdGxlXG4gICAgICAgIHRoaXMucm93c1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgc3R5bGUpO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS54ID0gMzAwO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvd3NUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1RpdGxlLCBcInJvd3M6XCIsIDAsIDM1MDApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29scyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB0aGlzLmNvbHMpO1xuXG4gICAgICAgIC8vcm93cyB2YWx1ZVxuICAgICAgICB0aGlzLnJvd3NWYWx1ZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUueCA9IDM1MDtcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb3dzVmFsdWUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NWYWx1ZSwgdGhpcy5yb3dzLnRvU3RyaW5nKCksIDAsIDQwMDApO1xuXG4gICAgICAgIC8vY29scyB0aXRsZVxuICAgICAgICB0aGlzLmNvbHNUaXRsZSA9IG5ldyBQSVhJLlRleHQoJy4uLjonLCBzdHlsZSk7XG4gICAgICAgIHRoaXMuY29sc1RpdGxlLnggPSA1MDA7XG4gICAgICAgIHRoaXMuY29sc1RpdGxlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY29sc1RpdGxlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVGl0bGUsICdjb2xzOicsIDAsIDQ1MDApO1xuXG4gICAgICAgIC8vIC8vY29scyB2YWx1ZVxuICAgICAgICB0aGlzLmNvbHNWYWx1ZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUueCA9IDU1MDtcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jb2xzVmFsdWUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNWYWx1ZSwgdGhpcy5jb2xzLnRvU3RyaW5nKCksIDAsIDUwMDApO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJSZWFkeVwiLCAwLCA2MDAwKTtcblxuICAgIH1cbiAgICBwcml2YXRlIHR5cGVNZSA9IGZ1bmN0aW9uKHRleHRPYmo6IFBJWEkuVGV4dCwgbWVzc2FnZTogc3RyaW5nLCBtZXNzYWdlTGVuZ3RoOiBudW1iZXIsIGRlbGF5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSArICcgfCAnICsgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgdHlwZVwiKTtcbiAgICAgICAgICAgIHRleHRPYmoudGV4dCA9IFwiXCI7XG4gICAgICAgICAgICBtZXNzYWdlTGVuZ3RoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9vcCB0aHJvdWdoIHR5cGluZ1xuICAgICAgICBsZXQgbmV3U3RyaW5nOiBzdHJpbmcgPSBtZXNzYWdlLnN1YnN0cmluZygwLCBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgdGV4dE9iai50ZXh0ID0gbmV3U3RyaW5nO1xuICAgICAgICBpZiAobWVzc2FnZUxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcy5wbGF5KFwia2V5cHJlc3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3U3RyaW5nKTtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGVuZ3RoIG9mIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUxlbmd0aCsrO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCwgNTApLCBkZWxheSk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgc2V0dXBQaXhpKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vLyAvL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbi8vICAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG4vLyB9XG4vLyAvL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbi8vIGxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4vLyAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8gICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4vLyAgIC8vIGFwcC52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbi8vICAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4vLyAgIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xuLy8gfVxuXG4vL0NyZWF0ZSB0aGUgYXBwXG5sZXQgcmVuZGVyZXI6IGFueTtcbmxldCBzdGFnZTogUElYSS5Db250YWluZXI7XG5cbi8vYnV0dG9uXG5sZXQgcGxheUJ1dHRvbldhaXQ7XG5sZXQgcGxheUJ1dHRvbkRvd247XG5sZXQgcGxheUJ1dHRvbk92ZXI7XG5sZXQgcGxheUJ1dHRvbjtcblxubGV0IHNldHVwUGl4aSA9IGZ1bmN0aW9uKCk6dm9pZHtcblxuICByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDk2MCw1NDAsXG4gICAge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxLCBhdXRvUmVzaXplOiB0cnVlfVxuICApO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLy9DcmVhdGUgYSBjb250YWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgYHN0YWdlYFxuICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBzdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgLy9BZGQgdGhlIGNhbnZhcyB0byB0aGUgSFRNTCBkb2N1bWVudFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIC8vVXBkYXRlIGJhY2tncm91bmQgY29sb3JcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3JzWydiYWNrZ3JvdW5kJ107XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIE9WRVJMQVkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0ZWQgZ2FtZUxvb3BcIik7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuIl19
