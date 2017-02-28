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
                drawGrid(newStage, resources, 10, 10, 65);
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
            this.status = new PIXI.Text('...', style);
            this.status.x = 110;
            this.status.y = window.innerHeight - 50;
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
                setTimeout(this.typeMe.bind(this, textObj, message, messageLength), 50);
                // setTimeout(this.declare.bind(this), 1000);
            }
            else {
                //Play startup sound
                this.sounds.play("start");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvR3VpLnRzIiwic3JjL1NvdW5kRWZmZWN0cy50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7SUFJSTtRQUVPLGVBQVUsR0FBRyxVQUFTLE1BQWE7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ3ZDLElBQUksR0FBRyxHQUFXLGlCQUFpQixDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLE1BQU07b0JBQ1Y7d0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxXQUFXOzRCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTt3QkFDdkUsQ0FBQztvQkFDSCxDQUFDLENBQUM7Z0JBRUYsR0FBRyxDQUFDLE9BQU8sR0FBRztvQkFD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RyxJQUFJLENBQUM7SUFDM0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUV2RCw4Q0FBOEM7SUFDOUMsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLEtBQUssQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0lBRXpCLHFDQUFxQztJQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekMseUJBQXlCO0lBQ3pCLFFBQVEsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWhELFNBQVMsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBO0FBRUQsWUFBWTtBQUNaLElBQUksU0FBUyxHQUFHO0lBSVoseUJBQXlCO0lBQ3pCLE9BQU8sR0FBRyxJQUFJLFNBQUcsQ0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLHdCQUF3QjtJQUN4QixRQUFRLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUNGLElBQUksUUFBUSxHQUFHO0lBQ2IsMkJBQTJCO0lBQzNCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBHdWkge1xuICAgIHByaXZhdGUgc3RhZ2U6IFBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgY29sb3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBzb3VuZHM6IGFueTtcbiAgICBwcml2YXRlIHN0YXR1czogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgbGluZTogUElYSS5HcmFwaGljcztcbiAgICBwcml2YXRlIGxvYWRlciA9IG5ldyBQSVhJLmxvYWRlcnMuTG9hZGVyKCk7XG4gICAgcHJpdmF0ZSBzcHJpdGVzOiBhbnkgPSB7fTtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTogUElYSS5Db250YWluZXIsIG1haW5Db2xvcnM6IGFueSwgbWFpblNvdW5kczogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMuY29sb3JzID0gbWFpbkNvbG9ycztcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBtYWluU291bmRzO1xuICAgICAgICB0aGlzLmxvYWRJbWFnZXMoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVMaW5lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dCgpO1xuICAgIH1cbiAgICBwcml2YXRlIGxvYWRJbWFnZXMgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdmFyIG5ld1Nwcml0ZXM6IGFueSA9IHt9O1xuICAgICAgICB2YXIgbmV3U3RhZ2U6IFBJWEkuQ29udGFpbmVyID0gdGhpcy5zdGFnZTtcbiAgICAgICAgdmFyIGRyYXdHcmlkID0gdGhpcy5kcmF3R3JpZDtcbiAgICAgICAgLy9sb2FkIGltYWdlc1xuICAgICAgICB0aGlzLmxvYWRlciA9IFBJWEkubG9hZGVyXG4gICAgICAgICAgICAuYWRkKCdhcnJvd2JsdWUnLCAnc3JjL2dyYXBoaWNzL2Fycm93X2JsdWUucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ21hcmsnLCAnc3JjL2dyYXBoaWNzL21hcmtfYnJhY2tldC5wbmcnKVxuICAgICAgICAgICAgLmxvYWQoZnVuY3Rpb24obG9hZGVyLCByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICBuZXdTcHJpdGVzLm1hcmsgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLm1hcmsudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgbmV3U3ByaXRlcy5hcnJvdyA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dibHVlLnRleHR1cmUpO1xuXG4gICAgICAgICAgICAgICAgbmV3U3RhZ2UuYWRkQ2hpbGQobmV3U3ByaXRlcy5hcnJvdyk7XG4gICAgICAgICAgICAgICAgbmV3U3ByaXRlcy5hcnJvdy5wb3NpdGlvbi54ID0gMjAwO1xuICAgICAgICAgICAgICAgIG5ld1Nwcml0ZXMuYXJyb3cucG9zaXRpb24ueSA9IDIwMDtcblxuICAgICAgICAgICAgICAgIGRyYXdHcmlkKG5ld1N0YWdlLCByZXNvdXJjZXMsIDEwLCAxMCwgNjUpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgIHByaXZhdGUgZHJhd0Fycm93ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIC8vc2luZ2xlIG9iamVjdCB0ZXN0XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnNwcml0ZXMuYXJyb3cpO1xuICAgICAgICB0aGlzLnNwcml0ZXMuYXJyb3cucG9zaXRpb24ueCA9IDIwMDtcbiAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93LnBvc2l0aW9uLnkgPSAyMDA7XG4gICAgfVxuICAgIHByaXZhdGUgZHJhd0dyaWQgPSBmdW5jdGlvbihuZXdTdGFnZTphbnksIHJlc291cmNlczphbnksIHJvd3M6bnVtYmVyLCBjb2xzOm51bWJlciwgc3BhY2luZzpudW1iZXIpOiB2b2lkIHtcbiAgICAgIHZhciBjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgIG5ld1N0YWdlLmFkZENoaWxkKGNvbnRhaW5lcik7XG4gICAgICAgIGxldCB0b3RhbG1hcmtzID0gcm93cyAqIGNvbHM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxtYXJrczsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbWFyayA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMubWFyay50ZXh0dXJlKTtcbiAgICAgICAgICAgIG1hcmsuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICAgICAgbWFyay54ID0gKGkgJSBjb2xzKSAqIHNwYWNpbmc7XG4gICAgICAgICAgICBtYXJrLnkgPSBNYXRoLmZsb29yKGkgLyByb3dzKSAqIHNwYWNpbmc7XG4gICAgICAgICAgICBtYXJrLnNjYWxlLnggPSAxO1xuICAgICAgICAgICAgbWFyay5zY2FsZS55ID0gMTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChtYXJrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENlbnRlciBvbiB0aGUgc2NyZWVuXG4gICAgICBjb250YWluZXIueCA9IChuZXdTdGFnZS53aWR0aCAtIGNvbnRhaW5lci53aWR0aCkgLyAyO1xuICAgICAgY29udGFpbmVyLnkgPSAobmV3U3RhZ2UuaGVpZ2h0IC0gY29udGFpbmVyLmhlaWdodCkgLyAyO1xuICAgIH1cbiAgICAvKlxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9uID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vIGNyZWF0ZSBzb21lIHRleHR1cmVzIGZyb20gYW4gaW1hZ2UgcGF0aFxuICAgICAgICB2YXIgdGV4dHVyZUJ1dHRvbiA9IHRoaXMuZ3JhcGhpY3MubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd193YWl0LnBuZ1wiXS50ZXh0dXJlO1xuICAgICAgICB2YXIgdGV4dHVyZUJ1dHRvbkRvd24gPSB0aGlzLmdyYXBoaWNzLmxvYWRlci5yZXNvdXJjZXNbXCJzcmMvZ3JhcGhpY3MvYXJyb3dfcHJlc3MucG5nXCJdLnRleHR1cmU7XG4gICAgICAgIHZhciB0ZXh0dXJlQnV0dG9uT3ZlciA9IHRoaXMuZ3JhcGhpY3MubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd19lcnJvci5wbmdcIl0udGV4dHVyZTtcblxuICAgICAgICB2YXIgYnV0dG9uID0gbmV3IFBJWEkuU3ByaXRlKHRleHR1cmVCdXR0b24pO1xuICAgICAgICBidXR0b24uYnV0dG9uTW9kZSA9IHRydWU7XG5cbiAgICAgICAgYnV0dG9uLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgYnV0dG9uLnggPSAyMDA7XG4gICAgICAgIGJ1dHRvbi55ID0gMjAwO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGJ1dHRvbiBpbnRlcmFjdGl2ZS4uLlxuICAgICAgICBidXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICBidXR0b24uYnV0dG9uTW9kZSA9IHRydWU7XG5cbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICAvLyBNb3VzZSAmIHRvdWNoIGV2ZW50cyBhcmUgbm9ybWFsaXplZCBpbnRvXG4gICAgICAgICAgICAvLyB0aGUgcG9pbnRlciogZXZlbnRzIGZvciBoYW5kbGluZyBkaWZmZXJlbnRcbiAgICAgICAgICAgIC8vIGJ1dHRvbiBldmVudHMuXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJkb3duJywgb25CdXR0b25Eb3duKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXAnLCBvbkJ1dHRvblVwKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm92ZXInLCBvbkJ1dHRvbk92ZXIpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJvdXQnLCBvbkJ1dHRvbk91dCk7XG5cbiAgICAgICAgLy8gVXNlIG1vdXNlLW9ubHkgZXZlbnRzXG4gICAgICAgIC8vIC5vbignbW91c2Vkb3duJywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ21vdXNldXAnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNldXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCdtb3VzZW92ZXInLCBvbkJ1dHRvbk92ZXIpXG4gICAgICAgIC8vIC5vbignbW91c2VvdXQnLCBvbkJ1dHRvbk91dClcblxuICAgICAgICAvLyBVc2UgdG91Y2gtb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCd0b3VjaHN0YXJ0Jywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCd0b3VjaGVuZG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuXG4gICAgICAgIC8vIGFkZCBpdCB0byB0aGUgc3RhZ2VcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChidXR0b24pO1xuXG5cbiAgICAgICAgZnVuY3Rpb24gb25CdXR0b25Eb3duKCkge1xuICAgICAgICAgICAgdGhpcy5pc2Rvd24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZUJ1dHRvbkRvd247XG4gICAgICAgICAgICB0aGlzLmFscGhhID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uQnV0dG9uVXAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzZG93biA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZUJ1dHRvbk92ZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlQnV0dG9uO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb25CdXR0b25PdmVyKCkge1xuICAgICAgICAgICAgdGhpcy5pc092ZXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGV4dHVyZUJ1dHRvbk92ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkJ1dHRvbk91dCgpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlQnV0dG9uO1xuICAgICAgICB9XG5cbiAgICB9XG4gICAgKi9cblxuICAgIHByaXZhdGUgY3JlYXRlTGluZSA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuXG4gICAgICAgIC8vIHNldCBhIGZpbGwgYW5kIGxpbmUgc3R5bGVcbiAgICAgICAgdGhpcy5saW5lLmxpbmVTdHlsZSgwLjUsIHRoaXMuY29sb3JzLmxpbmUsIDAuNSk7XG5cbiAgICAgICAgLy8gZHJhdyBhIHNoYXBlXG4gICAgICAgIHRoaXMubGluZS5tb3ZlVG8oMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG4gICAgICAgIHRoaXMubGluZS5saW5lVG8od2luZG93LmlubmVyV2lkdGggLSAxMDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKTtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlVGV4dCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvL3RleHQgdGVzdFxuICAgICAgICBsZXQgc3R5bGUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICAvLyBmaWxsOiBbJyNmZmZmZmYnLCAnIzAwZmY5OSddLCAvLyBncmFkaWVudFxuICAgICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZm9udCxcbiAgICAgICAgICAgIC8vIHN0cm9rZTogJyM0YTE4NTAnLFxuICAgICAgICAgICAgLy8gc3Ryb2tlVGhpY2tuZXNzOiA1LFxuICAgICAgICAgICAgZHJvcFNoYWRvdzogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0JsdXI6IDQsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0Rpc3RhbmNlOiA2LFxuICAgICAgICAgICAgd29yZFdyYXA6IHRydWUsXG4gICAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zdGF0dXMgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBzdHlsZSk7XG4gICAgICAgIHRoaXMuc3RhdHVzLnggPSAxMTA7XG4gICAgICAgIHRoaXMuc3RhdHVzLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3RhdHVzKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiSW5pdGlhbGl6aW5nLi4uXCIsIDApO1xuICAgIH1cbiAgICAvLyBwdWJsaWMgdXBkYXRlVGV4dCA9IGZ1bmN0aW9uKG1lc3NhZ2U6IHN0cmluZyk6IFBJWEkuVGV4dCB7XG4gICAgLy8gICAgIHRoaXMuc3RhdHVzLnRleHQgPSBtZXNzYWdlO1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5zdGF0dXM7XG4gICAgLy8gfVxuICAgIHByaXZhdGUgdHlwZU1lID0gZnVuY3Rpb24odGV4dE9iajogUElYSS5UZXh0LCBtZXNzYWdlOiBzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlICsgJyB8ICcgKyBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGFydGluZyB0eXBlXCIpO1xuICAgICAgICAgICAgLy8gdGV4dE9iai50ZXh0ID0gJyc7XG4gICAgICAgICAgICBtZXNzYWdlTGVuZ3RoID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vaW5jcmVtZW50IGxlbmd0aCBvZiBtZXNzYWdlXG4gICAgICAgICAgICBtZXNzYWdlTGVuZ3RoKys7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvb3AgdGhyb3VnaCB0eXBpbmdcbiAgICAgICAgbGV0IG5ld1N0cmluZzogc3RyaW5nID0gbWVzc2FnZS5zdWJzdHJpbmcoMCwgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIHRleHRPYmoudGV4dCA9IG5ld1N0cmluZztcbiAgICAgICAgdGhpcy5zb3VuZHMucGxheShcImtleXByZXNzXCIpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdTdHJpbmcpO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCksIDUwKTtcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQodGhpcy5kZWNsYXJlLmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAvL1BsYXkgc3RhcnR1cCBzb3VuZFxuICAgICAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJzdGFydFwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEhvd2wgfSBmcm9tIFwiaG93bGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTb3VuZEVmZmVjdHMge1xuICBwdWJsaWMgc25kc3ByaXRlOkhvd2w7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAvL2xvYWQgc3ByaXRlXG4gICAgICB0aGlzLnNuZHNwcml0ZSA9IG5ldyBIb3dsKHtcbiAgICAgIHNyYzogWydzcmMvYXVkaW8vc3ByaXRlLndhdiddLFxuICAgICAgc3ByaXRlOiB7XG4gICAgICAgIHN0YXJ0OiBbMjEyLCAxNjY0XSxcbiAgICAgICAgZG90OiBbNDAwMCwgMTAwMF0sXG4gICAgICAgIGxpbmU6IFs2MDAwLCA1MDAwXSxcbiAgICAgICAga2V5cHJlc3M6IFsxMCwgNTRdLFxuICAgICAgICBlcnJvcjogWzYwMDAsIDUwMDBdLFxuICAgICAgICBtb3ZlOiBbNjAwMCwgNTAwMF1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIHBsYXkgPSBmdW5jdGlvbihzbmQ6c3RyaW5nKTp2b2lke1xuICAgICAgY29uc29sZS5sb2coXCJzbmRcIiwgc25kKTtcbiAgICAgIHRoaXMuc25kc3ByaXRlLnBsYXkoc25kKTtcbiAgICB9XG4gIH1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuXG5pbXBvcnQgUElYSSA9IHJlcXVpcmUoJ3BpeGkuanMnKTtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZXMgfSBmcm9tIFwiLi9Db2xvclBhbGV0dGVzXCI7XG5pbXBvcnQgeyBTb3VuZEVmZmVjdHMgfSBmcm9tIFwiLi9Tb3VuZEVmZmVjdHNcIjtcbmltcG9ydCB7IEd1aSB9IGZyb20gXCIuL0d1aVwiO1xuXG4vL0dldCBzb3VuZCBlZmZlY3RzXG5jb25zdCBTT1VORExJQiA9IG5ldyBTb3VuZEVmZmVjdHM7XG5cbi8vR2V0IGNvbG9yIGluZm9ybWF0aW9uXG5jb25zdCBDT0xPUkxJQiA9IG5ldyBDb2xvclBhbGV0dGVzO1xubGV0IGNvbG9yczphbnk7XG5cbi8vIExvYWQgR3VpIGFmdGVyIGNvbG9yc1xubGV0IE9WRVJMQVk6YW55O1xuXG4vL2xvYWQgY29sb3IgcGFsZXR0ZVxubGV0IGNoYW5nZUNvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpe1xuICBDT0xPUkxJQi5sb2FkQ29sb3JzKHBpbmRleClcbiAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhLnR5cGUpO1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgc2V0dXBQaXhpKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vLyAvL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbi8vICAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG4vLyB9XG4vLyAvL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbi8vIGxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4vLyAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8gICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4vLyAgIC8vIGFwcC52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbi8vICAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4vLyAgIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xuLy8gfVxuXG4vL0NyZWF0ZSB0aGUgYXBwXG5sZXQgcmVuZGVyZXI7XG5sZXQgc3RhZ2U7XG5cbi8vYnV0dG9uXG5sZXQgcGxheUJ1dHRvbldhaXQ7XG5sZXQgcGxheUJ1dHRvbkRvd247XG5sZXQgcGxheUJ1dHRvbk92ZXI7XG5sZXQgcGxheUJ1dHRvbjtcblxubGV0IHNldHVwUGl4aSA9IGZ1bmN0aW9uKCk6dm9pZHtcblxuICByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDk2MCw1NDAsXG4gICAge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxLCBhdXRvUmVzaXplOiB0cnVlfVxuICApO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLy9DcmVhdGUgYSBjb250YWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgYHN0YWdlYFxuICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBzdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgLy9BZGQgdGhlIGNhbnZhcyB0byB0aGUgSFRNTCBkb2N1bWVudFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIC8vVXBkYXRlIGJhY2tncm91bmQgY29sb3JcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3JzWydiYWNrZ3JvdW5kJ107XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG5cblxuXG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIE9WRVJMQVkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbn07XG5sZXQgZ2FtZUxvb3AgPSBmdW5jdGlvbigpOnZvaWR7XG4gIC8vbG9vcCA2MCBmcmFtZXMgcGVyIHNlY29uZFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG59XG4iXX0=
