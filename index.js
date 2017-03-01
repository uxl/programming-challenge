(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jiboProgrammingChallenge = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Algorithm {
    constructor() {
        //define size of checkerboard
        this._rows = 10; //<ui defined>;
        this._cols = 10; //<ui defined>;
        this._spacing = 10; //row vs col => row.width * rows; min:2px max: 50px;
        this.Node = function (data, next) {
            this.data = data;
            this.next = next;
        };
        this.SinglyList = function () {
            this._length = 0;
            this.head = null;
        };
        //A Singly-Linked List
        //In computer science, a singly-linked list is a data structure
        //that holds a sequence of linked nodes. Each node, in turn, contains data and a pointer, which can point to another node.
        this.SinglyLinkedList = function () {
        };
    }
    get rows() {
        return this._rows;
    }
    set rows(newval) {
        this._rows = newval;
    }
    get cols() {
        return this._cols;
    }
    set cols(newval) {
        this._cols = newval;
    }
}
exports.Algorithm = Algorithm;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
class Btn {
    constructor(mainStage, resources, btnkind, name, xpos, ypos, callbk) {
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
        this.btnkind = btnkind;
        this.callback = callbk;
        console.log("btnkind: " + this.btnkind);
        console.log(name);
        // var textureButton = PIXI.Texture.fromImage('required/assets/button.png');
        this.buttonObject[name + "up"] = resources[btnkind + '_up'].texture;
        this.buttonObject[name + "over"] = resources[btnkind + "_over"].texture;
        this.buttonObject[name + "hit"] = resources[btnkind + "_hit"].texture;
        this.buttonObject[name + "base"] = new PIXI.Sprite(resources[btnkind + "_up"].texture);
        this.buttonObject[name + "base"].anchor.set(0.5);
        this.buttonObject[name + "base"].x = xpos;
        this.buttonObject[name + "base"].y = ypos;
        // make the button interactive...
        this.buttonObject[name + "base"].interactive = true;
        this.buttonObject[name + "base"].buttonMode = true;
        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        this.buttonObject[name + "base"]
            .on('pointerdown', this.onButtonDown.bind(this, "textureButton", this.callback))
            .on('pointerup', this.onButtonUp.bind(this, "textureButton"))
            .on('pointerupoutside', this.onButtonUp.bind(this, "textureButton"))
            .on('pointerover', this.onButtonOver.bind(this, "textureButton"))
            .on('pointerout', this.onButtonOut.bind(this, "textureButton"));
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
        this.stage.addChild(this.buttonObject[name + "base"]);
    }
}
exports.Btn = Btn;

},{"pixi.js":undefined}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const Btn_1 = require("./Btn");
const Algorithm_1 = require("./Algorithm");
class Gui {
    constructor(mainStage, mainColors, mainSounds) {
        this.algorithm = new Algorithm_1.Algorithm;
        this.loader = new PIXI.loaders.Loader();
        this.sprites = {};
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
                this.sprites.colsup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.colsup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.colsup_hit = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.colsdown_up = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.sprites.colsdown_over = new PIXI.Sprite(resources.arrowdown_over.texture);
                this.sprites.colsdown_hit = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.sprites.rowsup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.rowsup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.rowsup_hit = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.rowsdown_up = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.sprites.rowsdown_over = new PIXI.Sprite(resources.arrowdown_over.texture);
                this.sprites.rowsdown_hit = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.onLoadCompleted();
            }.bind(this));
            this.loader.load();
        };
        this.coordinates = function () {
        };
        this.onLoadCompleted = function () {
            this.createGrid(this.algorithm.cols, this.algorithm.rows);
            this.createLine();
            this.createText();
            this.createButtons();
        };
        this.createButtons = function () {
            var rowsButtonUp = new Btn_1.Btn(this.stage, this.loader.resources, "arrowup", "rowsup", 405, window.innerHeight - 45, function () {
                this.algorithm.rows++;
                this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
            var rowsButtonDown = new Btn_1.Btn(this.stage, this.loader.resources, "arrowdown", "rowdown", 400, window.innerHeight - 30, function () {
                this.algorithm.rows--;
                this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
            var colsButtonUp = new Btn_1.Btn(this.stage, this.loader.resources, "arrowup", "colsup", 605, window.innerHeight - 45, function () {
                this.algorithm.cols++;
                this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
            var colsButtonDown = new Btn_1.Btn(this.stage, this.loader.resources, "arrowdown", "colsdown", 600, window.innerHeight - 30, function () {
                this.algorithm.cols--;
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
        this.createGrid = function (rows, cols) {
            var container = new PIXI.Container();
            this.stage.addChild(container);
            let totalmarks = this.algorithm.rows * this.algorithm.cols;
            console.log(totalmarks);
            for (var i = 0; i < totalmarks; i++) {
                // console.log(;
                // console.log("x: " + Math.floor(i * this.rows) * this.spacing + "y: " + (i % this.cols) * this.spacing););
                var mark = new PIXI.Sprite(this.loader.resources.mark_bracket.texture);
                container.addChild(mark);
                mark.anchor.set(0.5);
                mark.x = (i % this.algorithm.cols) * this.spacing; //(i % this.cols) * this.spacing;
                mark.y = Math.floor(i / this.algorithm.rows) * this.spacing; //(i % this.cols) * this.spacing;
                // bunny.x = (i % 5) * 40;
                // bunny.y = Math.floor(i / 5) * 40;            mark.y = Math.floor(i / this.rows) * this.spacing;
                mark.scale.x = 1;
                mark.scale.y = 1;
            }
            // Center on the screen
            container.x = (window.innerWidth - container.width) / 2;
            container.y = (window.innerHeight - container.height) / 2;
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
            //rows value
            this.rowsValue = new PIXI.Text('...', headline);
            this.rowsValue.x = 350;
            this.rowsValue.y = window.innerHeight - 50;
            this.stage.addChild(this.rowsValue);
            this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 4000);
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
            this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 5000);
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

},{"./Algorithm":1,"./Btn":2,"pixi.js":undefined}],5:[function(require,module,exports){
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

},{"howler":undefined}],6:[function(require,module,exports){
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

},{"./ColorPalettes":3,"./Gui":4,"./SoundEffects":5,"pixi.js":undefined}]},{},[6])(6)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FsZ29yaXRobS50cyIsInNyYy9CdG4udHMiLCJzcmMvQ29sb3JQYWxldHRlcy50cyIsInNyYy9HdWkudHMiLCJzcmMvU291bmRFZmZlY3RzLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtJQU9FO1FBTEEsNkJBQTZCO1FBQ3JCLFVBQUssR0FBVSxFQUFFLENBQUMsQ0FBQyxlQUFlO1FBQ2xDLFVBQUssR0FBVSxFQUFFLENBQUMsQ0FBQyxlQUFlO1FBQ2xDLGFBQVEsR0FBVSxFQUFFLENBQUMsQ0FBQyxvREFBb0Q7UUFrQjFFLFNBQUksR0FBRyxVQUFTLElBQUksRUFBRSxJQUFJO1lBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQTtRQUNPLGVBQVUsR0FBRztZQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUE7UUFFRCxzQkFBc0I7UUFDdEIsK0RBQStEO1FBQy9ELDBIQUEwSDtRQUNsSCxxQkFBZ0IsR0FBRztRQUUzQixDQUFDLENBQUE7SUE1QkQsQ0FBQztJQUNELElBQUksSUFBSTtRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxNQUFhO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLElBQUk7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxJQUFJLENB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QUFDLENBQUM7SUFFekMseUJBQXlCO0lBQ3pCLFFBQVEsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWhELFNBQVMsRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBO0FBRUQsWUFBWTtBQUNaLElBQUksU0FBUyxHQUFHO0lBQ1oseUJBQXlCO0lBQ3pCLE9BQU8sR0FBRyxJQUFJLFNBQUcsQ0FBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLHdCQUF3QjtJQUN4QixRQUFRLEVBQUUsQ0FBQztJQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUM7QUFDRixJQUFJLFFBQVEsR0FBRztJQUNiLDJCQUEyQjtJQUMzQixxQkFBcUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVoQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgY2xhc3MgQWxnb3JpdGhtIHtcblxuICAvL2RlZmluZSBzaXplIG9mIGNoZWNrZXJib2FyZFxuICBwcml2YXRlIF9yb3dzOm51bWJlciA9IDEwOyAvLzx1aSBkZWZpbmVkPjtcbiAgcHJpdmF0ZSBfY29sczpudW1iZXIgPSAxMDsgLy88dWkgZGVmaW5lZD47XG4gIHByaXZhdGUgX3NwYWNpbmc6bnVtYmVyID0gMTA7IC8vcm93IHZzIGNvbCA9PiByb3cud2lkdGggKiByb3dzOyBtaW46MnB4IG1heDogNTBweDtcblxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cbiAgZ2V0IHJvd3MoKTpudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cbiAgc2V0IHJvd3MobmV3dmFsOm51bWJlcikge1xuICAgICAgdGhpcy5fcm93cyA9IG5ld3ZhbDtcbiAgfVxuICBnZXQgY29scygpOm51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fY29scztcbiAgfVxuICBzZXQgY29scyhuZXd2YWw6bnVtYmVyKSB7XG4gICAgICB0aGlzLl9jb2xzID0gbmV3dmFsO1xuICB9XG5cbiAgcHJpdmF0ZSBOb2RlID0gZnVuY3Rpb24oZGF0YSwgbmV4dCkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5uZXh0ID0gbmV4dDtcbiAgfVxuICBwcml2YXRlIFNpbmdseUxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgIHRoaXMuaGVhZCA9IG51bGw7XG4gIH1cblxuICAvL0EgU2luZ2x5LUxpbmtlZCBMaXN0XG4gIC8vSW4gY29tcHV0ZXIgc2NpZW5jZSwgYSBzaW5nbHktbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZVxuICAvL3RoYXQgaG9sZHMgYSBzZXF1ZW5jZSBvZiBsaW5rZWQgbm9kZXMuIEVhY2ggbm9kZSwgaW4gdHVybiwgY29udGFpbnMgZGF0YSBhbmQgYSBwb2ludGVyLCB3aGljaCBjYW4gcG9pbnQgdG8gYW5vdGhlciBub2RlLlxuICBwcml2YXRlIFNpbmdseUxpbmtlZExpc3QgPSBmdW5jdGlvbigpe1xuXG4gIH1cblxuXG4vL21vdmUgdG8gZ3VpXG4vLyAvL2RyYXcgc3F1YXJlc1xuLy8gcHJpdmF0ZSBkcmF3U3F1YXJlcyA9IGZ1bmN0aW9uKHN0YWdlLCBsb2FkZXIpe1xuLy8gbGV0IHRvdGFsU3F1YXJlczpudW1iZXIgPSBjb2xzKnJvd3M7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxTcXVhcmVzOyBpKyspIHtcbi8vICAgICAvL2NyZWF0ZSBpbnN0YW5jZSBvZiBzcXVhcmVcbi8vICAgICAvL2NhbGN1bGF0ZSB4LCB5XG4vLyAgICAgbGV0IHggPSAoaSAlIGNvbHMpICogc3BhY2luZztcbi8vICAgICBsZXQgeSA9IE1hdGguZmxvb3IoaSAvIHJvd3MpICogc3BhY2luZztcbi8vICAgICAvLzxzcXVhcmVzY29udGFpbmVyID0+IHNxdWFyZWNsYXNzIG5ldyBpbnN0YW5jZSBhbmQgcG9zaXRpb24oeDpudW1iZXIsIHk6bnVtYmVyKT5cbi8vICAgfVxuLy8gfVxuXG4vL3JhbmRvbWl6ZSBkaXJlY3Rpb24gb24gc3F1YXJlc1xuLy8gLy9zdGFydCBjaGVja2VyIGF0IHJhbmRvbSBpbnNlcnRpb24gc3F1YXJlXG4vLyBsZXQgc3RhcnR4ID0gTWF0aC5yYW5kb20oKSpyb3dzO1xuLy8gbGV0IHN0YXJ0eSA9IE1hdGgucmFuZG9tKCkqY29scztcbi8vPHNxdWFyZXNjb250YWluZXIgPT4gcGxheWVyY2xhc3MgLSBwb3NpdGlvbiBwbGF5ZXI+XG5cbi8vbW92ZSAxIHR1cm5cbi8vZ2V0RGlyZWN0aW9uIGZyb20gY3VycmVudCBzcXVhcmVcbi8vYW5pbWF0ZSB0byBuZXcgc3F1YXJlXG5cbi8vY2hlY2sgYm91bmRzIChjb25kaXRpb24xKVxuLy8gaWYoeCA8IDAgJiYgeCA+IGNvbHMgJiYgeSA8IDAgJiYgeSA+IHJvd3Mpe1xuLy8gICBjb25zb2xlLmxvZyhcInlvdSBhcmUgb3V0c2lkZSBib3VuZHNcIik7XG4vLyB9XG5cbi8vY2hlY2sgY3ljbGUgKGNvbmRpdGlvbjIpXG5cbi8vaGlzdG9yeSBhcnJheVxuLy8gbGV0IGhpc3RvcnkgPSBuZXcgQXJyYXkoKTtcbi8vXG4vLyAvL2Nvb3JkaW5hdGUgb2JqZWN0IChpbnRlcmZhY2U/KVxuLy8gbGV0IGNvb3JkaW5hdGUgPSBmdW5jdGlvbih4LCB5KXtcbi8vICAgdGhpcy54ID0geDtcbi8vICAgdGhpcy55ID0geTtcbi8vIH1cblxuLy9jaGVjayBmb3IgcmVwZWF0XG4vLyBmdW5jdGlvbiBjaGVja0FuZEFkZCh4LHkpIHtcbi8vICAgdmFyIHRlc3QgPSBuZXcgY29vcmRpbmF0ZSh4LHkpO1xuLy9cbi8vICAgdmFyIGZvdW5kID0gaGlzdG9yeS5zb21lKGZ1bmN0aW9uIChlbCkge1xuLy8gICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsKSA9PT0gSlNPTi5zdHJpbmdpZnkodGVzdCk7XG4vLyAgIH0pO1xuLy8gICBpZiAoIWZvdW5kKSB7XG4vLyAgICAgY29uc29sZS5sb2coXCJub3QgZm91bmRcIik7XG4vLyAgICAgaGlzdG9yeS5wdXNoKHRlc3QpO1xuLy8gICB9ZWxzZXtcbi8vICAgICBjb25zb2xlLmxvZyhcImZvdW5kXCIpO1xuLy8gICAgIC8vIGNvbmRpdGlvbiAyIG1ldCBlbmQgLy9cbi8vICAgICA8c3F1YXJlc2NvbnRhaW5lciA9IHBsYXllcmNsYXNzIGRlc3Ryb3k+XG4vLyAgICAgPHNxdWFyZXNjb250YWluZXIgPSBzcXVhcmUgdHVybiByZWQ+XG4vLyAgIH1cbi8vIH1cblxuLy9zcXVhcmUgY2xhc3Ncbi8vcG9zc2libGUgZGlyZWN0aW9uc1xuXG4vLyBwcml2YXRlIG9wdGlvbnM6c3RyaW5ncztcbi8vIGNvbnN0cnVjdG9yID0ge1xuLy8gICBvcHRpb25zID0gWyd1cCcsJ3JpZ2h0JywnZG93bicsJ2xlZnQnXTtcbi8vIH1cbi8vXG4vLyBsZXQgc2V0UmFuZG9tRGlyZWN0aW9uID0gZnVuY3Rpb24oKXtcbi8vICAgLy9zZXQgcmFuZG9tIDQgdmFsdWVzXG4vLyAgIE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGg7XG4vLyB9XG4vLyBsZXQgY2hhbmdlRGlzcGxheSA9IGZ1bmN0aW9uKG9wdGlvbjpudW1iZXIpe1xuLy8gICBzd2l0Y2gob3B0aW9uKXtcbi8vICAgICBjYXNlIDA6XG4vLyAgICAgICAvL3N3YXAgdGV4dHVyZVxuLy8gICAgIGJyZWFrO1xuLy8gICAgIGNhc2UgMTpcbi8vICAgICAgIC8vc3dhcCB0ZXh0dXJlXG4vLyAgICAgYnJlYWs7XG4vLyAgICAgY2FzZSAyOlxuLy8gICAgICAgLy9zd2FwIHRleHR1cmVcbi8vICAgICBicmVhaztcbi8vICAgICBjYXNlIDM6XG4vLyAgICAgICAvL3N3YXAgdGV4dHVyZVxuLy8gICAgIGJyZWFrO1xuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIm5vIHZhbGlkIGNhc2VcIik7XG4vLyAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH1cbn1cbiIsImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJ0biB7XG4gICAgcHJpdmF0ZSBidXR0b25PYmplY3Q6IE9iamVjdCA9IHt9O1xuICAgIHByaXZhdGUgYnRua2luZDogU3RyaW5nO1xuICAgIHByaXZhdGUgY2FsbGJhY2s6RnVuY3Rpb247XG4gICAgcHJpdmF0ZSBzdGFnZTpQSVhJLkNvbnRhaW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTphbnksIHJlc291cmNlczphbnksIGJ0bmtpbmQ6IHN0cmluZywgbmFtZTpzdHJpbmcsIHhwb3M6IG51bWJlciwgeXBvczogbnVtYmVyLCBjYWxsYms6RnVuY3Rpb24pIHtcbiAgICAgICAgLy8gY3JlYXRlIHNvbWUgdGV4dHVyZXMgZnJvbSBhbiBpbWFnZSBwYXRoXG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMuYnRua2luZCA9IGJ0bmtpbmQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYms7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJidG5raW5kOiBcIiArIHRoaXMuYnRua2luZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5hbWUpO1xuICAgICAgICAvLyB2YXIgdGV4dHVyZUJ1dHRvbiA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoJ3JlcXVpcmVkL2Fzc2V0cy9idXR0b24ucG5nJyk7XG5cbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwidXBcIl0gPSByZXNvdXJjZXNbYnRua2luZCArICdfdXAnXS50ZXh0dXJlO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJvdmVyXCJdID0gcmVzb3VyY2VzW2J0bmtpbmQgKyBcIl9vdmVyXCJdLnRleHR1cmU7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImhpdFwiXSA9IHJlc291cmNlc1tidG5raW5kICsgXCJfaGl0XCJdLnRleHR1cmU7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0gPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzW2J0bmtpbmQgKyBcIl91cFwiXS50ZXh0dXJlKTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXS5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0ueCA9IHhwb3M7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0ueSA9IHlwb3M7XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGludGVyYWN0aXZlLi4uXG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0uaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdLmJ1dHRvbk1vZGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIE1vdXNlICYgdG91Y2ggZXZlbnRzIGFyZSBub3JtYWxpemVkIGludG9cbiAgICAgICAgLy8gdGhlIHBvaW50ZXIqIGV2ZW50cyBmb3IgaGFuZGxpbmcgZGlmZmVyZW50XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl1cbiAgICAgICAgICAgIC5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uQnV0dG9uRG93bi5iaW5kKHRoaXMsIFwidGV4dHVyZUJ1dHRvblwiLCB0aGlzLmNhbGxiYWNrKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkJ1dHRvblVwLmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkJ1dHRvblVwLmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyb3ZlcicsIHRoaXMub25CdXR0b25PdmVyLmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyb3V0JywgdGhpcy5vbkJ1dHRvbk91dC5iaW5kKHRoaXMsIFwidGV4dHVyZUJ1dHRvblwiKSk7XG5cbiAgICAgICAgLy8gVXNlIG1vdXNlLW9ubHkgZXZlbnRzXG4gICAgICAgIC8vIC5vbignbW91c2Vkb3duJywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ21vdXNldXAnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNldXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCdtb3VzZW92ZXInLCBvbkJ1dHRvbk92ZXIpXG4gICAgICAgIC8vIC5vbignbW91c2VvdXQnLCBvbkJ1dHRvbk91dClcblxuICAgICAgICAvLyBVc2UgdG91Y2gtb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCd0b3VjaHN0YXJ0Jywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCd0b3VjaGVuZG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuXG4gICAgICAgIC8vIGFkZCBpdCB0byB0aGUgc3RhZ2VcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvbkRvd24gPSBmdW5jdGlvbihtZSxjYWxsYmFjayk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uRG93blwiKTtcbiAgICAgICAgdGhpcy5pc2Rvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX2hpdFwiXTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25VcCA9IGZ1bmN0aW9uKG1lKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25VcFwiKTtcbiAgICAgICAgdGhpcy5pc2Rvd24gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX292ZXJcIl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX3VwXCJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25PdmVyID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbk92ZXJcIik7XG4gICAgICAgIHRoaXMuaXNPdmVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl9vdmVyXCJdO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uT3V0ID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbk91dFwiKTtcbiAgICAgICAgdGhpcy5pc092ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl91cFwiXTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lQYWxldHRlfSBmcm9tICcuL2ludGVyZmFjZXMvSVBhbGV0dGUnO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JQYWxldHRlcyB7XG4gICAgcHJpdmF0ZSBwYWxldHRlSW5kZXg6IDA7XG4gICAgcHVibGljIHBhbGV0dGVzOiBudWxsO1xuICAgIHByaXZhdGUgYWN0aXZlUGFsZXR0ZTogbnVsbDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKTpQcm9taXNlPGFueT4ge1xuICAgICAgdGhpcy5wYWxldHRlSW5kZXggPSBwaW5kZXg7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9ICdzcmMvY29sb3JzLmpzb24nO1xuICAgICAgICAgICAgbGV0IHhocjogYW55ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICAgIHZhciBkYXRhOiBhbnk7XG4gICAgICAgICAgICB4aHIub25sb2FkID1cbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU3VjY2VzcyFcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUGFsZXR0ZTpJUGFsZXR0ZSA9IGRhdGEuY29sb3JzW3BpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhY3RpdmVQYWxldHRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgQnRuIH0gZnJvbSBcIi4vQnRuXCI7XG5pbXBvcnQgeyBBbGdvcml0aG0gfSBmcm9tIFwiLi9BbGdvcml0aG1cIjtcblxuZXhwb3J0IGNsYXNzIEd1aSB7XG4gICAgcHJpdmF0ZSBzdGFnZTogUElYSS5Db250YWluZXI7XG4gICAgcHJpdmF0ZSBhbGdvcml0aG06IEFsZ29yaXRobSA9IG5ldyBBbGdvcml0aG07XG4gICAgcHJpdmF0ZSBjb2xvcnM6IGFueTtcbiAgICBwcml2YXRlIHNvdW5kczogYW55O1xuXG4gICAgLy90ZXh0IGVsZW1lbnRzXG4gICAgcHJpdmF0ZSBzdGF0dXM6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIHJvd3NUaXRsZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgcm93c1ZhbHVlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSBjb2xzVGl0bGU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIGNvbHNWYWx1ZTogUElYSS5UZXh0O1xuXG4gICAgcHJpdmF0ZSBsaW5lOiBQSVhJLkdyYXBoaWNzO1xuICAgIHByaXZhdGUgbG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXIoKTtcbiAgICBwcml2YXRlIHNwcml0ZXM6IGFueSA9IHt9O1xuXG5cbiAgICBwcml2YXRlIHNwYWNpbmc6IG51bWJlciA9IDUwO1xuICAgIHByaXZhdGUgcmVzb3VyY2VzOiBhbnk7XG4gICAgcHJpdmF0ZSBtYXJrczogYW55ID0gW107XG4gICAgcHJpdmF0ZSBwbGF5ZXI6IFBJWEkuU3ByaXRlO1xuXG4gICAgY29uc3RydWN0b3IobWFpblN0YWdlOiBQSVhJLkNvbnRhaW5lciwgbWFpbkNvbG9yczogYW55LCBtYWluU291bmRzOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zdGFnZSA9IG1haW5TdGFnZTtcbiAgICAgICAgdGhpcy5jb2xvcnMgPSBtYWluQ29sb3JzO1xuICAgICAgICB0aGlzLnNvdW5kcyA9IG1haW5Tb3VuZHM7XG4gICAgICAgIHRoaXMubG9hZEltYWdlcygpO1xuICAgIH1cbiAgICBwcml2YXRlIGxvYWRJbWFnZXMgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy9sb2FkIGltYWdlcydcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBQSVhJLmxvYWRlclxuICAgICAgICAgICAgLmFkZCgncGxheWVyX2JsdWUnLCAnc3JjL2dyYXBoaWNzL3BsYXllcl9ibHVlLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdtYXJrX2JyYWNrZXQnLCAnc3JjL2dyYXBoaWNzL21hcmtfYnJhY2tldC5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3d1cF91cCcsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF91cC5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3d1cF9vdmVyJywgJ3NyYy9ncmFwaGljcy9hcnJvd3VwX292ZXIucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfaGl0JywgJ3NyYy9ncmFwaGljcy9hcnJvd3VwX2hpdC5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3dkb3duX3VwJywgJ3NyYy9ncmFwaGljcy9hcnJvd2Rvd25fdXAucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93ZG93bl9vdmVyJywgJ3NyYy9ncmFwaGljcy9hcnJvd2Rvd25fb3Zlci5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3dkb3duX2hpdCcsICdzcmMvZ3JhcGhpY3MvYXJyb3dkb3duX2hpdC5wbmcnKVxuICAgICAgICAgICAgLm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKGxvYWRlciwgcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5wbGF5ZXJfYmx1ZS50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMubWFya19icmFja2V0ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrX2JyYWNrZXQudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHN1cF91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc3VwX292ZXIgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfb3Zlci50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc3VwX2hpdCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc2Rvd25fdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc2Rvd25fb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHNkb3duX2hpdCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzdXBfdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3N1cF9vdmVyID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3N1cF9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3Nkb3duX3VwID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd2Rvd25fdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3Nkb3duX292ZXIgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl9vdmVyLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzZG93bl9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZENvbXBsZXRlZCgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkZXIubG9hZCgpO1xuICAgIH1cbiAgICBwcml2YXRlIGNvb3JkaW5hdGVzID0gZnVuY3Rpb24oKXtcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2FkQ29tcGxldGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JpZCggdGhpcy5hbGdvcml0aG0uY29scywgdGhpcy5hbGdvcml0aG0ucm93cyk7XG4gICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9ucyA9IGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgcm93c0J1dHRvblVwID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIFwiYXJyb3d1cFwiLCBcInJvd3N1cFwiLCA0MDUsIHdpbmRvdy5pbm5lckhlaWdodCAtIDQ1LCBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFsZ29yaXRobS5yb3dzKys7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5yb3dzLnRvU3RyaW5nKCksMCwwKVxuICAgICAgICAvL3VwZGF0ZSBib2FyZC9tYXRyaXhcblxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIHZhciByb3dzQnV0dG9uRG93biA9IG5ldyBCdG4odGhpcy5zdGFnZSwgdGhpcy5sb2FkZXIucmVzb3VyY2VzLCBcImFycm93ZG93blwiLCBcInJvd2Rvd25cIiw0MDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDMwLCBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFsZ29yaXRobS5yb3dzLS07XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5yb3dzLnRvU3RyaW5nKCksMCwwKVxuICAgICAgICAvL3VwZGF0ZSBib2FyZC9tYXRyaXhcblxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIHZhciBjb2xzQnV0dG9uVXAgPSBuZXcgQnRuKHRoaXMuc3RhZ2UsIHRoaXMubG9hZGVyLnJlc291cmNlcywgXCJhcnJvd3VwXCIsIFwiY29sc3VwXCIsIDYwNSwgd2luZG93LmlubmVySGVpZ2h0IC0gNDUsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWxnb3JpdGhtLmNvbHMrKztcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuYWxnb3JpdGhtLmNvbHMudG9TdHJpbmcoKSwwLDApXG4gICAgICAgIC8vdXBkYXRlIGJvYXJkL21hdHJpeFxuXG4gICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgdmFyIGNvbHNCdXR0b25Eb3duID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIFwiYXJyb3dkb3duXCIsIFwiY29sc2Rvd25cIiwgNjAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hbGdvcml0aG0uY29scy0tO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNWYWx1ZSwgdGhpcy5jb2xzLnRvU3RyaW5nKCksMCwwKVxuICAgICAgICAvL3VwZGF0ZSBib2FyZC9tYXRyaXhcblxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVQbGF5ZXIgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy9wbGF5ZXJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB0aGlzLnNwcml0ZXMucGxheWVyX2JsdWU7XG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5wbGF5ZXIpO1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvbi54ID0gNTAwO1xuICAgICAgICB0aGlzLnBsYXllci5wb3NpdGlvbi55ID0gNTAwO1xuICAgICAgICB0aGlzLnNvdW5kcy5wbGF5KFwic3RhcnRcIik7XG5cbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVHcmlkID0gZnVuY3Rpb24ocm93cyxjb2xzKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChjb250YWluZXIpO1xuXG4gICAgICAgIGxldCB0b3RhbG1hcmtzID0gdGhpcy5hbGdvcml0aG0ucm93cyAqIHRoaXMuYWxnb3JpdGhtLmNvbHM7XG4gICAgICAgIGNvbnNvbGUubG9nKHRvdGFsbWFya3MpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsbWFya3M7IGkrKykge1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKDtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIng6IFwiICsgTWF0aC5mbG9vcihpICogdGhpcy5yb3dzKSAqIHRoaXMuc3BhY2luZyArIFwieTogXCIgKyAoaSAlIHRoaXMuY29scykgKiB0aGlzLnNwYWNpbmcpOyk7XG4gICAgICAgICAgICB2YXIgbWFyayA9IG5ldyBQSVhJLlNwcml0ZSh0aGlzLmxvYWRlci5yZXNvdXJjZXMubWFya19icmFja2V0LnRleHR1cmUpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFkZENoaWxkKG1hcmspO1xuXG4gICAgICAgICAgICBtYXJrLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgICAgIG1hcmsueCA9IChpICUgdGhpcy5hbGdvcml0aG0uY29scykgKiB0aGlzLnNwYWNpbmc7Ly8oaSAlIHRoaXMuY29scykgKiB0aGlzLnNwYWNpbmc7XG4gICAgICAgICAgICBtYXJrLnkgPSBNYXRoLmZsb29yKGkgLyB0aGlzLmFsZ29yaXRobS5yb3dzKSAqIHRoaXMuc3BhY2luZzsgLy8oaSAlIHRoaXMuY29scykgKiB0aGlzLnNwYWNpbmc7XG4gICAgICAgICAgICAvLyBidW5ueS54ID0gKGkgJSA1KSAqIDQwO1xuICAgICAgICAgICAgLy8gYnVubnkueSA9IE1hdGguZmxvb3IoaSAvIDUpICogNDA7ICAgICAgICAgICAgbWFyay55ID0gTWF0aC5mbG9vcihpIC8gdGhpcy5yb3dzKSAqIHRoaXMuc3BhY2luZztcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueCA9IDE7XG4gICAgICAgICAgICBtYXJrLnNjYWxlLnkgPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2VudGVyIG9uIHRoZSBzY3JlZW5cbiAgICAgICAgY29udGFpbmVyLnggPSAod2luZG93LmlubmVyV2lkdGggLSBjb250YWluZXIud2lkdGgpIC8gMjtcbiAgICAgICAgY29udGFpbmVyLnkgPSAod2luZG93LmlubmVySGVpZ2h0IC0gY29udGFpbmVyLmhlaWdodCkgLyAyO1xuICAgICAgICB0aGlzLmNyZWF0ZVBsYXllcigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlTGluZSA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmxpbmUgPSBuZXcgUElYSS5HcmFwaGljcygpO1xuXG4gICAgICAgIC8vIHNldCBhIGZpbGwgYW5kIGxpbmUgc3R5bGVcbiAgICAgICAgdGhpcy5saW5lLmxpbmVTdHlsZSgwLjUsIHRoaXMuY29sb3JzLmxpbmUsIDAuNSk7XG5cbiAgICAgICAgLy8gZHJhdyBhIHNoYXBlXG4gICAgICAgIHRoaXMubGluZS5tb3ZlVG8oMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG4gICAgICAgIHRoaXMubGluZS5saW5lVG8od2luZG93LmlubmVyV2lkdGggLSAxMDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKTtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMubGluZSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlVGV4dCA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvL3RleHQgdGVzdFxuICAgICAgICBsZXQgc3R5bGUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmNvbG9ycy5mb250LFxuICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzRhMTg1MCcsXG4gICAgICAgICAgICAvLyBzdHJva2VUaGlja25lc3M6IDUsXG4gICAgICAgICAgICBkcm9wU2hhZG93OiB0cnVlLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Qmx1cjogNCxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dBbmdsZTogTWF0aC5QSSAvIDYsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93RGlzdGFuY2U6IDYsXG4gICAgICAgICAgICB3b3JkV3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHdvcmRXcmFwV2lkdGg6IDQ0MFxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGhlYWRsaW5lID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuaGVhZGxpbmUsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IGZhbHNlLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0NvbG9yOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Qmx1cjogNCxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dBbmdsZTogTWF0aC5QSSAvIDYsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93RGlzdGFuY2U6IDYsXG4gICAgICAgICAgICB3b3JkV3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHdvcmRXcmFwV2lkdGg6IDQ0MFxuICAgICAgICB9KTtcbiAgICAgICAgLy9zdGF0dXNcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMuc3RhdHVzLnggPSAxMTA7XG4gICAgICAgIHRoaXMuc3RhdHVzLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuc3RhdHVzKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiSW5pdGlhbGl6aW5nLi4uXCIsIDAsIDIwMDApO1xuXG4gICAgICAgIC8vcm93cyB0aXRsZVxuICAgICAgICB0aGlzLnJvd3NUaXRsZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUueCA9IDMwMDtcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb3dzVGl0bGUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NUaXRsZSwgXCJyb3dzOlwiLCAwLCAzNTAwKTtcblxuICAgICAgICAvL3Jvd3MgdmFsdWVcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnggPSAzNTA7XG4gICAgICAgIHRoaXMucm93c1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucm93c1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVmFsdWUsIHRoaXMuYWxnb3JpdGhtLnJvd3MudG9TdHJpbmcoKSwgMCwgNDAwMCk7XG5cbiAgICAgICAgLy9jb2xzIHRpdGxlXG4gICAgICAgIHRoaXMuY29sc1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uOicsIHN0eWxlKTtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueCA9IDUwMDtcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jb2xzVGl0bGUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNUaXRsZSwgJ2NvbHM6JywgMCwgNDUwMCk7XG5cbiAgICAgICAgLy8gLy9jb2xzIHZhbHVlXG4gICAgICAgIHRoaXMuY29sc1ZhbHVlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLmNvbHNWYWx1ZS54ID0gNTUwO1xuICAgICAgICB0aGlzLmNvbHNWYWx1ZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNvbHNWYWx1ZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5jb2xzLnRvU3RyaW5nKCksIDAsIDUwMDApO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJSZWFkeVwiLCAwLCA2MDAwKTtcblxuICAgIH1cbiAgICBwcml2YXRlIHR5cGVNZSA9IGZ1bmN0aW9uKHRleHRPYmo6IFBJWEkuVGV4dCwgbWVzc2FnZTogc3RyaW5nLCBtZXNzYWdlTGVuZ3RoOiBudW1iZXIsIGRlbGF5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSArICcgfCAnICsgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RhcnRpbmcgdHlwZVwiKTtcbiAgICAgICAgICAgIHRleHRPYmoudGV4dCA9IFwiXCI7XG4gICAgICAgICAgICBtZXNzYWdlTGVuZ3RoID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbG9vcCB0aHJvdWdoIHR5cGluZ1xuICAgICAgICBsZXQgbmV3U3RyaW5nOiBzdHJpbmcgPSBtZXNzYWdlLnN1YnN0cmluZygwLCBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgdGV4dE9iai50ZXh0ID0gbmV3U3RyaW5nO1xuICAgICAgICBpZiAobWVzc2FnZUxlbmd0aCA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kcy5wbGF5KFwia2V5cHJlc3NcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5sb2cobmV3U3RyaW5nKTtcbiAgICAgICAgLy9pbmNyZW1lbnQgbGVuZ3RoIG9mIG1lc3NhZ2VcbiAgICAgICAgbWVzc2FnZUxlbmd0aCsrO1xuXG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoIDwgbWVzc2FnZS5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMudHlwZU1lLmJpbmQodGhpcywgdGV4dE9iaiwgbWVzc2FnZSwgbWVzc2FnZUxlbmd0aCwgNTApLCBkZWxheSk7XG4gICAgICAgICAgICAvLyBzZXRUaW1lb3V0KHRoaXMuZGVjbGFyZS5iaW5kKHRoaXMpLCAxMDAwKTtcbiAgICAgICAgfVxuXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgT1ZFUkxBWTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgc2V0dXBQaXhpKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vLyAvL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbi8vICAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG4vLyB9XG4vLyAvL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbi8vIGxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4vLyAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8gICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4vLyAgIC8vIGFwcC52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbi8vICAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4vLyAgIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xuLy8gfVxuXG4vL0NyZWF0ZSB0aGUgYXBwXG5sZXQgcmVuZGVyZXI6IGFueTtcbmxldCBzdGFnZTogUElYSS5Db250YWluZXI7XG5cbi8vYnV0dG9uXG5sZXQgcGxheUJ1dHRvbldhaXQ7XG5sZXQgcGxheUJ1dHRvbkRvd247XG5sZXQgcGxheUJ1dHRvbk92ZXI7XG5sZXQgcGxheUJ1dHRvbjtcblxubGV0IHNldHVwUGl4aSA9IGZ1bmN0aW9uKCk6dm9pZHtcblxuICByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDk2MCw1NDAsXG4gICAge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxLCBhdXRvUmVzaXplOiB0cnVlfVxuICApO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLy9DcmVhdGUgYSBjb250YWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgYHN0YWdlYFxuICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBzdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgLy9BZGQgdGhlIGNhbnZhcyB0byB0aGUgSFRNTCBkb2N1bWVudFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIC8vVXBkYXRlIGJhY2tncm91bmQgY29sb3JcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3JzWydiYWNrZ3JvdW5kJ107XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIE9WRVJMQVkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0ZWQgZ2FtZUxvb3BcIik7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuIl19
