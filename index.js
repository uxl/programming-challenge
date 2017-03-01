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
                .add('player_blue', 'src/graphics/player_blue.png')
                .add('mark_bracket', 'src/graphics/mark_bracket.png')
                .load(function (loader, resources) {
                newSprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                newSprites.mark_bracket = new PIXI.Sprite(resources.mark_bracket.texture);
                //player
                newStage.addChild(newSprites.player_blue);
                newSprites.player_blue.position.x = 500;
                newSprites.player_blue.position.y = 500;
                drawGrid(newStage, resources, rows, cols, 65);
            });
        };
        this.drawGrid = function (newStage, resources, rows, cols, spacing) {
            var container = new PIXI.Container();
            newStage.addChild(container);
            let totalmarks = rows * cols;
            for (let i = 0; i < totalmarks; i++) {
                let mark = new PIXI.Sprite(resources.mark_bracket.texture);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvR3VpLnRzIiwic3JjL1NvdW5kRWZmZWN0cy50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7SUFJSTtRQUVPLGVBQVUsR0FBRyxVQUFTLE1BQWE7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ3ZDLElBQUksR0FBRyxHQUFXLGlCQUFpQixDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLE1BQU07b0JBQ1Y7d0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxXQUFXOzRCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTt3QkFDdkUsQ0FBQztvQkFDSCxDQUFDLENBQUM7Z0JBRUYsR0FBRyxDQUFDLE9BQU8sR0FBRztvQkFD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RSxDQUFDO0lBQzdCLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBRXpCLHFDQUFxQztJQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekMseUJBQXlCO0lBQ3pCLFFBQVEsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWhELFNBQVMsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBO0FBRUQsWUFBWTtBQUNaLElBQUksU0FBUyxHQUFHO0lBRVoseUJBQXlCO0lBQ3pCLE9BQU8sR0FBRyxJQUFJLFNBQUcsQ0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLHdCQUF3QjtJQUN4QixRQUFRLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUNGLElBQUksUUFBUSxHQUFHO0lBQ2IsMkJBQTJCO0lBQzNCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBHdWkge1xuICAgIHByaXZhdGUgc3RhZ2U6IFBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgY29sb3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBzb3VuZHM6IGFueTtcblxuICAgIC8vdGV4dCBlbGVtZW50c1xuICAgIHByaXZhdGUgc3RhdHVzOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSByb3dzVGl0bGU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIHJvd3NWYWx1ZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgY29sc1RpdGxlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSBjb2xzVmFsdWU6IFBJWEkuVGV4dDtcblxuICAgIHByaXZhdGUgbGluZTogUElYSS5HcmFwaGljcztcbiAgICBwcml2YXRlIGxvYWRlciA9IG5ldyBQSVhJLmxvYWRlcnMuTG9hZGVyKCk7XG4gICAgcHJpdmF0ZSBzcHJpdGVzOiBhbnkgPSB7fTtcblxuICAgIHByaXZhdGUgcm93czpudW1iZXIgPSAxMDtcbiAgICBwcml2YXRlIGNvbHM6bnVtYmVyID0gMTA7XG5cbiAgICBjb25zdHJ1Y3RvcihtYWluU3RhZ2U6IFBJWEkuQ29udGFpbmVyLCBtYWluQ29sb3JzOiBhbnksIG1haW5Tb3VuZHM6IGFueSkge1xuICAgICAgICB0aGlzLnN0YWdlID0gbWFpblN0YWdlO1xuICAgICAgICB0aGlzLmNvbG9ycyA9IG1haW5Db2xvcnM7XG4gICAgICAgIHRoaXMuc291bmRzID0gbWFpblNvdW5kcztcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2VzKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVRleHQoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHZhciBuZXdTcHJpdGVzOiBhbnkgPSB7fTtcbiAgICAgICAgdmFyIG5ld1N0YWdlOiBQSVhJLkNvbnRhaW5lciA9IHRoaXMuc3RhZ2U7XG4gICAgICAgIHZhciBkcmF3R3JpZCA9IHRoaXMuZHJhd0dyaWQ7XG4gICAgICAgIHZhciByb3dzOm51bWJlciA9IHRoaXMucm93cztcbiAgICAgICAgdmFyIGNvbHM6bnVtYmVyID0gdGhpcy5jb2xzO1xuICAgICAgICAvL2xvYWQgaW1hZ2VzXG4gICAgICAgIHRoaXMubG9hZGVyID0gUElYSS5sb2FkZXJcbiAgICAgICAgICAgIC5hZGQoJ3BsYXllcl9ibHVlJywgJ3NyYy9ncmFwaGljcy9wbGF5ZXJfYmx1ZS5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnbWFya19icmFja2V0JywgJ3NyYy9ncmFwaGljcy9tYXJrX2JyYWNrZXQucG5nJylcblxuICAgICAgICAgICAgLmxvYWQoZnVuY3Rpb24obG9hZGVyLCByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgbmV3U3ByaXRlcy5wbGF5ZXJfYmx1ZSA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMucGxheWVyX2JsdWUudGV4dHVyZSk7XG4gICAgICAgICAgICAgIG5ld1Nwcml0ZXMubWFya19icmFja2V0ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrX2JyYWNrZXQudGV4dHVyZSk7XG5cbiAgICAgICAgICAgICAgICAvL3BsYXllclxuICAgICAgICAgICAgICAgIG5ld1N0YWdlLmFkZENoaWxkKG5ld1Nwcml0ZXMucGxheWVyX2JsdWUpO1xuICAgICAgICAgICAgICAgIG5ld1Nwcml0ZXMucGxheWVyX2JsdWUucG9zaXRpb24ueCA9IDUwMDtcbiAgICAgICAgICAgICAgICBuZXdTcHJpdGVzLnBsYXllcl9ibHVlLnBvc2l0aW9uLnkgPSA1MDA7XG5cbiAgICAgICAgICAgICAgICBkcmF3R3JpZChuZXdTdGFnZSwgcmVzb3VyY2VzLCByb3dzLCBjb2xzLCA2NSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcHJpdmF0ZSBkcmF3R3JpZCA9IGZ1bmN0aW9uKG5ld1N0YWdlOmFueSwgcmVzb3VyY2VzOmFueSwgcm93czpudW1iZXIsIGNvbHM6bnVtYmVyLCBzcGFjaW5nOm51bWJlcik6IHZvaWQge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgbmV3U3RhZ2UuYWRkQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgbGV0IHRvdGFsbWFya3MgPSByb3dzICogY29scztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbG1hcmtzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtYXJrID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrX2JyYWNrZXQudGV4dHVyZSk7XG4gICAgICAgICAgICBtYXJrLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgICAgIG1hcmsueCA9IChpICUgY29scykgKiBzcGFjaW5nO1xuICAgICAgICAgICAgbWFyay55ID0gTWF0aC5mbG9vcihpIC8gcm93cykgKiBzcGFjaW5nO1xuICAgICAgICAgICAgbWFyay5zY2FsZS54ID0gMTtcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueSA9IDE7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2hpbGQobWFyayk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDZW50ZXIgb24gdGhlIHNjcmVlblxuICAgICAgY29udGFpbmVyLnggPSAobmV3U3RhZ2Uud2lkdGggLSBjb250YWluZXIud2lkdGgpIC8gMjtcbiAgICAgIGNvbnRhaW5lci55ID0gKG5ld1N0YWdlLmhlaWdodCAtIGNvbnRhaW5lci5oZWlnaHQpIC8gMjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmUgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICAvLyBzZXQgYSBmaWxsIGFuZCBsaW5lIHN0eWxlXG4gICAgICAgIHRoaXMubGluZS5saW5lU3R5bGUoMC41LCB0aGlzLmNvbG9ycy5saW5lLCAwLjUpO1xuXG4gICAgICAgIC8vIGRyYXcgYSBzaGFwZVxuICAgICAgICB0aGlzLmxpbmUubW92ZVRvKDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuICAgICAgICB0aGlzLmxpbmUubGluZVRvKHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVRleHQgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy90ZXh0IHRlc3RcbiAgICAgICAgbGV0IHN0eWxlID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZm9udCxcbiAgICAgICAgICAgIC8vIHN0cm9rZTogJyM0YTE4NTAnLFxuICAgICAgICAgICAgLy8gc3Ryb2tlVGhpY2tuZXNzOiA1LFxuICAgICAgICAgICAgZHJvcFNoYWRvdzogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0JsdXI6IDQsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0Rpc3RhbmNlOiA2LFxuICAgICAgICAgICAgd29yZFdyYXA6IHRydWUsXG4gICAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBoZWFkbGluZSA9IG5ldyBQSVhJLlRleHRTdHlsZSh7XG4gICAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmhlYWRsaW5lLFxuICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzRhMTg1MCcsXG4gICAgICAgICAgICAvLyBzdHJva2VUaGlja25lc3M6IDUsXG4gICAgICAgICAgICBkcm9wU2hhZG93OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0JsdXI6IDQsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0Rpc3RhbmNlOiA2LFxuICAgICAgICAgICAgd29yZFdyYXA6IHRydWUsXG4gICAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vc3RhdHVzXG4gICAgICAgIHRoaXMuc3RhdHVzID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLnN0YXR1cy54ID0gMTEwO1xuICAgICAgICB0aGlzLnN0YXR1cy55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnN0YXR1cyk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuc3RhdHVzLCBcIkluaXRpYWxpemluZy4uLlwiLCAwLCAyMDAwKTtcblxuICAgICAgICAvL3Jvd3MgdGl0bGVcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBzdHlsZSk7XG4gICAgICAgIHRoaXMucm93c1RpdGxlLnggPSAzMDA7XG4gICAgICAgIHRoaXMucm93c1RpdGxlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucm93c1RpdGxlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVGl0bGUsIFwicm93czpcIiwgMCwgMzUwMCk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2xzKTtcbiAgICAgICAgY29uc29sZS5sb2codHlwZW9mIHRoaXMuY29scyk7XG5cbiAgICAgICAgLy9yb3dzIHZhbHVlXG4gICAgICAgIHRoaXMucm93c1ZhbHVlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLnJvd3NWYWx1ZS54ID0gMzUwO1xuICAgICAgICB0aGlzLnJvd3NWYWx1ZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvd3NWYWx1ZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLnJvd3MudG9TdHJpbmcoKSwgMCwgNDAwMCk7XG5cbiAgICAgICAgLy9jb2xzIHRpdGxlXG4gICAgICAgIHRoaXMuY29sc1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uOicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueCA9IDUwMDtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jb2xzVGl0bGUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNUaXRsZSwgJ2NvbHM6JywgMCwgNDUwMCk7XG5cbiAgICAgICAgLy8gLy9jb2xzIHZhbHVlXG4gICAgICAgIHRoaXMuY29sc1ZhbHVlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLmNvbHNWYWx1ZS54ID0gNTUwO1xuICAgICAgICB0aGlzLmNvbHNWYWx1ZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNvbHNWYWx1ZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1ZhbHVlLCB0aGlzLmNvbHMudG9TdHJpbmcoKSwgMCwgNTAwMCk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuc3RhdHVzLCBcIlJlYWR5XCIsIDAsIDYwMDApO1xuXG4gICAgfVxuICAgIHByaXZhdGUgdHlwZU1lID0gZnVuY3Rpb24odGV4dE9iajogUElYSS5UZXh0LCBtZXNzYWdlOiBzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6IG51bWJlciwgZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlICsgJyB8ICcgKyBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGFydGluZyB0eXBlXCIpO1xuICAgICAgICAgICAgdGV4dE9iai50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIG1lc3NhZ2VMZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb29wIHRocm91Z2ggdHlwaW5nXG4gICAgICAgIGxldCBuZXdTdHJpbmc6IHN0cmluZyA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICB0ZXh0T2JqLnRleHQgPSBuZXdTdHJpbmc7XG4gICAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3U3RyaW5nKTtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGVuZ3RoIG9mIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUxlbmd0aCsrO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCwgNTApLCBkZWxheSk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgLy9QbGF5IHN0YXJ0dXAgc291bmRcblxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEudHlwZSk7XG4gICAgY29sb3JzID0gZGF0YTtcbiAgICBzZXR1cFBpeGkoKTtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyKTtcbiAgfSk7XG59XG5jaGFuZ2VDb2xvcnMoMCk7XG5cbi8vIC8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuLy8gICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbi8vIH1cbi8vIC8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xuLy8gbGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbi8vICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLyAgIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuLy8gICAvLyBhcHAudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuLy8gICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbi8vICAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG4vLyB9XG5cbi8vQ3JlYXRlIHRoZSBhcHBcbmxldCByZW5kZXJlcjtcbmxldCBzdGFnZTtcblxuLy9idXR0b25cbmxldCBwbGF5QnV0dG9uV2FpdDtcbmxldCBwbGF5QnV0dG9uRG93bjtcbmxldCBwbGF5QnV0dG9uT3ZlcjtcbmxldCBwbGF5QnV0dG9uO1xuXG5sZXQgc2V0dXBQaXhpID0gZnVuY3Rpb24oKTp2b2lke1xuXG4gIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoOTYwLDU0MCxcbiAgICB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4gICk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRhaW5lciBvYmplY3QgY2FsbGVkIHRoZSBgc3RhZ2VgXG4gIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIHN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvL0FkZCB0aGUgY2FudmFzIHRvIHRoZSBIVE1MIGRvY3VtZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgLy9VcGRhdGUgYmFja2dyb3VuZCBjb2xvclxuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbJ2JhY2tncm91bmQnXTtcblxuICBkcmF3U2NlbmUoKTtcbn1cblxuLy9EcmF3IHNjZW5lXG5sZXQgZHJhd1NjZW5lID0gZnVuY3Rpb24oKXtcblxuICAgIC8vaW5pdCBHdWkgcGFzcyBpbiBjb2xvcnNcbiAgICBPVkVSTEFZID0gbmV3IEd1aSggc3RhZ2UsIGNvbG9ycywgU09VTkRMSUIpO1xuICAgIC8vc3RhcnQgcmVuZGVyaW5nIGVuZ2luZVxuICAgIGdhbWVMb29wKCk7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuIl19
