(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jiboProgrammingChallenge = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
class Gui {
    constructor(mainStage, mainColors, mainSounds) {
        this.loader = new PIXI.loaders.Loader();
        this.sprites = {};
        this.rows = 10;
        this.cols = 10;
        this.loadImages = function () {
            var newSprites = {};
            var newStage = this.stage;
            var drawGrid = this.drawGrid;
            var rows = this.rows;
            var cols = this.cols;
            //load images
            this.loader = PIXI.loader
                .add('arrowblue', 'src/graphics/arrow_blue.png')
                .add('mark', 'src/graphics/mark_bracket.png')
                .load(function (loader, resources) {
                newSprites.mark = new PIXI.Sprite(resources.mark.texture);
                newSprites.arrow = new PIXI.Sprite(resources.arrowblue.texture);
                newStage.addChild(newSprites.arrow);
                newSprites.arrow.position.x = 200;
                newSprites.arrow.position.y = 200;
                drawGrid(newStage, resources, rows, cols, 65);
            });
        };
        this.drawArrow = function () {
            // //single object test
            this.stage.addChild(this.sprites.arrow);
            this.sprites.arrow.position.x = 200;
            this.sprites.arrow.position.y = 200;
        };
        this.drawGrid = function (newStage, resources, rows, cols, spacing) {
            var container = new PIXI.Container();
            newStage.addChild(container);
            let totalmarks = rows * cols;
            for (let i = 0; i < totalmarks; i++) {
                let mark = new PIXI.Sprite(resources.mark.texture);
                mark.anchor.set(0.5);
                mark.x = (i % cols) * spacing;
                mark.y = Math.floor(i / rows) * spacing;
                mark.scale.x = 1;
                mark.scale.y = 1;
                container.addChild(mark);
            }
            // Center on the screen
            container.x = (newStage.width - container.width) / 2;
            container.y = (newStage.height - container.height) / 2;
        };
        this.createButton = function () {
            // create some textures from an image path
            var textureButton = this.graphics.loader.resources["src/graphics/arrow_wait.png"].texture;
            var textureButtonDown = this.graphics.loader.resources["src/graphics/arrow_press.png"].texture;
            var textureButtonOver = this.graphics.loader.resources["src/graphics/arrow_error.png"].texture;
            var button = new PIXI.Sprite(textureButton);
            button.buttonMode = true;
            button.anchor.set(0.5);
            button.x = 200;
            button.y = 200;
            // make the button interactive...
            button.interactive = true;
            button.buttonMode = true;
            button
                .on('pointerdown', onButtonDown)
                .on('pointerup', onButtonUp)
                .on('pointerupoutside', onButtonUp)
                .on('pointerover', onButtonOver)
                .on('pointerout', onButtonOut);
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
            this.stage.addChild(button);
            function onButtonDown() {
                this.isdown = true;
                this.texture = textureButtonDown;
                this.alpha = 1;
            }
            function onButtonUp() {
                this.isdown = false;
                if (this.isOver) {
                    this.texture = textureButtonOver;
                }
                else {
                    this.texture = textureButton;
                }
            }
            function onButtonOver() {
                this.isOver = true;
                if (this.isdown) {
                    return;
                }
                this.texture = textureButtonOver;
            }
            function onButtonOut() {
                this.isOver = false;
                if (this.isdown) {
                    return;
                }
                this.texture = textureButton;
            }
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
                // fill: ['#ffffff', '#00ff99'], // gradient
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
            //status
            this.status = new PIXI.Text('...', style);
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
            // //rows value
            this.rowsValue = new PIXI.Text('...', style);
            this.rowsValue.x = 350;
            this.rowsValue.y = window.innerHeight - 50;
            this.stage.addChild(this.rowsValue);
            this.typeMe(this.rowsValue, this.rows.toString(), 0, 4000);
            //
            //cols title
            this.colsTitle = new PIXI.Text('...:', style);
            this.colsTitle.x = 500;
            this.colsTitle.y = window.innerHeight - 50;
            this.stage.addChild(this.colsTitle);
            this.typeMe(this.colsTitle, 'cols:', 0, 4500);
            //
            // //cols value
            this.colsValue = new PIXI.Text('...', style);
            this.colsValue.x = 550;
            this.colsValue.y = window.innerHeight - 50;
            this.stage.addChild(this.colsValue);
            this.typeMe(this.colsValue, this.cols.toString(), 0, 5000);
            this.typeMe(this.status, "Ready", 0, 6000);
        };
        // public updateText = function(message: string): PIXI.Text {
        //     this.status.text = message;
        //     return this.status;
        // }
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
            this.sounds.play("keypress");
            // console.log(newString);
            //increment length of message
            messageLength++;
            if (messageLength < message.length + 1) {
                setTimeout(this.typeMe.bind(this, textObj, message, messageLength, 50), delay);
                // setTimeout(this.declare.bind(this), 1000);
            }
            else {
                //Play startup sound
            }
        };
        this.stage = mainStage;
        this.colors = mainColors;
        this.sounds = mainSounds;
        this.loadImages();
        this.createLine();
        this.createText();
    }
}
exports.Gui = Gui;

},{"pixi.js":undefined}],3:[function(require,module,exports){
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

},{"howler":undefined}],4:[function(require,module,exports){
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
        console.log(data.type);
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
};
let gameLoop = function () {
    //loop 60 frames per second
    requestAnimationFrame(gameLoop);
    renderer.render(stage);
};

},{"./ColorPalettes":1,"./Gui":2,"./SoundEffects":3,"pixi.js":undefined}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvR3VpLnRzIiwic3JjL1NvdW5kRWZmZWN0cy50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7SUFJSTtRQUVPLGVBQVUsR0FBRyxVQUFTLE1BQWE7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ3ZDLElBQUksR0FBRyxHQUFXLGlCQUFpQixDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLE1BQU07b0JBQ1Y7d0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxXQUFXOzRCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTt3QkFDdkUsQ0FBQztvQkFDSCxDQUFDLENBQUM7Z0JBRUYsR0FBRyxDQUFDLE9BQU8sR0FBRztvQkFD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LHlCQUF5QjtJQUN6QixRQUFRLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVoRCxTQUFTLEVBQUUsQ0FBQztBQUNkLENBQUMsQ0FBQTtBQUVELFlBQVk7QUFDWixJQUFJLFNBQVMsR0FBRztJQUVaLHlCQUF5QjtJQUN6QixPQUFPLEdBQUcsSUFBSSxTQUFHLENBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1Qyx3QkFBd0I7SUFDeEIsUUFBUSxFQUFFLENBQUM7QUFDZixDQUFDLENBQUM7QUFDRixJQUFJLFFBQVEsR0FBRztJQUNiLDJCQUEyQjtJQUMzQixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVoQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge0lQYWxldHRlfSBmcm9tICcuL2ludGVyZmFjZXMvSVBhbGV0dGUnO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JQYWxldHRlcyB7XG4gICAgcHJpdmF0ZSBwYWxldHRlSW5kZXg6IDA7XG4gICAgcHVibGljIHBhbGV0dGVzOiBudWxsO1xuICAgIHByaXZhdGUgYWN0aXZlUGFsZXR0ZTogbnVsbDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKTpQcm9taXNlPGFueT4ge1xuICAgICAgdGhpcy5wYWxldHRlSW5kZXggPSBwaW5kZXg7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9ICdzcmMvY29sb3JzLmpzb24nO1xuICAgICAgICAgICAgbGV0IHhocjogYW55ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICAgIHZhciBkYXRhOiBhbnk7XG4gICAgICAgICAgICB4aHIub25sb2FkID1cbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU3VjY2VzcyFcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUGFsZXR0ZTpJUGFsZXR0ZSA9IGRhdGEuY29sb3JzW3BpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhY3RpdmVQYWxldHRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgR3VpIHtcbiAgICBwcml2YXRlIHN0YWdlOiBQSVhJLkNvbnRhaW5lcjtcbiAgICBwcml2YXRlIGNvbG9yczogYW55O1xuICAgIHByaXZhdGUgc291bmRzOiBhbnk7XG5cbiAgICAvL3RleHQgZWxlbWVudHNcbiAgICBwcml2YXRlIHN0YXR1czogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgcm93c1RpdGxlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSByb3dzVmFsdWU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIGNvbHNUaXRsZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgY29sc1ZhbHVlOiBQSVhJLlRleHQ7XG5cbiAgICBwcml2YXRlIGxpbmU6IFBJWEkuR3JhcGhpY3M7XG4gICAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgUElYSS5sb2FkZXJzLkxvYWRlcigpO1xuICAgIHByaXZhdGUgc3ByaXRlczogYW55ID0ge307XG5cbiAgICBwcml2YXRlIHJvd3M6bnVtYmVyID0gMTA7XG4gICAgcHJpdmF0ZSBjb2xzOm51bWJlciA9IDEwO1xuXG4gICAgY29uc3RydWN0b3IobWFpblN0YWdlOiBQSVhJLkNvbnRhaW5lciwgbWFpbkNvbG9yczogYW55LCBtYWluU291bmRzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdGFnZSA9IG1haW5TdGFnZTtcbiAgICAgICAgdGhpcy5jb2xvcnMgPSBtYWluQ29sb3JzO1xuICAgICAgICB0aGlzLnNvdW5kcyA9IG1haW5Tb3VuZHM7XG4gICAgICAgIHRoaXMubG9hZEltYWdlcygpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxpbmUoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVUZXh0KCk7XG4gICAgfVxuICAgIHByaXZhdGUgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICB2YXIgbmV3U3ByaXRlczogYW55ID0ge307XG4gICAgICAgIHZhciBuZXdTdGFnZTogUElYSS5Db250YWluZXIgPSB0aGlzLnN0YWdlO1xuICAgICAgICB2YXIgZHJhd0dyaWQgPSB0aGlzLmRyYXdHcmlkO1xuICAgICAgICB2YXIgcm93cyA9IHRoaXMucm93cztcbiAgICAgICAgdmFyIGNvbHMgPSB0aGlzLmNvbHM7XG4gICAgICAgIC8vbG9hZCBpbWFnZXNcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBQSVhJLmxvYWRlclxuICAgICAgICAgICAgLmFkZCgnYXJyb3dibHVlJywgJ3NyYy9ncmFwaGljcy9hcnJvd19ibHVlLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdtYXJrJywgJ3NyYy9ncmFwaGljcy9tYXJrX2JyYWNrZXQucG5nJylcbiAgICAgICAgICAgIC5sb2FkKGZ1bmN0aW9uKGxvYWRlciwgcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgbmV3U3ByaXRlcy5tYXJrID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIG5ld1Nwcml0ZXMuYXJyb3cgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93Ymx1ZS50ZXh0dXJlKTtcblxuICAgICAgICAgICAgICAgIG5ld1N0YWdlLmFkZENoaWxkKG5ld1Nwcml0ZXMuYXJyb3cpO1xuICAgICAgICAgICAgICAgIG5ld1Nwcml0ZXMuYXJyb3cucG9zaXRpb24ueCA9IDIwMDtcbiAgICAgICAgICAgICAgICBuZXdTcHJpdGVzLmFycm93LnBvc2l0aW9uLnkgPSAyMDA7XG5cbiAgICAgICAgICAgICAgICBkcmF3R3JpZChuZXdTdGFnZSwgcmVzb3VyY2VzLCByb3dzLCBjb2xzLCA2NSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBkcmF3QXJyb3cgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gLy9zaW5nbGUgb2JqZWN0IHRlc3RcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3ByaXRlcy5hcnJvdyk7XG4gICAgICAgIHRoaXMuc3ByaXRlcy5hcnJvdy5wb3NpdGlvbi54ID0gMjAwO1xuICAgICAgICB0aGlzLnNwcml0ZXMuYXJyb3cucG9zaXRpb24ueSA9IDIwMDtcbiAgICB9XG4gICAgcHJpdmF0ZSBkcmF3R3JpZCA9IGZ1bmN0aW9uKG5ld1N0YWdlOmFueSwgcmVzb3VyY2VzOmFueSwgcm93czpudW1iZXIsIGNvbHM6bnVtYmVyLCBzcGFjaW5nOm51bWJlcik6IHZvaWQge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgbmV3U3RhZ2UuYWRkQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgbGV0IHRvdGFsbWFya3MgPSByb3dzICogY29scztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbG1hcmtzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtYXJrID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrLnRleHR1cmUpO1xuICAgICAgICAgICAgbWFyay5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgICAgICBtYXJrLnggPSAoaSAlIGNvbHMpICogc3BhY2luZztcbiAgICAgICAgICAgIG1hcmsueSA9IE1hdGguZmxvb3IoaSAvIHJvd3MpICogc3BhY2luZztcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueCA9IDE7XG4gICAgICAgICAgICBtYXJrLnNjYWxlLnkgPSAxO1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKG1hcmspO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2VudGVyIG9uIHRoZSBzY3JlZW5cbiAgICAgIGNvbnRhaW5lci54ID0gKG5ld1N0YWdlLndpZHRoIC0gY29udGFpbmVyLndpZHRoKSAvIDI7XG4gICAgICBjb250YWluZXIueSA9IChuZXdTdGFnZS5oZWlnaHQgLSBjb250YWluZXIuaGVpZ2h0KSAvIDI7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9uID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vIGNyZWF0ZSBzb21lIHRleHR1cmVzIGZyb20gYW4gaW1hZ2UgcGF0aFxuICAgICAgICB2YXIgdGV4dHVyZUJ1dHRvbiA9IHRoaXMuZ3JhcGhpY3MubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd193YWl0LnBuZ1wiXS50ZXh0dXJlO1xuICAgICAgICB2YXIgdGV4dHVyZUJ1dHRvbkRvd24gPSB0aGlzLmdyYXBoaWNzLmxvYWRlci5yZXNvdXJjZXNbXCJzcmMvZ3JhcGhpY3MvYXJyb3dfcHJlc3MucG5nXCJdLnRleHR1cmU7XG4gICAgICAgIHZhciB0ZXh0dXJlQnV0dG9uT3ZlciA9IHRoaXMuZ3JhcGhpY3MubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd19lcnJvci5wbmdcIl0udGV4dHVyZTtcblxuICAgICAgICB2YXIgYnV0dG9uID0gbmV3IFBJWEkuU3ByaXRlKHRleHR1cmVCdXR0b24pO1xuICAgICAgICBidXR0b24uYnV0dG9uTW9kZSA9IHRydWU7XG5cbiAgICAgICAgYnV0dG9uLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgYnV0dG9uLnggPSAyMDA7XG4gICAgICAgIGJ1dHRvbi55ID0gMjAwO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGJ1dHRvbiBpbnRlcmFjdGl2ZS4uLlxuICAgICAgICBidXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICBidXR0b24uYnV0dG9uTW9kZSA9IHRydWU7XG5cbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICAvLyBNb3VzZSAmIHRvdWNoIGV2ZW50cyBhcmUgbm9ybWFsaXplZCBpbnRvXG4gICAgICAgICAgICAvLyB0aGUgcG9pbnRlciogZXZlbnRzIGZvciBoYW5kbGluZyBkaWZmZXJlbnRcbiAgICAgICAgICAgIC8vIGJ1dHRvbiBldmVudHMuXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJkb3duJywgb25CdXR0b25Eb3duKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXAnLCBvbkJ1dHRvblVwKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm92ZXInLCBvbkJ1dHRvbk92ZXIpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJvdXQnLCBvbkJ1dHRvbk91dCk7XG5cbiAgICAgICAgLy8gVXNlIG1vdXNlLW9ubHkgZXZlbnRzXG4gICAgICAgIC8vIC5vbignbW91c2Vkb3duJywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ21vdXNldXAnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNldXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCdtb3VzZW92ZXInLCBvbkJ1dHRvbk92ZXIpXG4gICAgICAgIC8vIC5vbignbW91c2VvdXQnLCBvbkJ1dHRvbk91dClcblxuICAgICAgICAvLyBVc2UgdG91Y2gtb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCd0b3VjaHN0YXJ0Jywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCd0b3VjaGVuZG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuXG4gICAgICAgIC8vIGFkZCBpdCB0byB0aGUgc3RhZ2VcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChidXR0b24pO1xuXG5cbiAgICAgICAgZnVuY3Rpb24gb25CdXR0b25Eb3duKCkge1xuICAgICAgICAgICAgdGhpcy5pc2Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZUJ1dHRvbkRvd247XG4gICAgICAgICAgICB0aGlzLmFscGhhID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uQnV0dG9uVXAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZUJ1dHRvbk92ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlQnV0dG9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25CdXR0b25PdmVyKCkge1xuICAgICAgICAgICAgdGhpcy5pc092ZXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZUJ1dHRvbk92ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkJ1dHRvbk91dCgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlQnV0dG9uO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmUgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICAvLyBzZXQgYSBmaWxsIGFuZCBsaW5lIHN0eWxlXG4gICAgICAgIHRoaXMubGluZS5saW5lU3R5bGUoMC41LCB0aGlzLmNvbG9ycy5saW5lLCAwLjUpO1xuXG4gICAgICAgIC8vIGRyYXcgYSBzaGFwZVxuICAgICAgICB0aGlzLmxpbmUubW92ZVRvKDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuICAgICAgICB0aGlzLmxpbmUubGluZVRvKHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVRleHQgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy90ZXh0IHRlc3RcbiAgICAgICAgbGV0IHN0eWxlID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgLy8gZmlsbDogWycjZmZmZmZmJywgJyMwMGZmOTknXSwgLy8gZ3JhZGllbnRcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmZvbnQsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IHRydWUsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuICAgICAgICAvL3N0YXR1c1xuICAgICAgICB0aGlzLnN0YXR1cyA9IG5ldyBQSVhJLlRleHQoJy4uLicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5zdGF0dXMueCA9IDExMDtcbiAgICAgICAgdGhpcy5zdGF0dXMueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zdGF0dXMpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJJbml0aWFsaXppbmcuLi5cIiwgMCwgMjAwMCk7XG5cbiAgICAgICAgLy9yb3dzIHRpdGxlXG4gICAgICAgIHRoaXMucm93c1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgc3R5bGUpO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS54ID0gMzAwO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvd3NUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1RpdGxlLCBcInJvd3M6XCIsIDAsIDM1MDApO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuY29scyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiB0aGlzLmNvbHMpO1xuICAgICAgICAvLyAvL3Jvd3MgdmFsdWVcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBzdHlsZSk7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnggPSAzNTA7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucm93c1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVmFsdWUsIHRoaXMucm93cy50b1N0cmluZygpLCAwLCA0MDAwKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy9jb2xzIHRpdGxlXG4gICAgICAgIHRoaXMuY29sc1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uOicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueCA9IDUwMDtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jb2xzVGl0bGUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNUaXRsZSwgJ2NvbHM6JywgMCwgNDUwMCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIC8vY29scyB2YWx1ZVxuICAgICAgICB0aGlzLmNvbHNWYWx1ZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUueCA9IDU1MDtcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jb2xzVmFsdWUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNWYWx1ZSwgdGhpcy5jb2xzLnRvU3RyaW5nKCksIDAsIDUwMDApO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJSZWFkeVwiLCAwLCA2MDAwKTtcblxuICAgIH1cbiAgICAvLyBwdWJsaWMgdXBkYXRlVGV4dCA9IGZ1bmN0aW9uKG1lc3NhZ2U6IHN0cmluZyk6IFBJWEkuVGV4dCB7XG4gICAgLy8gICAgIHRoaXMuc3RhdHVzLnRleHQgPSBtZXNzYWdlO1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5zdGF0dXM7XG4gICAgLy8gfVxuICAgIHByaXZhdGUgdHlwZU1lID0gZnVuY3Rpb24odGV4dE9iajogUElYSS5UZXh0LCBtZXNzYWdlOiBzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6IG51bWJlciwgZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlICsgJyB8ICcgKyBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGFydGluZyB0eXBlXCIpO1xuICAgICAgICAgICAgdGV4dE9iai50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIG1lc3NhZ2VMZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb29wIHRocm91Z2ggdHlwaW5nXG4gICAgICAgIGxldCBuZXdTdHJpbmc6IHN0cmluZyA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICB0ZXh0T2JqLnRleHQgPSBuZXdTdHJpbmc7XG4gICAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3U3RyaW5nKTtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGVuZ3RoIG9mIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUxlbmd0aCsrO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCwgNTApLCBkZWxheSk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgLy9QbGF5IHN0YXJ0dXAgc291bmRcblxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEudHlwZSk7XG4gICAgY29sb3JzID0gZGF0YTtcbiAgICBzZXR1cFBpeGkoKTtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyKTtcbiAgfSk7XG59XG5jaGFuZ2VDb2xvcnMoMCk7XG5cbi8vIC8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuLy8gICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbi8vIH1cbi8vIC8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xuLy8gbGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbi8vICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLyAgIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuLy8gICAvLyBhcHAudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuLy8gICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbi8vICAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG4vLyB9XG5cbi8vQ3JlYXRlIHRoZSBhcHBcbmxldCByZW5kZXJlcjtcbmxldCBzdGFnZTtcblxuLy9idXR0b25cbmxldCBwbGF5QnV0dG9uV2FpdDtcbmxldCBwbGF5QnV0dG9uRG93bjtcbmxldCBwbGF5QnV0dG9uT3ZlcjtcbmxldCBwbGF5QnV0dG9uO1xuXG5sZXQgc2V0dXBQaXhpID0gZnVuY3Rpb24oKTp2b2lke1xuXG4gIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoOTYwLDU0MCxcbiAgICB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4gICk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRhaW5lciBvYmplY3QgY2FsbGVkIHRoZSBgc3RhZ2VgXG4gIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIHN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvL0FkZCB0aGUgY2FudmFzIHRvIHRoZSBIVE1MIGRvY3VtZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgLy9VcGRhdGUgYmFja2dyb3VuZCBjb2xvclxuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbJ2JhY2tncm91bmQnXTtcblxuICBkcmF3U2NlbmUoKTtcbn1cblxuLy9EcmF3IHNjZW5lXG5sZXQgZHJhd1NjZW5lID0gZnVuY3Rpb24oKXtcblxuICAgIC8vaW5pdCBHdWkgcGFzcyBpbiBjb2xvcnNcbiAgICBPVkVSTEFZID0gbmV3IEd1aSggc3RhZ2UsIGNvbG9ycywgU09VTkRMSUIpO1xuICAgIC8vc3RhcnQgcmVuZGVyaW5nIGVuZ2luZVxuICAgIGdhbWVMb29wKCk7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuIl19
