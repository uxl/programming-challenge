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
                this.createPlayer();
            }, this);
            this.loader.load();
        };
        // private createButtons = function(){
        //   var rowsButton = new Btn(newStage, resources, "arrowup", 700, 500, function(){
        //     console.log("callback: " + rows);
        //     // rows++;
        //     // this.typeMe(newStage.getChildByName('rowsValue'), rows, 0, 0);
        //   })
        // }
        this.onLoadCompleted = function (newResources, me) {
            console.log(me);
            console.log(newResources);
            this.resoruces = newResources;
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
    createPlayer() {
        //player
        this.player = this.sprites.player_blue;
        this.stage.addChild(this.player);
        this.player.position.x = 500;
        this.player.position.y = 500;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvR3VpLnRzIiwic3JjL1NvdW5kRWZmZWN0cy50cyIsInNyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUE7SUFJSTtRQUVPLGVBQVUsR0FBRyxVQUFTLE1BQWE7WUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7WUFDekIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ3ZDLElBQUksR0FBRyxHQUFXLGlCQUFpQixDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNwQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDckIsSUFBSSxJQUFTLENBQUM7Z0JBQ2QsR0FBRyxDQUFDLE1BQU07b0JBQ1Y7d0JBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUM1QyxXQUFXOzRCQUNYLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFDcEMsSUFBSSxhQUFhLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDakQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUN6QixDQUFDO3dCQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0RBQXdELENBQUMsQ0FBQTt3QkFDdkUsQ0FBQztvQkFDSCxDQUFDLENBQUM7Z0JBRUYsR0FBRyxDQUFDLE9BQU8sR0FBRztvQkFD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QUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsd0JBQXdCO0lBQ3hCLFFBQVEsRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBQ0YsSUFBSSxRQUFRLEdBQUc7SUFDYiwyQkFBMkI7SUFDM0IscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtJUGFsZXR0ZX0gZnJvbSAnLi9pbnRlcmZhY2VzL0lQYWxldHRlJztcblxuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZXMge1xuICAgIHByaXZhdGUgcGFsZXR0ZUluZGV4OiAwO1xuICAgIHB1YmxpYyBwYWxldHRlczogbnVsbDtcbiAgICBwcml2YXRlIGFjdGl2ZVBhbGV0dGU6IG51bGw7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgIHB1YmxpYyBsb2FkQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcik6UHJvbWlzZTxhbnk+IHtcbiAgICAgIHRoaXMucGFsZXR0ZUluZGV4ID0gcGluZGV4O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSAnc3JjL2NvbG9ycy5qc29uJztcbiAgICAgICAgICAgIGxldCB4aHI6IGFueSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgICB2YXIgZGF0YTogYW55O1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9XG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MhXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVBhbGV0dGU6SVBhbGV0dGUgPSBkYXRhLmNvbG9yc1twaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYWN0aXZlUGFsZXR0ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSByZWFjaGVkIG91ciB0YXJnZXQgc2VydmVyLCBidXQgaXQgcmV0dXJuZWQgYW4gZXJyb3JcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IEJ0biB9IGZyb20gXCIuL0J0blwiO1xuXG5leHBvcnQgY2xhc3MgR3VpIHtcbiAgICBwcml2YXRlIHN0YWdlOiBQSVhJLkNvbnRhaW5lcjtcbiAgICBwcml2YXRlIGNvbG9yczogYW55O1xuICAgIHByaXZhdGUgc291bmRzOiBhbnk7XG5cbiAgICAvL3RleHQgZWxlbWVudHNcbiAgICBwcml2YXRlIHN0YXR1czogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgcm93c1RpdGxlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSByb3dzVmFsdWU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIGNvbHNUaXRsZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgY29sc1ZhbHVlOiBQSVhJLlRleHQ7XG5cbiAgICBwcml2YXRlIGxpbmU6IFBJWEkuR3JhcGhpY3M7XG4gICAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgUElYSS5sb2FkZXJzLkxvYWRlcigpO1xuICAgIHByaXZhdGUgc3ByaXRlczphbnkgPSB7fTtcblxuICAgIHByaXZhdGUgcm93czpudW1iZXIgPSAxMDtcbiAgICBwcml2YXRlIGNvbHM6bnVtYmVyID0gMTA7XG4gICAgcHJpdmF0ZSByZXNvdXJjZXM6YW55O1xuXG4gICAgcHJpdmF0ZSBwbGF5ZXI6UElYSS5TcHJpdGU7XG5cbiAgICBjb25zdHJ1Y3RvcihtYWluU3RhZ2U6IFBJWEkuQ29udGFpbmVyLCBtYWluQ29sb3JzOiBhbnksIG1haW5Tb3VuZHM6IGFueSkge1xuICAgICAgICB0aGlzLnN0YWdlID0gbWFpblN0YWdlO1xuICAgICAgICB0aGlzLmNvbG9ycyA9IG1haW5Db2xvcnM7XG4gICAgICAgIHRoaXMuc291bmRzID0gbWFpblNvdW5kcztcbiAgICAgICAgdGhpcy5sb2FkSW1hZ2VzKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVRleHQoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vbG9hZCBpbWFnZXMnXG4gICAgICAgIHRoaXMubG9hZGVyID0gUElYSS5sb2FkZXJcbiAgICAgICAgICAgIC5hZGQoJ3BsYXllcl9ibHVlJywgJ3NyYy9ncmFwaGljcy9wbGF5ZXJfYmx1ZS5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnbWFya19icmFja2V0JywgJ3NyYy9ncmFwaGljcy9tYXJrX2JyYWNrZXQucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfdXAnLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfdXAucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfb3ZlcicsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9vdmVyLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX2hpdCcsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9oaXQucG5nJylcbiAgICAgICAgICAgIC5vbignY29tcGxldGUnLCBmdW5jdGlvbiAobG9hZGVyLCByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5wbGF5ZXJfYmx1ZS50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLm1hcmtfYnJhY2tldCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMubWFya19icmFja2V0LnRleHR1cmUpO1xuICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuYXJyb3d1cF91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmFycm93dXBfb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF9vdmVyLnRleHR1cmUpO1xuICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuYXJyb3d1cF91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoKTtcbiAgICAgICAgICB9LHRoaXMpO1xuICAgICAgICAgIHRoaXMubG9hZGVyLmxvYWQoKTtcblxuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVBsYXllcigpe1xuICAgICAgLy9wbGF5ZXJcbiAgICAgIHRoaXMucGxheWVyID0gdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlO1xuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLnBsYXllci5wb3NpdGlvbi54ID0gNTAwO1xuICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueSA9IDUwMDtcbiAgICB9XG4gICAgLy8gcHJpdmF0ZSBjcmVhdGVCdXR0b25zID0gZnVuY3Rpb24oKXtcbiAgICAvLyAgIHZhciByb3dzQnV0dG9uID0gbmV3IEJ0bihuZXdTdGFnZSwgcmVzb3VyY2VzLCBcImFycm93dXBcIiwgNzAwLCA1MDAsIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiY2FsbGJhY2s6IFwiICsgcm93cyk7XG4gICAgLy8gICAgIC8vIHJvd3MrKztcbiAgICAvLyAgICAgLy8gdGhpcy50eXBlTWUobmV3U3RhZ2UuZ2V0Q2hpbGRCeU5hbWUoJ3Jvd3NWYWx1ZScpLCByb3dzLCAwLCAwKTtcbiAgICAvLyAgIH0pXG4gICAgLy8gfVxuICAgIHByaXZhdGUgb25Mb2FkQ29tcGxldGVkID0gZnVuY3Rpb24obmV3UmVzb3VyY2VzOmFueSxtZSl7XG5cbiAgICAgIGNvbnNvbGUubG9nKG1lKTtcbiAgICAgIGNvbnNvbGUubG9nKG5ld1Jlc291cmNlcyk7XG4gICAgICB0aGlzLnJlc29ydWNlcyA9IG5ld1Jlc291cmNlcztcbiAgICB9XG4gICAgcHJpdmF0ZSBkcmF3R3JpZCA9IGZ1bmN0aW9uKG5ld1N0YWdlOmFueSwgcmVzb3VyY2VzOmFueSwgcm93czpudW1iZXIsIGNvbHM6bnVtYmVyLCBzcGFjaW5nOm51bWJlcik6IHZvaWQge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICAgICAgbmV3U3RhZ2UuYWRkQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgICAgbGV0IHRvdGFsbWFya3MgPSByb3dzICogY29scztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbG1hcmtzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBtYXJrID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrX2JyYWNrZXQudGV4dHVyZSk7XG4gICAgICAgICAgICBtYXJrLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgICAgIG1hcmsueCA9IChpICUgY29scykgKiBzcGFjaW5nO1xuICAgICAgICAgICAgbWFyay55ID0gTWF0aC5mbG9vcihpIC8gcm93cykgKiBzcGFjaW5nO1xuICAgICAgICAgICAgbWFyay5zY2FsZS54ID0gMTtcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueSA9IDE7XG4gICAgICAgICAgICBjb250YWluZXIuYWRkQ2hpbGQobWFyayk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDZW50ZXIgb24gdGhlIHNjcmVlblxuICAgICAgY29udGFpbmVyLnggPSAobmV3U3RhZ2Uud2lkdGggLSBjb250YWluZXIud2lkdGgpIC8gMjtcbiAgICAgIGNvbnRhaW5lci55ID0gKG5ld1N0YWdlLmhlaWdodCAtIGNvbnRhaW5lci5oZWlnaHQpIC8gMjtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmUgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICAvLyBzZXQgYSBmaWxsIGFuZCBsaW5lIHN0eWxlXG4gICAgICAgIHRoaXMubGluZS5saW5lU3R5bGUoMC41LCB0aGlzLmNvbG9ycy5saW5lLCAwLjUpO1xuXG4gICAgICAgIC8vIGRyYXcgYSBzaGFwZVxuICAgICAgICB0aGlzLmxpbmUubW92ZVRvKDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuICAgICAgICB0aGlzLmxpbmUubGluZVRvKHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVRleHQgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy90ZXh0IHRlc3RcbiAgICAgICAgbGV0IHN0eWxlID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZm9udCxcbiAgICAgICAgICAgIC8vIHN0cm9rZTogJyM0YTE4NTAnLFxuICAgICAgICAgICAgLy8gc3Ryb2tlVGhpY2tuZXNzOiA1LFxuICAgICAgICAgICAgZHJvcFNoYWRvdzogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0JsdXI6IDQsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0Rpc3RhbmNlOiA2LFxuICAgICAgICAgICAgd29yZFdyYXA6IHRydWUsXG4gICAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBoZWFkbGluZSA9IG5ldyBQSVhJLlRleHRTdHlsZSh7XG4gICAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmhlYWRsaW5lLFxuICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzRhMTg1MCcsXG4gICAgICAgICAgICAvLyBzdHJva2VUaGlja25lc3M6IDUsXG4gICAgICAgICAgICBkcm9wU2hhZG93OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0JsdXI6IDQsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0Rpc3RhbmNlOiA2LFxuICAgICAgICAgICAgd29yZFdyYXA6IHRydWUsXG4gICAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vc3RhdHVzXG4gICAgICAgIHRoaXMuc3RhdHVzID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLnN0YXR1cy54ID0gMTEwO1xuICAgICAgICB0aGlzLnN0YXR1cy55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnN0YXR1cyk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuc3RhdHVzLCBcIkluaXRpYWxpemluZy4uLlwiLCAwLCAyMDAwKTtcblxuICAgICAgICAvL3Jvd3MgdGl0bGVcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBzdHlsZSk7XG4gICAgICAgIHRoaXMucm93c1RpdGxlLnggPSAzMDA7XG4gICAgICAgIHRoaXMucm93c1RpdGxlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucm93c1RpdGxlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVGl0bGUsIFwicm93czpcIiwgMCwgMzUwMCk7XG5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5jb2xzKTtcbiAgICAgICAgY29uc29sZS5sb2codHlwZW9mIHRoaXMuY29scyk7XG5cbiAgICAgICAgLy9yb3dzIHZhbHVlXG4gICAgICAgIHRoaXMucm93c1ZhbHVlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLnJvd3NWYWx1ZS54ID0gMzUwO1xuICAgICAgICB0aGlzLnJvd3NWYWx1ZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvd3NWYWx1ZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLnJvd3MudG9TdHJpbmcoKSwgMCwgNDAwMCk7XG5cbiAgICAgICAgLy9jb2xzIHRpdGxlXG4gICAgICAgIHRoaXMuY29sc1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uOicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueCA9IDUwMDtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jb2xzVGl0bGUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNUaXRsZSwgJ2NvbHM6JywgMCwgNDUwMCk7XG5cbiAgICAgICAgLy8gLy9jb2xzIHZhbHVlXG4gICAgICAgIHRoaXMuY29sc1ZhbHVlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLmNvbHNWYWx1ZS54ID0gNTUwO1xuICAgICAgICB0aGlzLmNvbHNWYWx1ZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNvbHNWYWx1ZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1ZhbHVlLCB0aGlzLmNvbHMudG9TdHJpbmcoKSwgMCwgNTAwMCk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuc3RhdHVzLCBcIlJlYWR5XCIsIDAsIDYwMDApO1xuXG4gICAgfVxuICAgIHByaXZhdGUgdHlwZU1lID0gZnVuY3Rpb24odGV4dE9iajogUElYSS5UZXh0LCBtZXNzYWdlOiBzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6IG51bWJlciwgZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlICsgJyB8ICcgKyBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGFydGluZyB0eXBlXCIpO1xuICAgICAgICAgICAgdGV4dE9iai50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIG1lc3NhZ2VMZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb29wIHRocm91Z2ggdHlwaW5nXG4gICAgICAgIGxldCBuZXdTdHJpbmc6IHN0cmluZyA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICB0ZXh0T2JqLnRleHQgPSBuZXdTdHJpbmc7XG4gICAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3U3RyaW5nKTtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGVuZ3RoIG9mIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUxlbmd0aCsrO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCwgNTApLCBkZWxheSk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgLy9QbGF5IHN0YXJ0dXAgc291bmRcblxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKGRhdGEudHlwZSk7XG4gICAgY29sb3JzID0gZGF0YTtcbiAgICBzZXR1cFBpeGkoKTtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyKTtcbiAgfSk7XG59XG5jaGFuZ2VDb2xvcnMoMCk7XG5cbi8vIC8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuLy8gICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbi8vIH1cbi8vIC8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xuLy8gbGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbi8vICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLyAgIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuLy8gICAvLyBhcHAudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuLy8gICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbi8vICAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG4vLyB9XG5cbi8vQ3JlYXRlIHRoZSBhcHBcbmxldCByZW5kZXJlcjtcbmxldCBzdGFnZTtcblxuLy9idXR0b25cbmxldCBwbGF5QnV0dG9uV2FpdDtcbmxldCBwbGF5QnV0dG9uRG93bjtcbmxldCBwbGF5QnV0dG9uT3ZlcjtcbmxldCBwbGF5QnV0dG9uO1xuXG5sZXQgc2V0dXBQaXhpID0gZnVuY3Rpb24oKTp2b2lke1xuXG4gIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoOTYwLDU0MCxcbiAgICB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4gICk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRhaW5lciBvYmplY3QgY2FsbGVkIHRoZSBgc3RhZ2VgXG4gIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIHN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvL0FkZCB0aGUgY2FudmFzIHRvIHRoZSBIVE1MIGRvY3VtZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgLy9VcGRhdGUgYmFja2dyb3VuZCBjb2xvclxuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbJ2JhY2tncm91bmQnXTtcblxuICBkcmF3U2NlbmUoKTtcbn1cblxuLy9EcmF3IHNjZW5lXG5sZXQgZHJhd1NjZW5lID0gZnVuY3Rpb24oKXtcblxuICAgIC8vaW5pdCBHdWkgcGFzcyBpbiBjb2xvcnNcbiAgICBPVkVSTEFZID0gbmV3IEd1aSggc3RhZ2UsIGNvbG9ycywgU09VTkRMSUIpO1xuICAgIC8vc3RhcnQgcmVuZGVyaW5nIGVuZ2luZVxuICAgIGdhbWVMb29wKCk7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuIl19
