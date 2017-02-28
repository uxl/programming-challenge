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
        this.loadImages = function () {
            var newSprites = {};
            var newStage = this.stage;
            var drawGrid = this.drawGrid;
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
                drawGrid(newStage, resources);
            });
        };
        this.drawArrow = function () {
            // //single object test
            this.stage.addChild(this.sprites.arrow);
            this.sprites.arrow.position.x = 200;
            this.sprites.arrow.position.y = 200;
        };
        this.drawGrid = function (newStage, resources) {
            for (let i = 0; i < 100; i++) {
                let mark = new PIXI.Sprite(resources.mark.texture);
                mark.anchor.set(0.5);
                mark.x = (i % 10) * 100;
                mark.y = Math.floor(i / 10) * 100;
                mark.scale.x = 1;
                mark.scale.y = 1;
                newStage.addChild(mark);
            }
        };
        /*
        private createButton = function(): void {
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
                // Mouse & touch events are normalized into
                // the pointer* events for handling different
                // button events.
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
    
        }
        */
        this.createLine = function () {
            this.line = new PIXI.Graphics();
            // set a fill and line style
            this.line.lineStyle(1, this.colors.line, 1);
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
            this.status = new PIXI.Text('...', style);
            this.status.x = 20;
            this.status.y = window.innerHeight - 60;
            this.stage.addChild(this.status);
            this.typeMe(this.status, "Initializing...", 0);
        };
        // public updateText = function(message: string): PIXI.Text {
        //     this.status.text = message;
        //     return this.status;
        // }
        this.typeMe = function (textObj, message, messageLength) {
            // console.log(message + ' | ' + messageLength);
            if (messageLength === undefined) {
                // console.log("starting type");
                // textObj.text = '';
                messageLength = 0;
            }
            else {
                //increment length of message
                messageLength++;
            }
            //loop through typing
            let newString = message.substring(0, messageLength);
            textObj.text = newString;
            this.sounds.play("keypress");
            // console.log(newString);
            if (messageLength < message.length + 1) {
                setTimeout(this.typeMe.bind(this, textObj, message, messageLength), 100);
                // setTimeout(this.declare.bind(this), 1000);
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
                start: [0, 3000],
                dot: [4000, 1000],
                line: [6000, 5000],
                keypress: [6000, 5000],
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
    //Play startup sound
    SOUNDLIB.play("start");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvR3VpLnRzIiwic3JjL1NvdW5kRWZmZWN0cy50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7SUFJSTtRQUVPLGVBQVUsR0FBRyxVQUFTLE1BQWE7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ3ZDLElBQUksR0FBRyxHQUFXLGlCQUFpQixDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLE1BQU07b0JBQ1Y7d0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxXQUFXOzRCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTt3QkFDdkUsQ0FBQztvQkFDSCxDQUFDLENBQUM7Z0JBRUYsR0FBRyxDQUFDLE9BQU8sR0FBRztvQkFD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Q0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLHdCQUF3QjtJQUN4QixRQUFRLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUNGLElBQUksUUFBUSxHQUFHO0lBQ2IsMkJBQTJCO0lBQzNCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBHdWkge1xuICAgIHByaXZhdGUgc3RhZ2U6IFBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgY29sb3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBzb3VuZHM6IGFueTtcbiAgICBwcml2YXRlIHN0YXR1czogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgbGluZTogUElYSS5HcmFwaGljcztcbiAgICBwcml2YXRlIGxvYWRlciA9IG5ldyBQSVhJLmxvYWRlcnMuTG9hZGVyKCk7XG4gICAgcHJpdmF0ZSBzcHJpdGVzOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTogUElYSS5Db250YWluZXIsIG1haW5Db2xvcnM6IGFueSwgbWFpblNvdW5kczogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMuY29sb3JzID0gbWFpbkNvbG9ycztcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBtYWluU291bmRzO1xuICAgICAgICB0aGlzLmxvYWRJbWFnZXMoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVMaW5lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dCgpOyAgICB9XG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHZhciBuZXdTcHJpdGVzOiBhbnkgPSB7fTtcbiAgICAgICAgdmFyIG5ld1N0YWdlOiBQSVhJLkNvbnRhaW5lciA9IHRoaXMuc3RhZ2U7XG4gICAgICAgIHZhciBkcmF3R3JpZCA9IHRoaXMuZHJhd0dyaWQ7XG4gICAgICAgIC8vbG9hZCBpbWFnZXNcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBQSVhJLmxvYWRlclxuICAgICAgICAgICAgLmFkZCgnYXJyb3dibHVlJywgJ3NyYy9ncmFwaGljcy9hcnJvd19ibHVlLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdtYXJrJywgJ3NyYy9ncmFwaGljcy9tYXJrX2JyYWNrZXQucG5nJylcbiAgICAgICAgICAgIC5sb2FkKGZ1bmN0aW9uKGxvYWRlciwgcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgbmV3U3ByaXRlcy5tYXJrID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIG5ld1Nwcml0ZXMuYXJyb3cgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93Ymx1ZS50ZXh0dXJlKTtcblxuICAgICAgICAgICAgICAgIG5ld1N0YWdlLmFkZENoaWxkKG5ld1Nwcml0ZXMuYXJyb3cpO1xuICAgICAgICAgICAgICAgIG5ld1Nwcml0ZXMuYXJyb3cucG9zaXRpb24ueCA9IDIwMDtcbiAgICAgICAgICAgICAgICBuZXdTcHJpdGVzLmFycm93LnBvc2l0aW9uLnkgPSAyMDA7XG5cbiAgICAgICAgICAgICAgICBkcmF3R3JpZChuZXdTdGFnZSwgcmVzb3VyY2VzKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBwcml2YXRlIGRyYXdBcnJvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyAvL3NpbmdsZSBvYmplY3QgdGVzdFxuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zcHJpdGVzLmFycm93KTtcbiAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93LnBvc2l0aW9uLnggPSAyMDA7XG4gICAgICAgIHRoaXMuc3ByaXRlcy5hcnJvdy5wb3NpdGlvbi55ID0gMjAwO1xuICAgIH1cbiAgICBwcml2YXRlIGRyYXdHcmlkID0gZnVuY3Rpb24obmV3U3RhZ2UsIHJlc291cmNlcyk6IHZvaWQge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbWFyayA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMubWFyay50ZXh0dXJlKTtcbiAgICAgICAgICAgIG1hcmsuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICAgICAgbWFyay54ID0gKGkgJSAxMCkgKiAxMDA7XG4gICAgICAgICAgICBtYXJrLnkgPSBNYXRoLmZsb29yKGkgLyAxMCkgKiAxMDA7XG4gICAgICAgICAgICBtYXJrLnNjYWxlLnggPSAxO1xuICAgICAgICAgICAgbWFyay5zY2FsZS55ID0gMTtcbiAgICAgICAgICAgIG5ld1N0YWdlLmFkZENoaWxkKG1hcmspO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qXG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b24gPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy8gY3JlYXRlIHNvbWUgdGV4dHVyZXMgZnJvbSBhbiBpbWFnZSBwYXRoXG4gICAgICAgIHZhciB0ZXh0dXJlQnV0dG9uID0gdGhpcy5ncmFwaGljcy5sb2FkZXIucmVzb3VyY2VzW1wic3JjL2dyYXBoaWNzL2Fycm93X3dhaXQucG5nXCJdLnRleHR1cmU7XG4gICAgICAgIHZhciB0ZXh0dXJlQnV0dG9uRG93biA9IHRoaXMuZ3JhcGhpY3MubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd19wcmVzcy5wbmdcIl0udGV4dHVyZTtcbiAgICAgICAgdmFyIHRleHR1cmVCdXR0b25PdmVyID0gdGhpcy5ncmFwaGljcy5sb2FkZXIucmVzb3VyY2VzW1wic3JjL2dyYXBoaWNzL2Fycm93X2Vycm9yLnBuZ1wiXS50ZXh0dXJlO1xuXG4gICAgICAgIHZhciBidXR0b24gPSBuZXcgUElYSS5TcHJpdGUodGV4dHVyZUJ1dHRvbik7XG4gICAgICAgIGJ1dHRvbi5idXR0b25Nb2RlID0gdHJ1ZTtcblxuICAgICAgICBidXR0b24uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICBidXR0b24ueCA9IDIwMDtcbiAgICAgICAgYnV0dG9uLnkgPSAyMDA7XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGludGVyYWN0aXZlLi4uXG4gICAgICAgIGJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGJ1dHRvbi5idXR0b25Nb2RlID0gdHJ1ZTtcblxuICAgICAgICBidXR0b25cbiAgICAgICAgICAgIC8vIE1vdXNlICYgdG91Y2ggZXZlbnRzIGFyZSBub3JtYWxpemVkIGludG9cbiAgICAgICAgICAgIC8vIHRoZSBwb2ludGVyKiBldmVudHMgZm9yIGhhbmRsaW5nIGRpZmZlcmVudFxuICAgICAgICAgICAgLy8gYnV0dG9uIGV2ZW50cy5cbiAgICAgICAgICAgIC5vbigncG9pbnRlcmRvd24nLCBvbkJ1dHRvbkRvd24pXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIG9uQnV0dG9uVXApXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyb3ZlcicsIG9uQnV0dG9uT3ZlcilcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm91dCcsIG9uQnV0dG9uT3V0KTtcblxuICAgICAgICAvLyBVc2UgbW91c2Utb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCdtb3VzZWRvd24nLCBvbkJ1dHRvbkRvd24pXG4gICAgICAgIC8vIC5vbignbW91c2V1cCcsIG9uQnV0dG9uVXApXG4gICAgICAgIC8vIC5vbignbW91c2V1cG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNlb3ZlcicsIG9uQnV0dG9uT3ZlcilcbiAgICAgICAgLy8gLm9uKCdtb3VzZW91dCcsIG9uQnV0dG9uT3V0KVxuXG4gICAgICAgIC8vIFVzZSB0b3VjaC1vbmx5IGV2ZW50c1xuICAgICAgICAvLyAub24oJ3RvdWNoc3RhcnQnLCBvbkJ1dHRvbkRvd24pXG4gICAgICAgIC8vIC5vbigndG91Y2hlbmQnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kb3V0c2lkZScsIG9uQnV0dG9uVXApXG5cbiAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBzdGFnZVxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKGJ1dHRvbik7XG5cblxuICAgICAgICBmdW5jdGlvbiBvbkJ1dHRvbkRvd24oKSB7XG4gICAgICAgICAgICB0aGlzLmlzZG93biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlQnV0dG9uRG93bjtcbiAgICAgICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25CdXR0b25VcCgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNkb3duID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5pc092ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlQnV0dG9uT3ZlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmVCdXR0b247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkJ1dHRvbk92ZXIoKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3ZlciA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlQnV0dG9uT3ZlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uQnV0dG9uT3V0KCkge1xuICAgICAgICAgICAgdGhpcy5pc092ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzZG93bikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRleHR1cmVCdXR0b247XG4gICAgICAgIH1cblxuICAgIH1cbiAgICAqL1xuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICAgICAgLy8gc2V0IGEgZmlsbCBhbmQgbGluZSBzdHlsZVxuICAgICAgICB0aGlzLmxpbmUubGluZVN0eWxlKDEsIHRoaXMuY29sb3JzLmxpbmUsIDEpO1xuXG4gICAgICAgIC8vIGRyYXcgYSBzaGFwZVxuICAgICAgICB0aGlzLmxpbmUubW92ZVRvKDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuICAgICAgICB0aGlzLmxpbmUubGluZVRvKHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVRleHQgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy90ZXh0IHRlc3RcbiAgICAgICAgbGV0IHN0eWxlID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgLy8gZmlsbDogWycjZmZmZmZmJywgJyMwMGZmOTknXSwgLy8gZ3JhZGllbnRcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmZvbnQsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IHRydWUsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuc3RhdHVzID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgc3R5bGUpO1xuICAgICAgICB0aGlzLnN0YXR1cy54ID0gMjA7XG4gICAgICAgIHRoaXMuc3RhdHVzLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3RhdHVzKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiSW5pdGlhbGl6aW5nLi4uXCIsIDApO1xuICAgIH1cbiAgICAvLyBwdWJsaWMgdXBkYXRlVGV4dCA9IGZ1bmN0aW9uKG1lc3NhZ2U6IHN0cmluZyk6IFBJWEkuVGV4dCB7XG4gICAgLy8gICAgIHRoaXMuc3RhdHVzLnRleHQgPSBtZXNzYWdlO1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5zdGF0dXM7XG4gICAgLy8gfVxuICAgIHByaXZhdGUgdHlwZU1lID0gZnVuY3Rpb24odGV4dE9iajogUElYSS5UZXh0LCBtZXNzYWdlOiBzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlICsgJyB8ICcgKyBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGFydGluZyB0eXBlXCIpO1xuICAgICAgICAgICAgLy8gdGV4dE9iai50ZXh0ID0gJyc7XG4gICAgICAgICAgICBtZXNzYWdlTGVuZ3RoID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vaW5jcmVtZW50IGxlbmd0aCBvZiBtZXNzYWdlXG4gICAgICAgICAgICBtZXNzYWdlTGVuZ3RoKys7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvb3AgdGhyb3VnaCB0eXBpbmdcbiAgICAgICAgbGV0IG5ld1N0cmluZzogc3RyaW5nID0gbWVzc2FnZS5zdWJzdHJpbmcoMCwgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIHRleHRPYmoudGV4dCA9IG5ld1N0cmluZztcbiAgICAgICAgdGhpcy5zb3VuZHMucGxheShcImtleXByZXNzXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdTdHJpbmcpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCksIDEwMCk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEhvd2wgfSBmcm9tIFwiaG93bGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTb3VuZEVmZmVjdHMge1xuICBwdWJsaWMgc25kc3ByaXRlOkhvd2w7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAvL2xvYWQgc3ByaXRlXG4gICAgICB0aGlzLnNuZHNwcml0ZSA9IG5ldyBIb3dsKHtcbiAgICAgIHNyYzogWydzcmMvYXVkaW8vc3ByaXRlLndhdiddLFxuICAgICAgc3ByaXRlOiB7XG4gICAgICAgIHN0YXJ0OiBbMCwgMzAwMF0sXG4gICAgICAgIGRvdDogWzQwMDAsIDEwMDBdLFxuICAgICAgICBsaW5lOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIGtleXByZXNzOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEudHlwZSk7XG4gICAgY29sb3JzID0gZGF0YTtcbiAgICBzZXR1cFBpeGkoKTtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyKTtcbiAgfSk7XG59XG5jaGFuZ2VDb2xvcnMoMCk7XG5cbi8vIC8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuLy8gICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbi8vIH1cbi8vIC8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xuLy8gbGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbi8vICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLyAgIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuLy8gICAvLyBhcHAudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuLy8gICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbi8vICAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG4vLyB9XG5cbi8vQ3JlYXRlIHRoZSBhcHBcbmxldCByZW5kZXJlcjtcbmxldCBzdGFnZTtcblxuLy9idXR0b25cbmxldCBwbGF5QnV0dG9uV2FpdDtcbmxldCBwbGF5QnV0dG9uRG93bjtcbmxldCBwbGF5QnV0dG9uT3ZlcjtcbmxldCBwbGF5QnV0dG9uO1xuXG5sZXQgc2V0dXBQaXhpID0gZnVuY3Rpb24oKTp2b2lke1xuXG4gIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoOTYwLDU0MCxcbiAgICB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4gICk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRhaW5lciBvYmplY3QgY2FsbGVkIHRoZSBgc3RhZ2VgXG4gIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIHN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvL0FkZCB0aGUgY2FudmFzIHRvIHRoZSBIVE1MIGRvY3VtZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgLy9VcGRhdGUgYmFja2dyb3VuZCBjb2xvclxuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbJ2JhY2tncm91bmQnXTtcblxuICAvL1BsYXkgc3RhcnR1cCBzb3VuZFxuICBTT1VORExJQi5wbGF5KFwic3RhcnRcIik7XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG5cblxuXG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIE9WRVJMQVkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbn07XG5sZXQgZ2FtZUxvb3AgPSBmdW5jdGlvbigpOnZvaWR7XG4gIC8vbG9vcCA2MCBmcmFtZXMgcGVyIHNlY29uZFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG59XG4iXX0=
