(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jiboProgrammingChallenge = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Algorithm {
    constructor() {
        //define size of checkerboard
        // private singlylist = new SinglyLinkedList();
        this._rows = 10;
        this._cols = 10;
        this._spacing = 10; //row vs col => row.width * rows; min:2px max: 50px;
        this.grid = {};
        this.reset = function () {
            //createGrid
            var grid = this.createGrid();
            //pick random starting position
            var randomStart = this.randomStart();
            //build linked list
        };
        this.createGrid = function () {
            let amount = this._rows * this._cols;
            let direction = Math.floor(Math.random() * 4);
            let grid = [];
            for (let i; i < amount; i++) {
                grid.push(direction);
            }
            return grid;
        };
        this.randomStart = function () {
            let amount = this._rows * this._cols;
            return Math.floor(Math.random() * amount);
        };
        // private ranVector = function(-1, 1) {
        //   let x = Math.floor(Math.random() * (max - min + 1)) + min;
        //   let y = Math.floor(Math.random() * (max - min + 1)) + min;
        //   return {x,y}; (0,1)
        // }
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
        console.log("row updated: " + this._rows);
    }
    get cols() {
        return this._cols;
    }
    set cols(newval) {
        this._cols = newval;
        console.log("cols updated: " + this._cols);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FsZ29yaXRobS50cyIsInNyYy9CdG4udHMiLCJzcmMvQ29sb3JQYWxldHRlcy50cyIsInNyYy9HdWkudHMiLCJzcmMvU291bmRFZmZlY3RzLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNHQTtJQVVFO1FBUkEsNkJBQTZCO1FBQzdCLCtDQUErQztRQUN2QyxVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVSxFQUFFLENBQUM7UUFDbEIsYUFBUSxHQUFVLEVBQUUsQ0FBQyxDQUFDLG9EQUFvRDtRQUUxRSxTQUFJLEdBQVUsRUFBRSxDQUFDO1FBcUJsQixVQUFLLEdBQUc7WUFDYixZQUFZO1lBQ1osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQzdCLCtCQUErQjtZQUMvQixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsbUJBQW1CO1FBRXJCLENBQUMsQ0FBQTtRQUNNLGVBQVUsR0FBRztZQUNsQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FB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QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFckQsWUFBWTtZQUNaLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTlDLFlBQVk7WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBRTNDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXJFLFlBQVk7WUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFD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QWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFaEQsU0FBUyxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUE7QUFFRCxZQUFZO0FBQ1osSUFBSSxTQUFTLEdBQUc7SUFDWix5QkFBeUI7SUFDekIsT0FBTyxHQUFHLElBQUksU0FBRyxDQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDNUMsd0JBQXdCO0lBQ3hCLFFBQVEsRUFBRSxDQUFDO0lBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQztBQUNGLElBQUksUUFBUSxHQUFHO0lBQ2IsMkJBQTJCO0lBQzNCLHFCQUFxQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRWhDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IFNpbmdseUxpbmtlZExpc3QgfSBmcm9tIFwiLi9TaW5nbHlMaW5rZWRMaXN0XCI7XG5cblxuZXhwb3J0IGNsYXNzIEFsZ29yaXRobSB7XG5cbiAgLy9kZWZpbmUgc2l6ZSBvZiBjaGVja2VyYm9hcmRcbiAgLy8gcHJpdmF0ZSBzaW5nbHlsaXN0ID0gbmV3IFNpbmdseUxpbmtlZExpc3QoKTtcbiAgcHJpdmF0ZSBfcm93czpudW1iZXIgPSAxMDtcbiAgcHJpdmF0ZSBfY29sczpudW1iZXIgPSAxMDtcbiAgcHJpdmF0ZSBfc3BhY2luZzpudW1iZXIgPSAxMDsgLy9yb3cgdnMgY29sID0+IHJvdy53aWR0aCAqIHJvd3M7IG1pbjoycHggbWF4OiA1MHB4O1xuXG4gIHByaXZhdGUgZ3JpZDpPYmplY3QgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcigpe1xuXG4gIH1cblxuICBnZXQgcm93cygpOm51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgfVxuICBzZXQgcm93cyhuZXd2YWw6bnVtYmVyKSB7XG4gICAgICB0aGlzLl9yb3dzID0gbmV3dmFsO1xuICAgICAgY29uc29sZS5sb2coXCJyb3cgdXBkYXRlZDogXCIgKyB0aGlzLl9yb3dzKTtcbiAgfVxuICBnZXQgY29scygpOm51bWJlciB7XG4gICAgICByZXR1cm4gdGhpcy5fY29scztcbiAgfVxuICBzZXQgY29scyhuZXd2YWw6bnVtYmVyKSB7XG4gICAgICB0aGlzLl9jb2xzID0gbmV3dmFsO1xuICAgICAgY29uc29sZS5sb2coXCJjb2xzIHVwZGF0ZWQ6IFwiICsgdGhpcy5fY29scyk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQgPSBmdW5jdGlvbigpe1xuICAgIC8vY3JlYXRlR3JpZFxuICAgIHZhciBncmlkID0gdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgLy9waWNrIHJhbmRvbSBzdGFydGluZyBwb3NpdGlvblxuICAgIHZhciByYW5kb21TdGFydCA9IHRoaXMucmFuZG9tU3RhcnQoKTtcbiAgICAvL2J1aWxkIGxpbmtlZCBsaXN0XG5cbiAgfVxuICBwdWJsaWMgY3JlYXRlR3JpZCA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IGFtb3VudCA9IHRoaXMuX3Jvd3MgKiB0aGlzLl9jb2xzO1xuICAgIGxldCBkaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNCk7XG4gICAgbGV0IGdyaWQgPSBbXTtcbiAgICBmb3IobGV0IGk7IGkgPCBhbW91bnQ7IGkrKyApe1xuICAgICAgZ3JpZC5wdXNoKGRpcmVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xuICB9XG4gIHB1YmxpYyByYW5kb21TdGFydCA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IGFtb3VudCA9IHRoaXMuX3Jvd3MgKiB0aGlzLl9jb2xzO1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqYW1vdW50KTtcbiAgfVxuICAvLyBwcml2YXRlIHJhblZlY3RvciA9IGZ1bmN0aW9uKC0xLCAxKSB7XG4gIC8vICAgbGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAvLyAgIGxldCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgLy8gICByZXR1cm4ge3gseX07ICgwLDEpXG4gIC8vIH1cbiAgcHJpdmF0ZSBOb2RlID0gZnVuY3Rpb24oZGF0YSwgbmV4dCkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5uZXh0ID0gbmV4dDtcbiAgfVxuICBwcml2YXRlIFNpbmdseUxpc3QgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgIHRoaXMuaGVhZCA9IG51bGw7XG4gIH1cblxuICAvL0EgU2luZ2x5LUxpbmtlZCBMaXN0XG4gIC8vSW4gY29tcHV0ZXIgc2NpZW5jZSwgYSBzaW5nbHktbGlua2VkIGxpc3QgaXMgYSBkYXRhIHN0cnVjdHVyZVxuICAvL3RoYXQgaG9sZHMgYSBzZXF1ZW5jZSBvZiBsaW5rZWQgbm9kZXMuIEVhY2ggbm9kZSwgaW4gdHVybiwgY29udGFpbnMgZGF0YSBhbmQgYSBwb2ludGVyLCB3aGljaCBjYW4gcG9pbnQgdG8gYW5vdGhlciBub2RlLlxuICBwcml2YXRlIFNpbmdseUxpbmtlZExpc3QgPSBmdW5jdGlvbigpe1xuXG4gIH1cblxuXG4vL21vdmUgdG8gZ3VpXG4vLyAvL2RyYXcgc3F1YXJlc1xuLy8gcHJpdmF0ZSBkcmF3U3F1YXJlcyA9IGZ1bmN0aW9uKHN0YWdlLCBsb2FkZXIpe1xuLy8gbGV0IHRvdGFsU3F1YXJlczpudW1iZXIgPSBjb2xzKnJvd3M7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxTcXVhcmVzOyBpKyspIHtcbi8vICAgICAvL2NyZWF0ZSBpbnN0YW5jZSBvZiBzcXVhcmVcbi8vICAgICAvL2NhbGN1bGF0ZSB4LCB5XG4vLyAgICAgbGV0IHggPSAoaSAlIGNvbHMpICogc3BhY2luZztcbi8vICAgICBsZXQgeSA9IE1hdGguZmxvb3IoaSAvIHJvd3MpICogc3BhY2luZztcbi8vICAgICAvLzxzcXVhcmVzY29udGFpbmVyID0+IHNxdWFyZWNsYXNzIG5ldyBpbnN0YW5jZSBhbmQgcG9zaXRpb24oeDpudW1iZXIsIHk6bnVtYmVyKT5cbi8vICAgfVxuLy8gfVxuXG4vL3JhbmRvbWl6ZSBkaXJlY3Rpb24gb24gc3F1YXJlc1xuLy8gLy9zdGFydCBjaGVja2VyIGF0IHJhbmRvbSBpbnNlcnRpb24gc3F1YXJlXG4vLyBsZXQgc3RhcnR4ID0gTWF0aC5yYW5kb20oKSpyb3dzO1xuLy8gbGV0IHN0YXJ0eSA9IE1hdGgucmFuZG9tKCkqY29scztcbi8vPHNxdWFyZXNjb250YWluZXIgPT4gcGxheWVyY2xhc3MgLSBwb3NpdGlvbiBwbGF5ZXI+XG5cbi8vbW92ZSAxIHR1cm5cbi8vZ2V0RGlyZWN0aW9uIGZyb20gY3VycmVudCBzcXVhcmVcbi8vYW5pbWF0ZSB0byBuZXcgc3F1YXJlXG5cbi8vY2hlY2sgYm91bmRzIChjb25kaXRpb24xKVxuLy8gaWYoeCA8IDAgJiYgeCA+IGNvbHMgJiYgeSA8IDAgJiYgeSA+IHJvd3Mpe1xuLy8gICBjb25zb2xlLmxvZyhcInlvdSBhcmUgb3V0c2lkZSBib3VuZHNcIik7XG4vLyB9XG5cbi8vY2hlY2sgY3ljbGUgKGNvbmRpdGlvbjIpXG5cbi8vaGlzdG9yeSBhcnJheVxuLy8gbGV0IGhpc3RvcnkgPSBuZXcgQXJyYXkoKTtcbi8vXG4vLyAvL2Nvb3JkaW5hdGUgb2JqZWN0IChpbnRlcmZhY2U/KVxuLy8gbGV0IGNvb3JkaW5hdGUgPSBmdW5jdGlvbih4LCB5KXtcbi8vICAgdGhpcy54ID0geDtcbi8vICAgdGhpcy55ID0geTtcbi8vIH1cblxuLy9jaGVjayBmb3IgcmVwZWF0XG4vLyBmdW5jdGlvbiBjaGVja0FuZEFkZCh4LHkpIHtcbi8vICAgdmFyIHRlc3QgPSBuZXcgY29vcmRpbmF0ZSh4LHkpO1xuLy9cbi8vICAgdmFyIGZvdW5kID0gaGlzdG9yeS5zb21lKGZ1bmN0aW9uIChlbCkge1xuLy8gICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGVsKSA9PT0gSlNPTi5zdHJpbmdpZnkodGVzdCk7XG4vLyAgIH0pO1xuLy8gICBpZiAoIWZvdW5kKSB7XG4vLyAgICAgY29uc29sZS5sb2coXCJub3QgZm91bmRcIik7XG4vLyAgICAgaGlzdG9yeS5wdXNoKHRlc3QpO1xuLy8gICB9ZWxzZXtcbi8vICAgICBjb25zb2xlLmxvZyhcImZvdW5kXCIpO1xuLy8gICAgIC8vIGNvbmRpdGlvbiAyIG1ldCBlbmQgLy9cbi8vICAgICA8c3F1YXJlc2NvbnRhaW5lciA9IHBsYXllcmNsYXNzIGRlc3Ryb3k+XG4vLyAgICAgPHNxdWFyZXNjb250YWluZXIgPSBzcXVhcmUgdHVybiByZWQ+XG4vLyAgIH1cbi8vIH1cblxuLy9zcXVhcmUgY2xhc3Ncbi8vcG9zc2libGUgZGlyZWN0aW9uc1xuXG4vLyBwcml2YXRlIG9wdGlvbnM6c3RyaW5ncztcbi8vIGNvbnN0cnVjdG9yID0ge1xuLy8gICBvcHRpb25zID0gWyd1cCcsJ3JpZ2h0JywnZG93bicsJ2xlZnQnXTtcbi8vIH1cbi8vXG4vLyBsZXQgc2V0UmFuZG9tRGlyZWN0aW9uID0gZnVuY3Rpb24oKXtcbi8vICAgLy9zZXQgcmFuZG9tIDQgdmFsdWVzXG4vLyAgIE1hdGgucmFuZG9tKCkqb3B0aW9ucy5sZW5ndGg7XG4vLyB9XG4vLyBsZXQgY2hhbmdlRGlzcGxheSA9IGZ1bmN0aW9uKG9wdGlvbjpudW1iZXIpe1xuLy8gICBzd2l0Y2gob3B0aW9uKXtcbi8vICAgICBjYXNlIDA6XG4vLyAgICAgICAvL3N3YXAgdGV4dHVyZVxuLy8gICAgIGJyZWFrO1xuLy8gICAgIGNhc2UgMTpcbi8vICAgICAgIC8vc3dhcCB0ZXh0dXJlXG4vLyAgICAgYnJlYWs7XG4vLyAgICAgY2FzZSAyOlxuLy8gICAgICAgLy9zd2FwIHRleHR1cmVcbi8vICAgICBicmVhaztcbi8vICAgICBjYXNlIDM6XG4vLyAgICAgICAvL3N3YXAgdGV4dHVyZVxuLy8gICAgIGJyZWFrO1xuLy8gICAgIGRlZmF1bHQ6XG4vLyAgICAgICBjb25zb2xlLmxvZyhcIm5vIHZhbGlkIGNhc2VcIik7XG4vLyAgICAgYnJlYWs7XG4vLyAgIH1cbi8vIH1cbn1cbiIsImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcblxuZXhwb3J0IGNsYXNzIEJ0biB7XG4gICAgcHJpdmF0ZSBidXR0b25PYmplY3Q6IE9iamVjdCA9IHt9O1xuICAgIHByaXZhdGUgYnRua2luZDogU3RyaW5nO1xuICAgIHByaXZhdGUgY2FsbGJhY2s6RnVuY3Rpb247XG4gICAgcHJpdmF0ZSBzdGFnZTpQSVhJLkNvbnRhaW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTphbnksIHJlc291cmNlczphbnksIGJ0bmtpbmQ6IHN0cmluZywgbmFtZTpzdHJpbmcsIHhwb3M6IG51bWJlciwgeXBvczogbnVtYmVyLCBjYWxsYms6RnVuY3Rpb24pIHtcbiAgICAgICAgLy8gY3JlYXRlIHNvbWUgdGV4dHVyZXMgZnJvbSBhbiBpbWFnZSBwYXRoXG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMuYnRua2luZCA9IGJ0bmtpbmQ7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYms7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJidG5raW5kOiBcIiArIHRoaXMuYnRua2luZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5hbWUpO1xuICAgICAgICAvLyB2YXIgdGV4dHVyZUJ1dHRvbiA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoJ3JlcXVpcmVkL2Fzc2V0cy9idXR0b24ucG5nJyk7XG5cbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwidXBcIl0gPSByZXNvdXJjZXNbYnRua2luZCArICdfdXAnXS50ZXh0dXJlO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJvdmVyXCJdID0gcmVzb3VyY2VzW2J0bmtpbmQgKyBcIl9vdmVyXCJdLnRleHR1cmU7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImhpdFwiXSA9IHJlc291cmNlc1tidG5raW5kICsgXCJfaGl0XCJdLnRleHR1cmU7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0gPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzW2J0bmtpbmQgKyBcIl91cFwiXS50ZXh0dXJlKTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXS5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0ueCA9IHhwb3M7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0ueSA9IHlwb3M7XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGludGVyYWN0aXZlLi4uXG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0uaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdLmJ1dHRvbk1vZGUgPSB0cnVlO1xuXG4gICAgICAgIC8vIE1vdXNlICYgdG91Y2ggZXZlbnRzIGFyZSBub3JtYWxpemVkIGludG9cbiAgICAgICAgLy8gdGhlIHBvaW50ZXIqIGV2ZW50cyBmb3IgaGFuZGxpbmcgZGlmZmVyZW50XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl1cbiAgICAgICAgICAgIC5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uQnV0dG9uRG93bi5iaW5kKHRoaXMsIFwidGV4dHVyZUJ1dHRvblwiLCB0aGlzLmNhbGxiYWNrKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcnVwJywgdGhpcy5vbkJ1dHRvblVwLmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgdGhpcy5vbkJ1dHRvblVwLmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyb3ZlcicsIHRoaXMub25CdXR0b25PdmVyLmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIpKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyb3V0JywgdGhpcy5vbkJ1dHRvbk91dC5iaW5kKHRoaXMsIFwidGV4dHVyZUJ1dHRvblwiKSk7XG5cbiAgICAgICAgLy8gVXNlIG1vdXNlLW9ubHkgZXZlbnRzXG4gICAgICAgIC8vIC5vbignbW91c2Vkb3duJywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ21vdXNldXAnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNldXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCdtb3VzZW92ZXInLCBvbkJ1dHRvbk92ZXIpXG4gICAgICAgIC8vIC5vbignbW91c2VvdXQnLCBvbkJ1dHRvbk91dClcblxuICAgICAgICAvLyBVc2UgdG91Y2gtb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCd0b3VjaHN0YXJ0Jywgb25CdXR0b25Eb3duKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCd0b3VjaGVuZG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuXG4gICAgICAgIC8vIGFkZCBpdCB0byB0aGUgc3RhZ2VcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvbkRvd24gPSBmdW5jdGlvbihtZSxjYWxsYmFjayk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uRG93blwiKTtcbiAgICAgICAgdGhpcy5pc2Rvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX2hpdFwiXTtcbiAgICAgICAgdGhpcy5hbHBoYSA9IDE7XG4gICAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25VcCA9IGZ1bmN0aW9uKG1lKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25VcFwiKTtcbiAgICAgICAgdGhpcy5pc2Rvd24gPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNPdmVyKSB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX292ZXJcIl07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX3VwXCJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25PdmVyID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbk92ZXJcIik7XG4gICAgICAgIHRoaXMuaXNPdmVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl9vdmVyXCJdO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uT3V0ID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbk91dFwiKTtcbiAgICAgICAgdGhpcy5pc092ZXIgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl91cFwiXTtcbiAgICB9XG59XG4iLCJpbXBvcnQge0lQYWxldHRlfSBmcm9tICcuL2ludGVyZmFjZXMvSVBhbGV0dGUnO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JQYWxldHRlcyB7XG4gICAgcHJpdmF0ZSBwYWxldHRlSW5kZXg6IDA7XG4gICAgcHVibGljIHBhbGV0dGVzOiBudWxsO1xuICAgIHByaXZhdGUgYWN0aXZlUGFsZXR0ZTogbnVsbDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKTpQcm9taXNlPGFueT4ge1xuICAgICAgdGhpcy5wYWxldHRlSW5kZXggPSBwaW5kZXg7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9ICdzcmMvY29sb3JzLmpzb24nO1xuICAgICAgICAgICAgbGV0IHhocjogYW55ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICAgIHZhciBkYXRhOiBhbnk7XG4gICAgICAgICAgICB4aHIub25sb2FkID1cbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU3VjY2VzcyFcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUGFsZXR0ZTpJUGFsZXR0ZSA9IGRhdGEuY29sb3JzW3BpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhY3RpdmVQYWxldHRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuaW1wb3J0IHsgQnRuIH0gZnJvbSBcIi4vQnRuXCI7XG5pbXBvcnQgeyBBbGdvcml0aG0gfSBmcm9tIFwiLi9BbGdvcml0aG1cIjtcblxuZXhwb3J0IGNsYXNzIEd1aSB7XG4gICAgcHJpdmF0ZSBzdGFnZTogUElYSS5Db250YWluZXI7XG4gICAgcHJpdmF0ZSBhbGdvcml0aG06IEFsZ29yaXRobSA9IG5ldyBBbGdvcml0aG07XG4gICAgcHJpdmF0ZSBjb2xvcnM6IGFueTtcbiAgICBwcml2YXRlIHNvdW5kczogYW55O1xuXG4gICAgLy90ZXh0IGVsZW1lbnRzXG4gICAgcHJpdmF0ZSBzdGF0dXM6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIHJvd3NUaXRsZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgcm93c1ZhbHVlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSBjb2xzVGl0bGU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIGNvbHNWYWx1ZTogUElYSS5UZXh0O1xuXG4gICAgcHJpdmF0ZSBsaW5lOiBQSVhJLkdyYXBoaWNzO1xuICAgIHByaXZhdGUgbG9hZGVyID0gbmV3IFBJWEkubG9hZGVycy5Mb2FkZXIoKTtcbiAgICBwcml2YXRlIHNwcml0ZXM6IGFueSA9IHt9O1xuXG4gICAgcHJpdmF0ZSBzcGFjaW5nOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIHJlc291cmNlczogYW55O1xuICAgIHByaXZhdGUgbWFya3M6IGFueSA9IFtdO1xuICAgIHByaXZhdGUgcGxheWVyOiBQSVhJLlNwcml0ZTtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTogUElYSS5Db250YWluZXIsIG1haW5Db2xvcnM6IGFueSwgbWFpblNvdW5kczogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMuY29sb3JzID0gbWFpbkNvbG9ycztcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBtYWluU291bmRzO1xuICAgICAgICB0aGlzLmxvYWRJbWFnZXMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vbG9hZCBpbWFnZXMnXG4gICAgICAgIHRoaXMubG9hZGVyID0gUElYSS5sb2FkZXJcbiAgICAgICAgICAgIC5hZGQoJ3BsYXllcl9ibHVlJywgJ3NyYy9ncmFwaGljcy9wbGF5ZXJfYmx1ZS5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnbWFya19icmFja2V0JywgJ3NyYy9ncmFwaGljcy9tYXJrX2JyYWNrZXQucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfdXAnLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfdXAucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfb3ZlcicsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9vdmVyLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX2hpdCcsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9oaXQucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93ZG93bl91cCcsICdzcmMvZ3JhcGhpY3MvYXJyb3dkb3duX3VwLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd2Rvd25fb3ZlcicsICdzcmMvZ3JhcGhpY3MvYXJyb3dkb3duX292ZXIucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93ZG93bl9oaXQnLCAnc3JjL2dyYXBoaWNzL2Fycm93ZG93bl9oaXQucG5nJylcbiAgICAgICAgICAgIC5vbignY29tcGxldGUnLCBmdW5jdGlvbihsb2FkZXIsIHJlc291cmNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5wbGF5ZXJfYmx1ZSA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMucGxheWVyX2JsdWUudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLm1hcmtfYnJhY2tldCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMubWFya19icmFja2V0LnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5jb2xzdXBfdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHN1cF9vdmVyID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHN1cF9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHNkb3duX3VwID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd2Rvd25fdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHNkb3duX292ZXIgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl9vdmVyLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5jb2xzZG93bl9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucm93c3VwX3VwID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzdXBfb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF9vdmVyLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzdXBfaGl0ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzZG93bl91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzZG93bl9vdmVyID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd2Rvd25fb3Zlci50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucm93c2Rvd25faGl0ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd2Rvd25fdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRDb21wbGV0ZWQoKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMubG9hZGVyLmxvYWQoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjb29yZGluYXRlcyA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTG9hZENvbXBsZXRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoIHRoaXMuYWxnb3JpdGhtLmNvbHMsIHRoaXMuYWxnb3JpdGhtLnJvd3MpO1xuICAgICAgICB0aGlzLmNyZWF0ZUxpbmUoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVUZXh0KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQnV0dG9ucygpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZUJ1dHRvbnMgPSBmdW5jdGlvbigpe1xuICAgICAgdmFyIHJvd3NCdXR0b25VcCA9IG5ldyBCdG4odGhpcy5zdGFnZSwgdGhpcy5sb2FkZXIucmVzb3VyY2VzLCBcImFycm93dXBcIiwgXCJyb3dzdXBcIiwgNDA1LCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA0NSwgZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hbGdvcml0aG0ucm93cysrO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NWYWx1ZSwgdGhpcy5hbGdvcml0aG0ucm93cy50b1N0cmluZygpLDAsMClcbiAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG5cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB2YXIgcm93c0J1dHRvbkRvd24gPSBuZXcgQnRuKHRoaXMuc3RhZ2UsIHRoaXMubG9hZGVyLnJlc291cmNlcywgXCJhcnJvd2Rvd25cIiwgXCJyb3dkb3duXCIsNDAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgdGhpcy5hbGdvcml0aG0ucm93cy0tO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NWYWx1ZSwgdGhpcy5hbGdvcml0aG0ucm93cy50b1N0cmluZygpLDAsMClcbiAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG5cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICB2YXIgY29sc0J1dHRvblVwID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIFwiYXJyb3d1cFwiLCBcImNvbHN1cFwiLCA2MDUsIHdpbmRvdy5pbm5lckhlaWdodCAtIDQ1LCBmdW5jdGlvbigpe1xuICAgICAgICB0aGlzLmFsZ29yaXRobS5jb2xzKys7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5jb2xzLnRvU3RyaW5nKCksMCwwKVxuICAgICAgICAvL3VwZGF0ZSBib2FyZC9tYXRyaXhcblxuICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgIHZhciBjb2xzQnV0dG9uRG93biA9IG5ldyBCdG4odGhpcy5zdGFnZSwgdGhpcy5sb2FkZXIucmVzb3VyY2VzLCBcImFycm93ZG93blwiLCBcImNvbHNkb3duXCIsIDYwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gMzAsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuYWxnb3JpdGhtLmNvbHMtLTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuY29scy50b1N0cmluZygpLDAsMClcbiAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG5cbiAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlUGxheWVyID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vcGxheWVyXG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlO1xuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucGxheWVyKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueCA9IDUwMDtcbiAgICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueSA9IDUwMDtcbiAgICAgICAgdGhpcy5zb3VuZHMucGxheShcInN0YXJ0XCIpO1xuXG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlR3JpZCA9IGZ1bmN0aW9uKHJvd3MsY29scykge1xuICAgICAgICB2YXIgY29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQoY29udGFpbmVyKTtcblxuICAgICAgICBsZXQgdG90YWxtYXJrcyA9IHRoaXMuYWxnb3JpdGhtLnJvd3MgKiB0aGlzLmFsZ29yaXRobS5jb2xzO1xuICAgICAgICBjb25zb2xlLmxvZyh0b3RhbG1hcmtzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbG1hcmtzOyBpKyspIHtcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyg7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ4OiBcIiArIE1hdGguZmxvb3IoaSAqIHRoaXMucm93cykgKiB0aGlzLnNwYWNpbmcgKyBcInk6IFwiICsgKGkgJSB0aGlzLmNvbHMpICogdGhpcy5zcGFjaW5nKTspO1xuICAgICAgICAgICAgdmFyIG1hcmsgPSBuZXcgUElYSS5TcHJpdGUodGhpcy5sb2FkZXIucmVzb3VyY2VzLm1hcmtfYnJhY2tldC50ZXh0dXJlKTtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hZGRDaGlsZChtYXJrKTtcblxuICAgICAgICAgICAgbWFyay5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICAgICAgICBtYXJrLnggPSAoaSAlIHRoaXMuYWxnb3JpdGhtLmNvbHMpICogdGhpcy5zcGFjaW5nOy8vKGkgJSB0aGlzLmNvbHMpICogdGhpcy5zcGFjaW5nO1xuICAgICAgICAgICAgbWFyay55ID0gTWF0aC5mbG9vcihpIC8gdGhpcy5hbGdvcml0aG0ucm93cykgKiB0aGlzLnNwYWNpbmc7IC8vKGkgJSB0aGlzLmNvbHMpICogdGhpcy5zcGFjaW5nO1xuICAgICAgICAgICAgbWFyay5zY2FsZS54ID0gMTtcbiAgICAgICAgICAgIG1hcmsuc2NhbGUueSA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDZW50ZXIgb24gdGhlIHNjcmVlblxuICAgICAgICBjb250YWluZXIueCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIGNvbnRhaW5lci53aWR0aCkgLyAyO1xuICAgICAgICBjb250YWluZXIueSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBjb250YWluZXIuaGVpZ2h0KSAvIDI7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICAgICAgLy8gc2V0IGEgZmlsbCBhbmQgbGluZSBzdHlsZVxuICAgICAgICB0aGlzLmxpbmUubGluZVN0eWxlKDAuNSwgdGhpcy5jb2xvcnMubGluZSwgMC41KTtcblxuICAgICAgICAvLyBkcmF3IGEgc2hhcGVcbiAgICAgICAgdGhpcy5saW5lLm1vdmVUbygxMDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKTtcbiAgICAgICAgdGhpcy5saW5lLmxpbmVUbyh3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVUZXh0ID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vdGV4dCB0ZXN0XG4gICAgICAgIGxldCBzdHlsZSA9IG5ldyBQSVhJLlRleHRTdHlsZSh7XG4gICAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmZvbnQsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IHRydWUsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGVhZGxpbmUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmNvbG9ycy5oZWFkbGluZSxcbiAgICAgICAgICAgIC8vIHN0cm9rZTogJyM0YTE4NTAnLFxuICAgICAgICAgICAgLy8gc3Ryb2tlVGhpY2tuZXNzOiA1LFxuICAgICAgICAgICAgZHJvcFNoYWRvdzogZmFsc2UsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuICAgICAgICAvL3N0YXR1c1xuICAgICAgICB0aGlzLnN0YXR1cyA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5zdGF0dXMueCA9IDExMDtcbiAgICAgICAgdGhpcy5zdGF0dXMueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zdGF0dXMpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJJbml0aWFsaXppbmcuLi5cIiwgMCwgMjAwMCk7XG5cbiAgICAgICAgLy9yb3dzIHRpdGxlXG4gICAgICAgIHRoaXMucm93c1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgc3R5bGUpO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS54ID0gMzAwO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvd3NUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1RpdGxlLCBcInJvd3M6XCIsIDAsIDM1MDApO1xuXG4gICAgICAgIC8vcm93cyB2YWx1ZVxuICAgICAgICB0aGlzLnJvd3NWYWx1ZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUueCA9IDM1MDtcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb3dzVmFsdWUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NWYWx1ZSwgdGhpcy5hbGdvcml0aG0ucm93cy50b1N0cmluZygpLCAwLCA0MDAwKTtcblxuICAgICAgICAvL2NvbHMgdGl0bGVcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUgPSBuZXcgUElYSS5UZXh0KCcuLi46Jywgc3R5bGUpO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS54ID0gNTAwO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNvbHNUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1RpdGxlLCAnY29sczonLCAwLCA0NTAwKTtcblxuICAgICAgICAvLyAvL2NvbHMgdmFsdWVcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnggPSA1NTA7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY29sc1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuYWxnb3JpdGhtLmNvbHMudG9TdHJpbmcoKSwgMCwgNTAwMCk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuc3RhdHVzLCBcIlJlYWR5XCIsIDAsIDYwMDApO1xuXG4gICAgfVxuICAgIHByaXZhdGUgdHlwZU1lID0gZnVuY3Rpb24odGV4dE9iajogUElYSS5UZXh0LCBtZXNzYWdlOiBzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6IG51bWJlciwgZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlICsgJyB8ICcgKyBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGFydGluZyB0eXBlXCIpO1xuICAgICAgICAgICAgdGV4dE9iai50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIG1lc3NhZ2VMZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb29wIHRocm91Z2ggdHlwaW5nXG4gICAgICAgIGxldCBuZXdTdHJpbmc6IHN0cmluZyA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICB0ZXh0T2JqLnRleHQgPSBuZXdTdHJpbmc7XG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdTdHJpbmcpO1xuICAgICAgICAvL2luY3JlbWVudCBsZW5ndGggb2YgbWVzc2FnZVxuICAgICAgICBtZXNzYWdlTGVuZ3RoKys7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPCBtZXNzYWdlLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy50eXBlTWUuYmluZCh0aGlzLCB0ZXh0T2JqLCBtZXNzYWdlLCBtZXNzYWdlTGVuZ3RoLCA1MCksIGRlbGF5KTtcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQodGhpcy5kZWNsYXJlLmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBIb3dsIH0gZnJvbSBcImhvd2xlclwiO1xuXG5leHBvcnQgY2xhc3MgU291bmRFZmZlY3RzIHtcbiAgcHVibGljIHNuZHNwcml0ZTpIb3dsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgLy9sb2FkIHNwcml0ZVxuICAgICAgdGhpcy5zbmRzcHJpdGUgPSBuZXcgSG93bCh7XG4gICAgICBzcmM6IFsnc3JjL2F1ZGlvL3Nwcml0ZS53YXYnXSxcbiAgICAgIHNwcml0ZToge1xuICAgICAgICBzdGFydDogWzIxMiwgMTY2NF0sXG4gICAgICAgIGRvdDogWzQwMDAsIDEwMDBdLFxuICAgICAgICBsaW5lOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIGtleXByZXNzOiBbMTAsIDU0XSxcbiAgICAgICAgZXJyb3I6IFs2MDAwLCA1MDAwXSxcbiAgICAgICAgbW92ZTogWzYwMDAsIDUwMDBdXG4gICAgICB9XG4gICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBwbGF5ID0gZnVuY3Rpb24oc25kOnN0cmluZyk6dm9pZHtcbiAgICAgIGNvbnNvbGUubG9nKFwic25kXCIsIHNuZCk7XG4gICAgICB0aGlzLnNuZHNwcml0ZS5wbGF5KHNuZCk7XG4gICAgfVxuICB9XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IFBJWEkgPSByZXF1aXJlKCdwaXhpLmpzJyk7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGVzIH0gZnJvbSBcIi4vQ29sb3JQYWxldHRlc1wiO1xuaW1wb3J0IHsgU291bmRFZmZlY3RzIH0gZnJvbSBcIi4vU291bmRFZmZlY3RzXCI7XG5pbXBvcnQgeyBHdWkgfSBmcm9tIFwiLi9HdWlcIjtcblxuLy9HZXQgc291bmQgZWZmZWN0c1xuY29uc3QgU09VTkRMSUIgPSBuZXcgU291bmRFZmZlY3RzO1xuXG4vL0dldCBjb2xvciBpbmZvcm1hdGlvblxuY29uc3QgQ09MT1JMSUIgPSBuZXcgQ29sb3JQYWxldHRlcztcbmxldCBjb2xvcnM6YW55O1xuXG4vLyBMb2FkIEd1aSBhZnRlciBjb2xvcnNcbmxldCBPVkVSTEFZOmFueTtcblxuLy9sb2FkIGNvbG9yIHBhbGV0dGVcbmxldCBjaGFuZ2VDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKXtcbiAgQ09MT1JMSUIubG9hZENvbG9ycyhwaW5kZXgpXG4gIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgY29sb3JzID0gZGF0YTtcbiAgICBzZXR1cFBpeGkoKTtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyKTtcbiAgfSk7XG59XG5jaGFuZ2VDb2xvcnMoMCk7XG5cbi8vIC8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuLy8gICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbi8vIH1cbi8vIC8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xuLy8gbGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbi8vICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLyAgIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuLy8gICAvLyBhcHAudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuLy8gICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbi8vICAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG4vLyB9XG5cbi8vQ3JlYXRlIHRoZSBhcHBcbmxldCByZW5kZXJlcjogYW55O1xubGV0IHN0YWdlOiBQSVhJLkNvbnRhaW5lcjtcblxuLy9idXR0b25cbmxldCBwbGF5QnV0dG9uV2FpdDtcbmxldCBwbGF5QnV0dG9uRG93bjtcbmxldCBwbGF5QnV0dG9uT3ZlcjtcbmxldCBwbGF5QnV0dG9uO1xuXG5sZXQgc2V0dXBQaXhpID0gZnVuY3Rpb24oKTp2b2lke1xuXG4gIHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoOTYwLDU0MCxcbiAgICB7YW50aWFsaWFzOiB0cnVlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4gICk7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gIHJlbmRlcmVyLnZpZXcuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgcmVuZGVyZXIuYXV0b1Jlc2l6ZSA9IHRydWU7XG4gIHJlbmRlcmVyLnJlc2l6ZSh3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRhaW5lciBvYmplY3QgY2FsbGVkIHRoZSBgc3RhZ2VgXG4gIHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG4gIHN0YWdlLmludGVyYWN0aXZlID0gdHJ1ZTtcblxuICAvL0FkZCB0aGUgY2FudmFzIHRvIHRoZSBIVE1MIGRvY3VtZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgLy9VcGRhdGUgYmFja2dyb3VuZCBjb2xvclxuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbJ2JhY2tncm91bmQnXTtcblxuICBkcmF3U2NlbmUoKTtcbn1cblxuLy9EcmF3IHNjZW5lXG5sZXQgZHJhd1NjZW5lID0gZnVuY3Rpb24oKXtcbiAgICAvL2luaXQgR3VpIHBhc3MgaW4gY29sb3JzXG4gICAgT1ZFUkxBWSA9IG5ldyBHdWkoIHN0YWdlLCBjb2xvcnMsIFNPVU5ETElCKTtcbiAgICAvL3N0YXJ0IHJlbmRlcmluZyBlbmdpbmVcbiAgICBnYW1lTG9vcCgpO1xuICAgIGNvbnNvbGUubG9nKFwic3RhcnRlZCBnYW1lTG9vcFwiKTtcbn07XG5sZXQgZ2FtZUxvb3AgPSBmdW5jdGlvbigpOnZvaWR7XG4gIC8vbG9vcCA2MCBmcmFtZXMgcGVyIHNlY29uZFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZ2FtZUxvb3ApO1xuXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG59XG4iXX0=
