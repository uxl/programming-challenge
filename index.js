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
        this.loadImages = function () {
            //load images
            PIXI.loader
                .add([
                "src/graphics/arrow_blue.png",
                "src/graphics/arrow_yellow.png",
                "src/graphics/arrow_orange.png",
                "src/graphics/mark_bracket.png",
                "src/graphics/mark_dot.png",
                "src/graphics/mark_both.png",
                "src/graphics/arrow_wait.png",
                "src/graphics/arrow_press.png",
                "src/graphics/arrow_error.png"
            ])
                .load(this.drawGui);
        };
        this.drawGui = function () {
            this.createLine();
            this.createText();
            this.drawGrid();
            this.createButton();
        };
        this.createButton = function () {
        };
        this.drawGrid = function () {
            //grid test
            // // Create a 5x5 grid
            for (var i = 0; i < 100; i++) {
                var mark = new PIXI.Sprite(PIXI.loader.resources["src/graphics/mark_bracket.png"].texture);
                mark.anchor.set(0.5);
                mark.x = (i % 10) * 100;
                mark.y = Math.floor(i / 10) * 100;
                mark.scale.x = 1;
                mark.scale.y = 1;
                this.stage.addChild(mark);
            }
        };
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
            console.log(message + ' | ' + messageLength);
            if (messageLength === undefined) {
                console.log("starting type");
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
            console.log(newString);
            if (messageLength < message.length + 1) {
                setTimeout(this.typeMe.bind(this, textObj, message, messageLength), 100);
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
    //single object test
    var bluearrow = new PIXI.Sprite(PIXI.loader.resources["src/graphics/arrow_blue.png"].texture);
    stage.addChild(bluearrow);
    bluearrow.position.x = 200;
    bluearrow.position.y = 200;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvR3VpLnRzIiwic3JjL1NvdW5kRWZmZWN0cy50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7SUFJSTtRQUVPLGVBQVUsR0FBRyxVQUFTLE1BQWE7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ3ZDLElBQUksR0FBRyxHQUFXLGlCQUFpQixDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLE1BQU07b0JBQ1Y7d0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxXQUFXOzRCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTt3QkFDdkUsQ0FBQztvQkFDSCxDQUFDLENBQUM7Z0JBRUYsR0FBRyxDQUFDLE9BQU8sR0FBRztvQkFD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RXpCLHFDQUFxQztJQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekMseUJBQXlCO0lBQ3pCLFFBQVEsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWhELG9CQUFvQjtJQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZCLFNBQVMsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBO0FBRUQsWUFBWTtBQUNaLElBQUksU0FBUyxHQUFHO0lBRWQsb0JBQW9CO0lBQ3BCLElBQUksU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQzdELENBQUM7SUFDRixLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzFCLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUMzQixTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFFM0IseUJBQXlCO0lBQ3pCLE9BQU8sR0FBRyxJQUFJLFNBQUcsQ0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLHdCQUF3QjtJQUN4QixRQUFRLEVBQUUsQ0FBQztBQUNmLENBQUMsQ0FBQztBQUNGLElBQUksUUFBUSxHQUFHO0lBQ2IsMkJBQTJCO0lBQzNCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBHdWkge1xuICAgIHByaXZhdGUgc3RhZ2U6IFBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgY29sb3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBzb3VuZHM6IGFueTtcbiAgICBwcml2YXRlIHN0YXR1czogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgbGluZTogUElYSS5HcmFwaGljcztcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTogUElYSS5Db250YWluZXIsIG1haW5Db2xvcnM6YW55LCBtYWluU291bmRzOmFueSkge1xuICAgICAgICB0aGlzLnN0YWdlID0gbWFpblN0YWdlO1xuICAgICAgICB0aGlzLmNvbG9ycyA9IG1haW5Db2xvcnM7XG4gICAgICAgIHRoaXMuc291bmRzID0gbWFpblNvdW5kcztcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2VzKCk7XG4gICAgfVxuICAgIHByaXZhdGUgbG9hZEltYWdlcyA9IGZ1bmN0aW9uKCk6IHZvaWR7XG4gICAgICAvL2xvYWQgaW1hZ2VzXG4gICAgICBQSVhJLmxvYWRlclxuICAgICAgICAuYWRkKFtcbiAgICAgICAgICBcInNyYy9ncmFwaGljcy9hcnJvd19ibHVlLnBuZ1wiLFxuICAgICAgICAgIFwic3JjL2dyYXBoaWNzL2Fycm93X3llbGxvdy5wbmdcIixcbiAgICAgICAgICBcInNyYy9ncmFwaGljcy9hcnJvd19vcmFuZ2UucG5nXCIsXG4gICAgICAgICAgXCJzcmMvZ3JhcGhpY3MvbWFya19icmFja2V0LnBuZ1wiLFxuICAgICAgICAgIFwic3JjL2dyYXBoaWNzL21hcmtfZG90LnBuZ1wiLFxuICAgICAgICAgIFwic3JjL2dyYXBoaWNzL21hcmtfYm90aC5wbmdcIixcbiAgICAgICAgICBcInNyYy9ncmFwaGljcy9hcnJvd193YWl0LnBuZ1wiLFxuICAgICAgICAgIFwic3JjL2dyYXBoaWNzL2Fycm93X3ByZXNzLnBuZ1wiLFxuICAgICAgICAgIFwic3JjL2dyYXBoaWNzL2Fycm93X2Vycm9yLnBuZ1wiXG5cbiAgICAgICAgXSlcbiAgICAgICAgLmxvYWQodGhpcy5kcmF3R3VpKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBkcmF3R3VpID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xuICAgICAgdGhpcy5jcmVhdGVUZXh0KCk7XG4gICAgICB0aGlzLmRyYXdHcmlkKCk7XG4gICAgICB0aGlzLmNyZWF0ZUJ1dHRvbigpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbiA9IGZ1bmN0aW9uKCk6IHZvaWR7XG5cbiAgICB9XG4gICAgcHJpdmF0ZSBkcmF3R3JpZCA9IGZ1bmN0aW9uKCk6dm9pZHtcbiAgICAgICAgLy9ncmlkIHRlc3RcbiAgICAgICAgLy8gLy8gQ3JlYXRlIGEgNXg1IGdyaWRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMDA7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1hcmsgPSBuZXcgUElYSS5TcHJpdGUoUElYSS5sb2FkZXIucmVzb3VyY2VzW1wic3JjL2dyYXBoaWNzL21hcmtfYnJhY2tldC5wbmdcIl0udGV4dHVyZSk7XG4gICAgICAgICAgICBtYXJrLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgICAgIG1hcmsueCA9IChpICUgMTApICogMTAwO1xuICAgICAgICAgICAgbWFyay55ID0gTWF0aC5mbG9vcihpIC8gMTApICogMTAwO1xuICAgICAgICAgICAgbWFyay5zY2FsZS54ID0gMTtcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueSA9IDE7XG4gICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKG1hcmspO1xuICAgICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICAgICAgLy8gc2V0IGEgZmlsbCBhbmQgbGluZSBzdHlsZVxuICAgICAgICB0aGlzLmxpbmUubGluZVN0eWxlKDEsIHRoaXMuY29sb3JzLmxpbmUsIDEpO1xuXG4gICAgICAgIC8vIGRyYXcgYSBzaGFwZVxuICAgICAgICB0aGlzLmxpbmUubW92ZVRvKDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuICAgICAgICB0aGlzLmxpbmUubGluZVRvKHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVRleHQgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgIC8vdGV4dCB0ZXN0XG4gICAgICBsZXQgc3R5bGUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgIC8vIGZpbGw6IFsnI2ZmZmZmZicsICcjMDBmZjk5J10sIC8vIGdyYWRpZW50XG4gICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZm9udCxcbiAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAvLyBzdHJva2VUaGlja25lc3M6IDUsXG4gICAgICAgICAgZHJvcFNoYWRvdzogdHJ1ZSxcbiAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAvLyBkcm9wU2hhZG93Qmx1cjogNCxcbiAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICB3b3JkV3JhcDogdHJ1ZSxcbiAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLnN0YXR1cyA9IG5ldyBQSVhJLlRleHQoJy4uLicsIHN0eWxlKTtcbiAgICAgIHRoaXMuc3RhdHVzLnggPSAyMDtcbiAgICAgIHRoaXMuc3RhdHVzLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA2MDtcblxuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnN0YXR1cyk7XG4gICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJJbml0aWFsaXppbmcuLi5cIiwgMCk7XG4gICAgfVxuICAgIC8vIHB1YmxpYyB1cGRhdGVUZXh0ID0gZnVuY3Rpb24obWVzc2FnZTogc3RyaW5nKTogUElYSS5UZXh0IHtcbiAgICAvLyAgICAgdGhpcy5zdGF0dXMudGV4dCA9IG1lc3NhZ2U7XG4gICAgLy8gICAgIHJldHVybiB0aGlzLnN0YXR1cztcbiAgICAvLyB9XG4gICAgcHJpdmF0ZSB0eXBlTWUgPSBmdW5jdGlvbih0ZXh0T2JqOlBJWEkuVGV4dCwgbWVzc2FnZTpzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6bnVtYmVyKTp2b2lke1xuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSArICcgfCAnICsgbWVzc2FnZUxlbmd0aCk7XG4gICAgICBpZihtZXNzYWdlTGVuZ3RoID09PSB1bmRlZmluZWQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIHR5cGVcIik7XG4gICAgICAgIC8vIHRleHRPYmoudGV4dCA9ICcnO1xuICAgICAgICBtZXNzYWdlTGVuZ3RoID0gMDtcbiAgICAgIH1lbHNle1xuICAgICAgICAvL2luY3JlbWVudCBsZW5ndGggb2YgbWVzc2FnZVxuICAgICAgICBtZXNzYWdlTGVuZ3RoKys7XG4gICAgICB9XG5cbiAgICAgIC8vbG9vcCB0aHJvdWdoIHR5cGluZ1xuICAgICAgbGV0IG5ld1N0cmluZzpzdHJpbmcgPSBtZXNzYWdlLnN1YnN0cmluZygwLCBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgIHRleHRPYmoudGV4dCA9IG5ld1N0cmluZztcbiAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJrZXlwcmVzc1wiKTtcbiAgICAgIGNvbnNvbGUubG9nKG5ld1N0cmluZyk7XG5cbiAgICAgIGlmKG1lc3NhZ2VMZW5ndGggPCBtZXNzYWdlLmxlbmd0aCsxKSB7XG4gICAgICAgICAgc2V0VGltZW91dCh0aGlzLnR5cGVNZS5iaW5kKHRoaXMsIHRleHRPYmosIG1lc3NhZ2UsIG1lc3NhZ2VMZW5ndGgpLCAxMDApO1xuICAgICAgICAgIC8vIHNldFRpbWVvdXQodGhpcy5kZWNsYXJlLmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IEhvd2wgfSBmcm9tIFwiaG93bGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTb3VuZEVmZmVjdHMge1xuICBwdWJsaWMgc25kc3ByaXRlOkhvd2w7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAvL2xvYWQgc3ByaXRlXG4gICAgICB0aGlzLnNuZHNwcml0ZSA9IG5ldyBIb3dsKHtcbiAgICAgIHNyYzogWydzcmMvYXVkaW8vc3ByaXRlLndhdiddLFxuICAgICAgc3ByaXRlOiB7XG4gICAgICAgIHN0YXJ0OiBbMCwgMzAwMF0sXG4gICAgICAgIGRvdDogWzQwMDAsIDEwMDBdLFxuICAgICAgICBsaW5lOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIGtleXByZXNzOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEudHlwZSk7XG4gICAgY29sb3JzID0gZGF0YTtcbiAgICBzZXR1cFBpeGkoKTtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyKTtcbiAgfSk7XG59XG5jaGFuZ2VDb2xvcnMoMCk7XG5cbi8vIC8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuLy8gICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbi8vIH1cbi8vIC8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xuLy8gbGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbi8vICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLyAgIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuLy8gICAvLyBhcHAudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuLy8gICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbi8vICAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG4vLyB9XG5cbi8vQ3JlYXRlIHRoZSBhcHBcbmxldCByZW5kZXJlcjtcbmxldCBzdGFnZTtcblxuLy9idXR0b25cbmxldCBwbGF5QnV0dG9uV2FpdDtcbmxldCBwbGF5QnV0dG9uRG93bjtcbmxldCBwbGF5QnV0dG9uT3ZlcjtcbmxldCBwbGF5QnV0dG9uO1xuXG5sZXQgc2V0dXBQaXhpID0gZnVuY3Rpb24oKTp2b2lke1xuXG4gIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoOTYwLDU0MCxcbiAgICB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4gICk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRhaW5lciBvYmplY3QgY2FsbGVkIHRoZSBgc3RhZ2VgXG4gIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIHN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvL0FkZCB0aGUgY2FudmFzIHRvIHRoZSBIVE1MIGRvY3VtZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgLy9VcGRhdGUgYmFja2dyb3VuZCBjb2xvclxuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbJ2JhY2tncm91bmQnXTtcblxuICAvL1BsYXkgc3RhcnR1cCBzb3VuZFxuICBTT1VORExJQi5wbGF5KFwic3RhcnRcIik7XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG5cbiAgLy9zaW5nbGUgb2JqZWN0IHRlc3RcbiAgdmFyIGJsdWVhcnJvdyA9IG5ldyBQSVhJLlNwcml0ZShcbiAgICAgIFBJWEkubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd19ibHVlLnBuZ1wiXS50ZXh0dXJlXG4gICAgKTtcbiAgICBzdGFnZS5hZGRDaGlsZChibHVlYXJyb3cpO1xuICAgIGJsdWVhcnJvdy5wb3NpdGlvbi54ID0gMjAwO1xuICAgIGJsdWVhcnJvdy5wb3NpdGlvbi55ID0gMjAwO1xuXG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIE9WRVJMQVkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbn07XG5sZXQgZ2FtZUxvb3AgPSBmdW5jdGlvbigpOnZvaWR7XG4gIC8vbG9vcCA2MCBmcmFtZXMgcGVyIHNlY29uZFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG59XG4iXX0=
