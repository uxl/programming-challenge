(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jiboProgrammingChallenge = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SinglyLinkedList_1 = require("./SinglyLinkedList");
class Algorithm {
    constructor() {
        //define size of checkerboard
        this.singlylist = new SinglyLinkedList_1.SinglyLinkedList();
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
            var head = grid[randomStart];
            return grid;
        };
        this.createGrid = function () {
            let amount = this._rows * this._cols;
            let direction = Math.floor(Math.random() * 4);
            let grid = [];
            for (var i = 0; i < amount; i++) {
                var cell = { x: (i % this._cols), y: Math.floor(i / this._rows), direction: direction };
                grid.push(cell);
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

},{"./SinglyLinkedList":5}],2:[function(require,module,exports){
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
                .add('mark_dot', 'src/graphics/mark_dot.png')
                .add('arrowup_up', 'src/graphics/arrowup_up.png')
                .add('arrowup_over', 'src/graphics/arrowup_over.png')
                .add('arrowup_hit', 'src/graphics/arrowup_hit.png')
                .add('arrowdown_up', 'src/graphics/arrowdown_up.png')
                .add('arrowdown_over', 'src/graphics/arrowdown_over.png')
                .add('arrowdown_hit', 'src/graphics/arrowdown_hit.png')
                .on('complete', function (loader, resources) {
                this.sprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                this.sprites.mark_dot = new PIXI.Sprite(resources.mark_dot.texture);
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
                this.createGrid();
            }.bind(this));
            var rowsButtonDown = new Btn_1.Btn(this.stage, this.loader.resources, "arrowdown", "rowdown", 400, window.innerHeight - 30, function () {
                this.algorithm.rows--;
                this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
                //update board/matrix
                this.createGrid();
            }.bind(this));
            var colsButtonUp = new Btn_1.Btn(this.stage, this.loader.resources, "arrowup", "colsup", 605, window.innerHeight - 45, function () {
                this.algorithm.cols++;
                this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
                //update board/matrix
                this.createGrid();
            }.bind(this));
            var colsButtonDown = new Btn_1.Btn(this.stage, this.loader.resources, "arrowdown", "colsdown", 600, window.innerHeight - 30, function () {
                this.algorithm.cols--;
                this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
                //update board/matrix
            }.bind(this));
            this.createGrid();
        };
        this.createPlayer = function () {
            //player
            this.player = this.sprites.player_blue;
            this.stage.addChild(this.player);
            this.player.position.x = 500;
            this.player.position.y = 500;
            this.sounds.play("start");
        };
        this.isEven = function (n) {
            return n % 2 == 0;
        };
        this.createGrid = function () {
            var grid = this.algorithm.reset();
            //create container for grid
            var squarecontainer = new PIXI.Container();
            var markcontainer = new PIXI.Container();
            //make marks
            // this.stage.addChild(markcontainer);
            // for (var i = 0; i < grid.length * 4; i++) {
            //
            //     var mark = new PIXI.Sprite(this.loader.resources.mark_dot.texture);
            //
            //     markcontainer.addChild(mark);
            //
            //     mark.anchor.set(0.5);
            //     mark.x = (i % (this.algorithm.cols * 4)) * this.spacing;//(i % this.cols) * this.spacing;
            //     mark.y = Math.floor(i / (this.algorithm.rows * 4)) * this.spacing; //(i % this.cols) * this.spacing;
            //
            //     mark.scale.x = 1;
            //     mark.scale.y = 1;
            // }
            //make squares
            this.stage.addChild(squarecontainer);
            //using graphics for squares
            var squares = new PIXI.Graphics();
            let squarecolor;
            for (var i = 0; i < grid.length; i++) {
                // set a fill and line style
                if (this.isEven(Math.floor(i / this.algorithm.rows))) {
                    if (this.isEven(i)) {
                        squarecolor = this.colors.squaredark;
                    }
                    else {
                        squarecolor = this.colors.squarelight;
                    }
                }
                else {
                    if (this.isEven(i)) {
                        squarecolor = this.colors.squarelight;
                    }
                    else {
                        squarecolor = this.colors.squaredark;
                    }
                }
                squares.beginFill(squarecolor, 0.5);
                squares.lineStyle(1, this.colors.lines, 1);
                var x = (i % this.algorithm.cols) * this.spacing;
                var y = Math.floor(i / this.algorithm.rows) * this.spacing;
                squares.drawRect(x, y, this.spacing, this.spacing);
            }
            squarecontainer.addChild(squares);
            // Center on the screen
            markcontainer.x = 0; //(window.innerWidth) / 2;
            markcontainer.y = 0; //(window.innerHeight) / 2;
            // Center on the screen
            squarecontainer.x = (window.innerWidth - squarecontainer.width) / 2;
            squarecontainer.y = (window.innerHeight - squarecontainer.height) / 2;
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
//sources
//https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392
//http://techieme.in/finding-loop-in-linked-list/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//A Singly-Linked List
//In computer science, a singly-linked list is a data structure
//that holds a sequence of linked nodes. Each node, in turn, contains data and a pointer, which can point to another node.
class SinglyLinkedList {
    constructor() {
        // private linkedList = SinglyList;
        this.hasCycle = function (head) {
            var fast = head;
            var slow = head;
            while (fast != null && fast.next != null) {
                fast = fast.next.next;
                slow = slow.next;
                //if fast and slow pointers are meeting then LinkedList is cyclic
                if (fast == slow) {
                    return true;
                }
            }
            return false;
        };
        this.Node = function (data) {
            this.data = data;
            this.next = null;
        };
        this.SinglyList = function () {
            this._length = 0;
            this.head = null;
        };
        this.add = function (value) {
            var node = new this.Node(value), currentNode = this.head;
            // 1st use-case: an empty list
            if (!currentNode) {
                this.head = node;
                this._length++;
                return node;
            }
            // 2nd use-case: a non-empty list
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
            this._length++;
            return node;
        };
        this.searchNodeAt = function (position) {
            var currentNode = this.head, length = this._length, count = 1, message = { failure: 'Failure: non-existent node in this list.' };
            // 1st use-case: an invalid position
            if (length === 0 || position < 1 || position > length) {
                throw new Error(message.failure);
            }
            // 2nd use-case: a valid position
            while (count < position) {
                currentNode = currentNode.next;
                count++;
            }
            return currentNode;
        };
        this.remove = function (position) {
            var currentNode = this.head, length = this._length, count = 0, message = { failure: 'Failure: non-existent node in this list.' }, beforeNodeToDelete = null, nodeToDelete = null, deletedNode = null;
            // 1st use-case: an invalid position
            if (position < 0 || position > length) {
                throw new Error(message.failure);
            }
            // 2nd use-case: the first node is removed
            if (position === 1) {
                this.head = currentNode.next;
                deletedNode = currentNode;
                currentNode = null;
                this._length--;
                return deletedNode;
            }
            // 3rd use-case: any other node is removed
            while (count < position) {
                beforeNodeToDelete = currentNode;
                nodeToDelete = currentNode.next;
                count++;
            }
            beforeNodeToDelete.next = nodeToDelete.next;
            deletedNode = nodeToDelete;
            nodeToDelete = null;
            this._length--;
            return deletedNode;
        };
    }
}
exports.SinglyLinkedList = SinglyLinkedList;
;

},{}],6:[function(require,module,exports){
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

},{"howler":undefined}],7:[function(require,module,exports){
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
let maingui;
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
    maingui = new Gui_1.Gui(stage, colors, SOUNDLIB);
    //start rendering engine
    gameLoop();
    console.log("started gameLoop");
};
let gameLoop = function () {
    //loop 60 frames per second
    requestAnimationFrame(gameLoop);
    renderer.render(stage);
};
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

},{"./ColorPalettes":3,"./Gui":4,"./SoundEffects":6,"pixi.js":undefined}]},{},[7])(7)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FsZ29yaXRobS50cyIsInNyYy9CdG4udHMiLCJzcmMvQ29sb3JQYWxldHRlcy50cyIsInNyYy9HdWkudHMiLCJzcmMvU2luZ2x5TGlua2VkTGlzdC50cyIsInNyYy9Tb3VuZEVmZmVjdHMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHlEQUFzRDtBQUd0RDtJQVVFO1FBUkEsNkJBQTZCO1FBQ3JCLGVBQVUsR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7UUFDcEMsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBVSxFQUFFLENBQUMsQ0FBQyxvREFBb0Q7UUFFMUUsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQXFCbEIsVUFBSyxHQUFHO1lBQ2IsWUFBWTtZQUNaLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM3QiwrQkFBK0I7WUFDL0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLG1CQUFtQjtZQUNuQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFN0IsTUFBTSxDQUFDLElBQUksQ0FBQztRQUVkLENBQUMsQ0FBQTtRQUdPLGVBQVUsR0FBRztZQUNuQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxDQUFD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R0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFO2dCQUNsSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUNqRSxxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUV0QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLFlBQVksR0FBRyxJQUFJLFNBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFO2dCQUM3RyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUNqRSxxQkFBcUI7Z0JBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUV0QixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLGNBQWMsR0FBRyxJQUFJLFNBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFO2dCQUNuSCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFD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LENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUUzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVyRSxZQUFZO1lBQ1osSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUUzQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFOUMsZUFBZTtZQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFFM0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxD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QUM7SUFFdkQsOENBQThDO0lBQzlDLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUV6QixxQ0FBcUM7SUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpDLHlCQUF5QjtJQUN6QixRQUFRLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUVoRCxTQUFTLEVBQUUsQ0FBQztBQUNkLENBQUMsQ0FBQTtBQUVELFlBQVk7QUFDWixJQUFJLFNBQVMsR0FBRztJQUNaLHlCQUF5QjtJQUN6QixPQUFPLEdBQUcsSUFBSSxTQUFHLENBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUM1Qyx3QkFBd0I7SUFDeEIsUUFBUSxFQUFFLENBQUM7SUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDO0FBQ0YsSUFBSSxRQUFRLEdBQUc7SUFDYiwyQkFBMkI7SUFDM0IscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUE7QUFHRCwyQkFBMkI7QUFDM0IsMkNBQTJDO0FBQzNDLDBCQUEwQjtBQUMxQixJQUFJO0FBQ0osMENBQTBDO0FBQzFDLDRDQUE0QztBQUM1QywrQkFBK0I7QUFDL0IsZ0NBQWdDO0FBQ2hDLDREQUE0RDtBQUM1RCx3Q0FBd0M7QUFDeEMseUNBQXlDO0FBQ3pDLG1DQUFtQztBQUNuQywwQkFBMEI7QUFDMUIsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBTaW5nbHlMaW5rZWRMaXN0IH0gZnJvbSBcIi4vU2luZ2x5TGlua2VkTGlzdFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBBbGdvcml0aG0ge1xuXG4gIC8vZGVmaW5lIHNpemUgb2YgY2hlY2tlcmJvYXJkXG4gIHByaXZhdGUgc2luZ2x5bGlzdCA9IG5ldyBTaW5nbHlMaW5rZWRMaXN0KCk7XG4gIHByaXZhdGUgX3Jvd3M6bnVtYmVyID0gMTA7XG4gIHByaXZhdGUgX2NvbHM6bnVtYmVyID0gMTA7XG4gIHByaXZhdGUgX3NwYWNpbmc6bnVtYmVyID0gMTA7IC8vcm93IHZzIGNvbCA9PiByb3cud2lkdGggKiByb3dzOyBtaW46MnB4IG1heDogNTBweDtcblxuICBwcml2YXRlIGdyaWQ6T2JqZWN0ID0ge307XG5cbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG5cbiAgZ2V0IHJvd3MoKTpudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuX3Jvd3M7XG4gIH1cbiAgc2V0IHJvd3MobmV3dmFsOm51bWJlcikge1xuICAgICAgdGhpcy5fcm93cyA9IG5ld3ZhbDtcbiAgICAgIGNvbnNvbGUubG9nKFwicm93IHVwZGF0ZWQ6IFwiICsgdGhpcy5fcm93cyk7XG4gIH1cbiAgZ2V0IGNvbHMoKTpudW1iZXIge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbHM7XG4gIH1cbiAgc2V0IGNvbHMobmV3dmFsOm51bWJlcikge1xuICAgICAgdGhpcy5fY29scyA9IG5ld3ZhbDtcbiAgICAgIGNvbnNvbGUubG9nKFwiY29scyB1cGRhdGVkOiBcIiArIHRoaXMuX2NvbHMpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0ID0gZnVuY3Rpb24oKXtcbiAgICAvL2NyZWF0ZUdyaWRcbiAgICB2YXIgZ3JpZCA9IHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgIC8vcGljayByYW5kb20gc3RhcnRpbmcgcG9zaXRpb25cbiAgICB2YXIgcmFuZG9tU3RhcnQgPSB0aGlzLnJhbmRvbVN0YXJ0KCk7XG4gICAgLy9idWlsZCBsaW5rZWQgbGlzdFxuICAgIHZhciBoZWFkID0gZ3JpZFtyYW5kb21TdGFydF07XG5cbiAgICByZXR1cm4gZ3JpZDtcblxuICB9XG5cblxuICBwcml2YXRlIGNyZWF0ZUdyaWQgPSBmdW5jdGlvbigpe1xuICAgIGxldCBhbW91bnQgPSB0aGlzLl9yb3dzICogdGhpcy5fY29scztcbiAgICBsZXQgZGlyZWN0aW9uID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjQpO1xuICAgIGxldCBncmlkOiBvYmplY3RbXSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW1vdW50OyBpKyspIHtcbiAgICAgIHZhciBjZWxsID0ge3g6KGkgJSB0aGlzLl9jb2xzKSwgeTogTWF0aC5mbG9vcihpIC8gdGhpcy5fcm93cyksIGRpcmVjdGlvbjpkaXJlY3Rpb259O1xuICAgICAgZ3JpZC5wdXNoKGNlbGwpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuICBwdWJsaWMgcmFuZG9tU3RhcnQgPSBmdW5jdGlvbigpe1xuICAgIGxldCBhbW91bnQgPSB0aGlzLl9yb3dzICogdGhpcy5fY29scztcbiAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmFtb3VudCk7XG4gIH1cbiAgLy8gcHJpdmF0ZSByYW5WZWN0b3IgPSBmdW5jdGlvbigtMSwgMSkge1xuICAvLyAgIGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgLy8gICBsZXQgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIC8vICAgcmV0dXJuIHt4LHl9OyAoMCwxKVxuICAvLyB9XG4gIHByaXZhdGUgTm9kZSA9IGZ1bmN0aW9uKGRhdGEsIG5leHQpIHtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMubmV4dCA9IG5leHQ7XG4gIH1cbiAgcHJpdmF0ZSBTaW5nbHlMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fbGVuZ3RoID0gMDtcbiAgICB0aGlzLmhlYWQgPSBudWxsO1xuICB9XG5cblxuXG5cblxuLy9tb3ZlIHRvIGd1aVxuLy8gLy9kcmF3IHNxdWFyZXNcbi8vIHByaXZhdGUgZHJhd1NxdWFyZXMgPSBmdW5jdGlvbihzdGFnZSwgbG9hZGVyKXtcbi8vIGxldCB0b3RhbFNxdWFyZXM6bnVtYmVyID0gY29scypyb3dzO1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IHRvdGFsU3F1YXJlczsgaSsrKSB7XG4vLyAgICAgLy9jcmVhdGUgaW5zdGFuY2Ugb2Ygc3F1YXJlXG4vLyAgICAgLy9jYWxjdWxhdGUgeCwgeVxuLy8gICAgIGxldCB4ID0gKGkgJSBjb2xzKSAqIHNwYWNpbmc7XG4vLyAgICAgbGV0IHkgPSBNYXRoLmZsb29yKGkgLyByb3dzKSAqIHNwYWNpbmc7XG4vLyAgICAgLy88c3F1YXJlc2NvbnRhaW5lciA9PiBzcXVhcmVjbGFzcyBuZXcgaW5zdGFuY2UgYW5kIHBvc2l0aW9uKHg6bnVtYmVyLCB5Om51bWJlcik+XG4vLyAgIH1cbi8vIH1cblxuLy9yYW5kb21pemUgZGlyZWN0aW9uIG9uIHNxdWFyZXNcbi8vIC8vc3RhcnQgY2hlY2tlciBhdCByYW5kb20gaW5zZXJ0aW9uIHNxdWFyZVxuLy8gbGV0IHN0YXJ0eCA9IE1hdGgucmFuZG9tKCkqcm93cztcbi8vIGxldCBzdGFydHkgPSBNYXRoLnJhbmRvbSgpKmNvbHM7XG4vLzxzcXVhcmVzY29udGFpbmVyID0+IHBsYXllcmNsYXNzIC0gcG9zaXRpb24gcGxheWVyPlxuXG4vL21vdmUgMSB0dXJuXG4vL2dldERpcmVjdGlvbiBmcm9tIGN1cnJlbnQgc3F1YXJlXG4vL2FuaW1hdGUgdG8gbmV3IHNxdWFyZVxuXG4vL2NoZWNrIGJvdW5kcyAoY29uZGl0aW9uMSlcbi8vIGlmKHggPCAwICYmIHggPiBjb2xzICYmIHkgPCAwICYmIHkgPiByb3dzKXtcbi8vICAgY29uc29sZS5sb2coXCJ5b3UgYXJlIG91dHNpZGUgYm91bmRzXCIpO1xuLy8gfVxuXG4vL2NoZWNrIGN5Y2xlIChjb25kaXRpb24yKVxuXG4vL2hpc3RvcnkgYXJyYXlcbi8vIGxldCBoaXN0b3J5ID0gbmV3IEFycmF5KCk7XG4vL1xuLy8gLy9jb29yZGluYXRlIG9iamVjdCAoaW50ZXJmYWNlPylcbi8vIGxldCBjb29yZGluYXRlID0gZnVuY3Rpb24oeCwgeSl7XG4vLyAgIHRoaXMueCA9IHg7XG4vLyAgIHRoaXMueSA9IHk7XG4vLyB9XG5cbi8vY2hlY2sgZm9yIHJlcGVhdFxuLy8gZnVuY3Rpb24gY2hlY2tBbmRBZGQoeCx5KSB7XG4vLyAgIHZhciB0ZXN0ID0gbmV3IGNvb3JkaW5hdGUoeCx5KTtcbi8vXG4vLyAgIHZhciBmb3VuZCA9IGhpc3Rvcnkuc29tZShmdW5jdGlvbiAoZWwpIHtcbi8vICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShlbCkgPT09IEpTT04uc3RyaW5naWZ5KHRlc3QpO1xuLy8gICB9KTtcbi8vICAgaWYgKCFmb3VuZCkge1xuLy8gICAgIGNvbnNvbGUubG9nKFwibm90IGZvdW5kXCIpO1xuLy8gICAgIGhpc3RvcnkucHVzaCh0ZXN0KTtcbi8vICAgfWVsc2V7XG4vLyAgICAgY29uc29sZS5sb2coXCJmb3VuZFwiKTtcbi8vICAgICAvLyBjb25kaXRpb24gMiBtZXQgZW5kIC8vXG4vLyAgICAgPHNxdWFyZXNjb250YWluZXIgPSBwbGF5ZXJjbGFzcyBkZXN0cm95PlxuLy8gICAgIDxzcXVhcmVzY29udGFpbmVyID0gc3F1YXJlIHR1cm4gcmVkPlxuLy8gICB9XG4vLyB9XG5cbi8vc3F1YXJlIGNsYXNzXG4vL3Bvc3NpYmxlIGRpcmVjdGlvbnNcblxuLy8gcHJpdmF0ZSBvcHRpb25zOnN0cmluZ3M7XG4vLyBjb25zdHJ1Y3RvciA9IHtcbi8vICAgb3B0aW9ucyA9IFsndXAnLCdyaWdodCcsJ2Rvd24nLCdsZWZ0J107XG4vLyB9XG4vL1xuLy8gbGV0IHNldFJhbmRvbURpcmVjdGlvbiA9IGZ1bmN0aW9uKCl7XG4vLyAgIC8vc2V0IHJhbmRvbSA0IHZhbHVlc1xuLy8gICBNYXRoLnJhbmRvbSgpKm9wdGlvbnMubGVuZ3RoO1xuLy8gfVxuLy8gbGV0IGNoYW5nZURpc3BsYXkgPSBmdW5jdGlvbihvcHRpb246bnVtYmVyKXtcbi8vICAgc3dpdGNoKG9wdGlvbil7XG4vLyAgICAgY2FzZSAwOlxuLy8gICAgICAgLy9zd2FwIHRleHR1cmVcbi8vICAgICBicmVhaztcbi8vICAgICBjYXNlIDE6XG4vLyAgICAgICAvL3N3YXAgdGV4dHVyZVxuLy8gICAgIGJyZWFrO1xuLy8gICAgIGNhc2UgMjpcbi8vICAgICAgIC8vc3dhcCB0ZXh0dXJlXG4vLyAgICAgYnJlYWs7XG4vLyAgICAgY2FzZSAzOlxuLy8gICAgICAgLy9zd2FwIHRleHR1cmVcbi8vICAgICBicmVhaztcbi8vICAgICBkZWZhdWx0OlxuLy8gICAgICAgY29uc29sZS5sb2coXCJubyB2YWxpZCBjYXNlXCIpO1xuLy8gICAgIGJyZWFrO1xuLy8gICB9XG4vLyB9XG59XG4iLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBCdG4ge1xuICAgIHByaXZhdGUgYnV0dG9uT2JqZWN0OiBPYmplY3QgPSB7fTtcbiAgICBwcml2YXRlIGJ0bmtpbmQ6IFN0cmluZztcbiAgICBwcml2YXRlIGNhbGxiYWNrOkZ1bmN0aW9uO1xuICAgIHByaXZhdGUgc3RhZ2U6UElYSS5Db250YWluZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihtYWluU3RhZ2U6YW55LCByZXNvdXJjZXM6YW55LCBidG5raW5kOiBzdHJpbmcsIG5hbWU6c3RyaW5nLCB4cG9zOiBudW1iZXIsIHlwb3M6IG51bWJlciwgY2FsbGJrOkZ1bmN0aW9uKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBzb21lIHRleHR1cmVzIGZyb20gYW4gaW1hZ2UgcGF0aFxuICAgICAgICB0aGlzLnN0YWdlID0gbWFpblN0YWdlO1xuICAgICAgICB0aGlzLmJ0bmtpbmQgPSBidG5raW5kO1xuICAgICAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJrO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYnRua2luZDogXCIgKyB0aGlzLmJ0bmtpbmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICAgICAgLy8gdmFyIHRleHR1cmVCdXR0b24gPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKCdyZXF1aXJlZC9hc3NldHMvYnV0dG9uLnBuZycpO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcInVwXCJdID0gcmVzb3VyY2VzW2J0bmtpbmQgKyAnX3VwJ10udGV4dHVyZTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwib3ZlclwiXSA9IHJlc291cmNlc1tidG5raW5kICsgXCJfb3ZlclwiXS50ZXh0dXJlO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJoaXRcIl0gPSByZXNvdXJjZXNbYnRua2luZCArIFwiX2hpdFwiXS50ZXh0dXJlO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlc1tidG5raW5kICsgXCJfdXBcIl0udGV4dHVyZSk7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0uYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdLnggPSB4cG9zO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdLnkgPSB5cG9zO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGJ1dHRvbiBpbnRlcmFjdGl2ZS4uLlxuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXS5idXR0b25Nb2RlID0gdHJ1ZTtcblxuICAgICAgICAvLyBNb3VzZSAmIHRvdWNoIGV2ZW50cyBhcmUgbm9ybWFsaXplZCBpbnRvXG4gICAgICAgIC8vIHRoZSBwb2ludGVyKiBldmVudHMgZm9yIGhhbmRsaW5nIGRpZmZlcmVudFxuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJkb3duJywgdGhpcy5vbkJ1dHRvbkRvd24uYmluZCh0aGlzLCBcInRleHR1cmVCdXR0b25cIiwgdGhpcy5jYWxsYmFjaykpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25CdXR0b25VcC5iaW5kKHRoaXMsIFwidGV4dHVyZUJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIHRoaXMub25CdXR0b25VcC5iaW5kKHRoaXMsIFwidGV4dHVyZUJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm92ZXInLCB0aGlzLm9uQnV0dG9uT3Zlci5iaW5kKHRoaXMsIFwidGV4dHVyZUJ1dHRvblwiKSlcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm91dCcsIHRoaXMub25CdXR0b25PdXQuYmluZCh0aGlzLCBcInRleHR1cmVCdXR0b25cIikpO1xuXG4gICAgICAgIC8vIFVzZSBtb3VzZS1vbmx5IGV2ZW50c1xuICAgICAgICAvLyAub24oJ21vdXNlZG93bicsIG9uQnV0dG9uRG93bilcbiAgICAgICAgLy8gLm9uKCdtb3VzZXVwJywgb25CdXR0b25VcClcbiAgICAgICAgLy8gLm9uKCdtb3VzZXVwb3V0c2lkZScsIG9uQnV0dG9uVXApXG4gICAgICAgIC8vIC5vbignbW91c2VvdmVyJywgb25CdXR0b25PdmVyKVxuICAgICAgICAvLyAub24oJ21vdXNlb3V0Jywgb25CdXR0b25PdXQpXG5cbiAgICAgICAgLy8gVXNlIHRvdWNoLW9ubHkgZXZlbnRzXG4gICAgICAgIC8vIC5vbigndG91Y2hzdGFydCcsIG9uQnV0dG9uRG93bilcbiAgICAgICAgLy8gLm9uKCd0b3VjaGVuZCcsIG9uQnV0dG9uVXApXG4gICAgICAgIC8vIC5vbigndG91Y2hlbmRvdXRzaWRlJywgb25CdXR0b25VcClcblxuICAgICAgICAvLyBhZGQgaXQgdG8gdGhlIHN0YWdlXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXSk7XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25Eb3duID0gZnVuY3Rpb24obWUsY2FsbGJhY2spOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvbkRvd25cIik7XG4gICAgICAgIHRoaXMuaXNkb3duID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl9oaXRcIl07XG4gICAgICAgIHRoaXMuYWxwaGEgPSAxO1xuICAgICAgICBjYWxsYmFjaygpO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uVXAgPSBmdW5jdGlvbihtZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uVXBcIik7XG4gICAgICAgIHRoaXMuaXNkb3duID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzT3Zlcikge1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl9vdmVyXCJdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy5idXR0b25PYmplY3RbbWUgKyBcIl91cFwiXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uT3ZlciA9IGZ1bmN0aW9uKG1lKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25PdmVyXCIpO1xuICAgICAgICB0aGlzLmlzT3ZlciA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLmlzZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfb3ZlclwiXTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvbk91dCA9IGZ1bmN0aW9uKG1lKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25PdXRcIik7XG4gICAgICAgIHRoaXMuaXNPdmVyID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzZG93bikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfdXBcIl07XG4gICAgfVxufVxuIiwiaW1wb3J0IHtJUGFsZXR0ZX0gZnJvbSAnLi9pbnRlcmZhY2VzL0lQYWxldHRlJztcblxuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZXMge1xuICAgIHByaXZhdGUgcGFsZXR0ZUluZGV4OiAwO1xuICAgIHB1YmxpYyBwYWxldHRlczogbnVsbDtcbiAgICBwcml2YXRlIGFjdGl2ZVBhbGV0dGU6IG51bGw7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgIHB1YmxpYyBsb2FkQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcik6UHJvbWlzZTxhbnk+IHtcbiAgICAgIHRoaXMucGFsZXR0ZUluZGV4ID0gcGluZGV4O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSAnc3JjL2NvbG9ycy5qc29uJztcbiAgICAgICAgICAgIGxldCB4aHI6IGFueSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgICB2YXIgZGF0YTogYW55O1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9XG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MhXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVBhbGV0dGU6SVBhbGV0dGUgPSBkYXRhLmNvbG9yc1twaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYWN0aXZlUGFsZXR0ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSByZWFjaGVkIG91ciB0YXJnZXQgc2VydmVyLCBidXQgaXQgcmV0dXJuZWQgYW4gZXJyb3JcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCAqIGFzIFBJWEkgZnJvbSBcInBpeGkuanNcIjtcbmltcG9ydCB7IEJ0biB9IGZyb20gXCIuL0J0blwiO1xuaW1wb3J0IHsgQWxnb3JpdGhtIH0gZnJvbSBcIi4vQWxnb3JpdGhtXCI7XG5cbmV4cG9ydCBjbGFzcyBHdWkge1xuICAgIHByaXZhdGUgc3RhZ2U6IFBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgYWxnb3JpdGhtOiBBbGdvcml0aG0gPSBuZXcgQWxnb3JpdGhtO1xuICAgIHByaXZhdGUgY29sb3JzOiBhbnk7XG4gICAgcHJpdmF0ZSBzb3VuZHM6IGFueTtcblxuICAgIC8vdGV4dCBlbGVtZW50c1xuICAgIHByaXZhdGUgc3RhdHVzOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSByb3dzVGl0bGU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIHJvd3NWYWx1ZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgY29sc1RpdGxlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSBjb2xzVmFsdWU6IFBJWEkuVGV4dDtcblxuICAgIHByaXZhdGUgbGluZTogUElYSS5HcmFwaGljcztcbiAgICBwcml2YXRlIGxvYWRlciA9IG5ldyBQSVhJLmxvYWRlcnMuTG9hZGVyKCk7XG4gICAgcHJpdmF0ZSBzcHJpdGVzOiBhbnkgPSB7fTtcblxuXG4gICAgcHJpdmF0ZSBzcGFjaW5nOiBudW1iZXIgPSA1MDtcbiAgICBwcml2YXRlIHJlc291cmNlczogYW55O1xuICAgIHByaXZhdGUgbWFya3M6IGFueSA9IFtdO1xuICAgIHByaXZhdGUgcGxheWVyOiBQSVhJLlNwcml0ZTtcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTogUElYSS5Db250YWluZXIsIG1haW5Db2xvcnM6IGFueSwgbWFpblNvdW5kczogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG4gICAgICAgIHRoaXMuY29sb3JzID0gbWFpbkNvbG9ycztcbiAgICAgICAgdGhpcy5zb3VuZHMgPSBtYWluU291bmRzO1xuICAgICAgICB0aGlzLmxvYWRJbWFnZXMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBsb2FkSW1hZ2VzID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vbG9hZCBpbWFnZXMnXG4gICAgICAgIHRoaXMubG9hZGVyID0gUElYSS5sb2FkZXJcbiAgICAgICAgICAgIC5hZGQoJ3BsYXllcl9ibHVlJywgJ3NyYy9ncmFwaGljcy9wbGF5ZXJfYmx1ZS5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnbWFya19kb3QnLCAnc3JjL2dyYXBoaWNzL21hcmtfZG90LnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX3VwJywgJ3NyYy9ncmFwaGljcy9hcnJvd3VwX3VwLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX292ZXInLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfb3Zlci5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3d1cF9oaXQnLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfaGl0LnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd2Rvd25fdXAnLCAnc3JjL2dyYXBoaWNzL2Fycm93ZG93bl91cC5wbmcnKVxuICAgICAgICAgICAgLmFkZCgnYXJyb3dkb3duX292ZXInLCAnc3JjL2dyYXBoaWNzL2Fycm93ZG93bl9vdmVyLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd2Rvd25faGl0JywgJ3NyYy9ncmFwaGljcy9hcnJvd2Rvd25faGl0LnBuZycpXG4gICAgICAgICAgICAub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24obG9hZGVyLCByZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucGxheWVyX2JsdWUgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLnBsYXllcl9ibHVlLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5tYXJrX2RvdCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMubWFya19kb3QudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHN1cF91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc3VwX292ZXIgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfb3Zlci50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc3VwX2hpdCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc2Rvd25fdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc2Rvd25fb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLmNvbHNkb3duX2hpdCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzdXBfdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3N1cF9vdmVyID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3N1cF9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3Nkb3duX3VwID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd2Rvd25fdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3Nkb3duX292ZXIgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl9vdmVyLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5yb3dzZG93bl9oaXQgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZENvbXBsZXRlZCgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkZXIubG9hZCgpO1xuICAgIH1cbiAgICBwcml2YXRlIGNvb3JkaW5hdGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIG9uTG9hZENvbXBsZXRlZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQodGhpcy5hbGdvcml0aG0uY29scywgdGhpcy5hbGdvcml0aG0ucm93cyk7XG4gICAgICAgIHRoaXMuY3JlYXRlTGluZSgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVRleHQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zKCk7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlQnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcm93c0J1dHRvblVwID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIFwiYXJyb3d1cFwiLCBcInJvd3N1cFwiLCA0MDUsIHdpbmRvdy5pbm5lckhlaWdodCAtIDQ1LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuYWxnb3JpdGhtLnJvd3MrKztcbiAgICAgICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5yb3dzLnRvU3RyaW5nKCksIDAsIDApXG4gICAgICAgICAgICAvL3VwZGF0ZSBib2FyZC9tYXRyaXhcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHZhciByb3dzQnV0dG9uRG93biA9IG5ldyBCdG4odGhpcy5zdGFnZSwgdGhpcy5sb2FkZXIucmVzb3VyY2VzLCBcImFycm93ZG93blwiLCBcInJvd2Rvd25cIiwgNDAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSAzMCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmFsZ29yaXRobS5yb3dzLS07XG4gICAgICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NWYWx1ZSwgdGhpcy5hbGdvcml0aG0ucm93cy50b1N0cmluZygpLCAwLCAwKVxuICAgICAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcblxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB2YXIgY29sc0J1dHRvblVwID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIFwiYXJyb3d1cFwiLCBcImNvbHN1cFwiLCA2MDUsIHdpbmRvdy5pbm5lckhlaWdodCAtIDQ1LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuYWxnb3JpdGhtLmNvbHMrKztcbiAgICAgICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5jb2xzLnRvU3RyaW5nKCksIDAsIDApXG4gICAgICAgICAgICAvL3VwZGF0ZSBib2FyZC9tYXRyaXhcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHZhciBjb2xzQnV0dG9uRG93biA9IG5ldyBCdG4odGhpcy5zdGFnZSwgdGhpcy5sb2FkZXIucmVzb3VyY2VzLCBcImFycm93ZG93blwiLCBcImNvbHNkb3duXCIsIDYwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gMzAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5hbGdvcml0aG0uY29scy0tO1xuICAgICAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuYWxnb3JpdGhtLmNvbHMudG9TdHJpbmcoKSwgMCwgMClcbiAgICAgICAgICAgIC8vdXBkYXRlIGJvYXJkL21hdHJpeFxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcblxuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVBsYXllciA9IGZ1bmN0aW9uKCk6IHZvaWQge1xuICAgICAgICAvL3BsYXllclxuICAgICAgICB0aGlzLnBsYXllciA9IHRoaXMuc3ByaXRlcy5wbGF5ZXJfYmx1ZTtcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnBsYXllcik7XG4gICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uLnggPSA1MDA7XG4gICAgICAgIHRoaXMucGxheWVyLnBvc2l0aW9uLnkgPSA1MDA7XG4gICAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJzdGFydFwiKTtcblxuICAgIH1cbiAgICBwcml2YXRlIGlzRXZlbiA9IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgcmV0dXJuIG4gJSAyID09IDA7XG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlR3JpZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZ3JpZCA9IHRoaXMuYWxnb3JpdGhtLnJlc2V0KCk7XG5cbiAgICAgICAgLy9jcmVhdGUgY29udGFpbmVyIGZvciBncmlkXG4gICAgICAgIHZhciBzcXVhcmVjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgdmFyIG1hcmtjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcblxuICAgICAgICAvL21ha2UgbWFya3NcbiAgICAgICAgLy8gdGhpcy5zdGFnZS5hZGRDaGlsZChtYXJrY29udGFpbmVyKTtcbiAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBncmlkLmxlbmd0aCAqIDQ7IGkrKykge1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgdmFyIG1hcmsgPSBuZXcgUElYSS5TcHJpdGUodGhpcy5sb2FkZXIucmVzb3VyY2VzLm1hcmtfZG90LnRleHR1cmUpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgbWFya2NvbnRhaW5lci5hZGRDaGlsZChtYXJrKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIG1hcmsuYW5jaG9yLnNldCgwLjUpO1xuICAgICAgICAvLyAgICAgbWFyay54ID0gKGkgJSAodGhpcy5hbGdvcml0aG0uY29scyAqIDQpKSAqIHRoaXMuc3BhY2luZzsvLyhpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZztcbiAgICAgICAgLy8gICAgIG1hcmsueSA9IE1hdGguZmxvb3IoaSAvICh0aGlzLmFsZ29yaXRobS5yb3dzICogNCkpICogdGhpcy5zcGFjaW5nOyAvLyhpICUgdGhpcy5jb2xzKSAqIHRoaXMuc3BhY2luZztcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIG1hcmsuc2NhbGUueCA9IDE7XG4gICAgICAgIC8vICAgICBtYXJrLnNjYWxlLnkgPSAxO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy9tYWtlIHNxdWFyZXNcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZChzcXVhcmVjb250YWluZXIpO1xuICAgICAgICAvL3VzaW5nIGdyYXBoaWNzIGZvciBzcXVhcmVzXG4gICAgICAgIHZhciBzcXVhcmVzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcbiAgICAgICAgbGV0IHNxdWFyZWNvbG9yOiBudW1iZXI7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gc2V0IGEgZmlsbCBhbmQgbGluZSBzdHlsZVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFdmVuKE1hdGguZmxvb3IoaSAvIHRoaXMuYWxnb3JpdGhtLnJvd3MpKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXZlbihpKSkge1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmVjb2xvciA9IHRoaXMuY29sb3JzLnNxdWFyZWRhcmtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmVjb2xvciA9IHRoaXMuY29sb3JzLnNxdWFyZWxpZ2h0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V2ZW4oaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlY29sb3IgPSB0aGlzLmNvbG9ycy5zcXVhcmVsaWdodFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZWNvbG9yID0gdGhpcy5jb2xvcnMuc3F1YXJlZGFya1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxdWFyZXMuYmVnaW5GaWxsKHNxdWFyZWNvbG9yLCAwLjUpO1xuICAgICAgICAgICAgc3F1YXJlcy5saW5lU3R5bGUoMSwgdGhpcy5jb2xvcnMubGluZXMsIDEpO1xuICAgICAgICAgICAgdmFyIHggPSAoaSAlIHRoaXMuYWxnb3JpdGhtLmNvbHMpICogdGhpcy5zcGFjaW5nO1xuICAgICAgICAgICAgdmFyIHkgPSBNYXRoLmZsb29yKGkgLyB0aGlzLmFsZ29yaXRobS5yb3dzKSAqIHRoaXMuc3BhY2luZztcbiAgICAgICAgICAgIHNxdWFyZXMuZHJhd1JlY3QoeCwgeSwgdGhpcy5zcGFjaW5nLCB0aGlzLnNwYWNpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHNxdWFyZWNvbnRhaW5lci5hZGRDaGlsZChzcXVhcmVzKTtcblxuICAgICAgICAvLyBDZW50ZXIgb24gdGhlIHNjcmVlblxuXG4gICAgICAgIG1hcmtjb250YWluZXIueCA9IDA7Ly8od2luZG93LmlubmVyV2lkdGgpIC8gMjtcbiAgICAgICAgbWFya2NvbnRhaW5lci55ID0gMDsvLyh3aW5kb3cuaW5uZXJIZWlnaHQpIC8gMjtcbiAgICAgICAgLy8gQ2VudGVyIG9uIHRoZSBzY3JlZW5cblxuICAgICAgICBzcXVhcmVjb250YWluZXIueCA9ICh3aW5kb3cuaW5uZXJXaWR0aCAtIHNxdWFyZWNvbnRhaW5lci53aWR0aCkgLyAyO1xuICAgICAgICBzcXVhcmVjb250YWluZXIueSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSBzcXVhcmVjb250YWluZXIuaGVpZ2h0KSAvIDI7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVMaW5lID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMubGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG5cbiAgICAgICAgLy8gc2V0IGEgZmlsbCBhbmQgbGluZSBzdHlsZVxuICAgICAgICB0aGlzLmxpbmUubGluZVN0eWxlKDAuNSwgdGhpcy5jb2xvcnMubGluZSwgMC41KTtcblxuICAgICAgICAvLyBkcmF3IGEgc2hhcGVcbiAgICAgICAgdGhpcy5saW5lLm1vdmVUbygxMDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDcwKTtcbiAgICAgICAgdGhpcy5saW5lLmxpbmVUbyh3aW5kb3cuaW5uZXJXaWR0aCAtIDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5saW5lKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVUZXh0ID0gZnVuY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIC8vdGV4dCB0ZXN0XG4gICAgICAgIGxldCBzdHlsZSA9IG5ldyBQSVhJLlRleHRTdHlsZSh7XG4gICAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmZvbnQsXG4gICAgICAgICAgICAvLyBzdHJva2U6ICcjNGExODUwJyxcbiAgICAgICAgICAgIC8vIHN0cm9rZVRoaWNrbmVzczogNSxcbiAgICAgICAgICAgIGRyb3BTaGFkb3c6IHRydWUsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgaGVhZGxpbmUgPSBuZXcgUElYSS5UZXh0U3R5bGUoe1xuICAgICAgICAgICAgZm9udEZhbWlseTogJ0hlbHZldGljYScsXG4gICAgICAgICAgICBmb250U2l6ZTogMTgsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmaWxsOiB0aGlzLmNvbG9ycy5oZWFkbGluZSxcbiAgICAgICAgICAgIC8vIHN0cm9rZTogJyM0YTE4NTAnLFxuICAgICAgICAgICAgLy8gc3Ryb2tlVGhpY2tuZXNzOiA1LFxuICAgICAgICAgICAgZHJvcFNoYWRvdzogZmFsc2UsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93Q29sb3I6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dCbHVyOiA0LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0FuZ2xlOiBNYXRoLlBJIC8gNixcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dEaXN0YW5jZTogNixcbiAgICAgICAgICAgIHdvcmRXcmFwOiB0cnVlLFxuICAgICAgICAgICAgd29yZFdyYXBXaWR0aDogNDQwXG4gICAgICAgIH0pO1xuICAgICAgICAvL3N0YXR1c1xuICAgICAgICB0aGlzLnN0YXR1cyA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5zdGF0dXMueCA9IDExMDtcbiAgICAgICAgdGhpcy5zdGF0dXMueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5zdGF0dXMpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnN0YXR1cywgXCJJbml0aWFsaXppbmcuLi5cIiwgMCwgMjAwMCk7XG5cbiAgICAgICAgLy9yb3dzIHRpdGxlXG4gICAgICAgIHRoaXMucm93c1RpdGxlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgc3R5bGUpO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS54ID0gMzAwO1xuICAgICAgICB0aGlzLnJvd3NUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvd3NUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1RpdGxlLCBcInJvd3M6XCIsIDAsIDM1MDApO1xuXG4gICAgICAgIC8vcm93cyB2YWx1ZVxuICAgICAgICB0aGlzLnJvd3NWYWx1ZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUueCA9IDM1MDtcbiAgICAgICAgdGhpcy5yb3dzVmFsdWUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb3dzVmFsdWUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLnJvd3NWYWx1ZSwgdGhpcy5hbGdvcml0aG0ucm93cy50b1N0cmluZygpLCAwLCA0MDAwKTtcblxuICAgICAgICAvL2NvbHMgdGl0bGVcbiAgICAgICAgdGhpcy5jb2xzVGl0bGUgPSBuZXcgUElYSS5UZXh0KCcuLi46Jywgc3R5bGUpO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS54ID0gNTAwO1xuICAgICAgICB0aGlzLmNvbHNUaXRsZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmNvbHNUaXRsZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuY29sc1RpdGxlLCAnY29sczonLCAwLCA0NTAwKTtcblxuICAgICAgICAvLyAvL2NvbHMgdmFsdWVcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBoZWFkbGluZSk7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnggPSA1NTA7XG4gICAgICAgIHRoaXMuY29sc1ZhbHVlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY29sc1ZhbHVlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuYWxnb3JpdGhtLmNvbHMudG9TdHJpbmcoKSwgMCwgNTAwMCk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuc3RhdHVzLCBcIlJlYWR5XCIsIDAsIDYwMDApO1xuXG4gICAgfVxuICAgIHByaXZhdGUgdHlwZU1lID0gZnVuY3Rpb24odGV4dE9iajogUElYSS5UZXh0LCBtZXNzYWdlOiBzdHJpbmcsIG1lc3NhZ2VMZW5ndGg6IG51bWJlciwgZGVsYXk6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlICsgJyB8ICcgKyBtZXNzYWdlTGVuZ3RoKTtcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzdGFydGluZyB0eXBlXCIpO1xuICAgICAgICAgICAgdGV4dE9iai50ZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIG1lc3NhZ2VMZW5ndGggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9sb29wIHRocm91Z2ggdHlwaW5nXG4gICAgICAgIGxldCBuZXdTdHJpbmc6IHN0cmluZyA9IG1lc3NhZ2Uuc3Vic3RyaW5nKDAsIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICB0ZXh0T2JqLnRleHQgPSBuZXdTdHJpbmc7XG4gICAgICAgIGlmIChtZXNzYWdlTGVuZ3RoID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc291bmRzLnBsYXkoXCJrZXlwcmVzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhuZXdTdHJpbmcpO1xuICAgICAgICAvL2luY3JlbWVudCBsZW5ndGggb2YgbWVzc2FnZVxuICAgICAgICBtZXNzYWdlTGVuZ3RoKys7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPCBtZXNzYWdlLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQodGhpcy50eXBlTWUuYmluZCh0aGlzLCB0ZXh0T2JqLCBtZXNzYWdlLCBtZXNzYWdlTGVuZ3RoLCA1MCksIGRlbGF5KTtcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQodGhpcy5kZWNsYXJlLmJpbmQodGhpcyksIDEwMDApO1xuICAgICAgICB9XG5cbiAgICB9XG59XG4iLCIvL3NvdXJjZXNcbi8vaHR0cHM6Ly9jb2RlLnR1dHNwbHVzLmNvbS9hcnRpY2xlcy9kYXRhLXN0cnVjdHVyZXMtd2l0aC1qYXZhc2NyaXB0LXNpbmdseS1saW5rZWQtbGlzdC1hbmQtZG91Ymx5LWxpbmtlZC1saXN0LS1jbXMtMjMzOTJcbi8vaHR0cDovL3RlY2hpZW1lLmluL2ZpbmRpbmctbG9vcC1pbi1saW5rZWQtbGlzdC9cblxuLy9BIFNpbmdseS1MaW5rZWQgTGlzdFxuLy9JbiBjb21wdXRlciBzY2llbmNlLCBhIHNpbmdseS1saW5rZWQgbGlzdCBpcyBhIGRhdGEgc3RydWN0dXJlXG4vL3RoYXQgaG9sZHMgYSBzZXF1ZW5jZSBvZiBsaW5rZWQgbm9kZXMuIEVhY2ggbm9kZSwgaW4gdHVybiwgY29udGFpbnMgZGF0YSBhbmQgYSBwb2ludGVyLCB3aGljaCBjYW4gcG9pbnQgdG8gYW5vdGhlciBub2RlLlxuXG5leHBvcnQgY2xhc3MgU2luZ2x5TGlua2VkTGlzdCB7XG4gIGNvbnN0cnVjdG9yKCl7XG5cbiAgfVxuICAvLyBwcml2YXRlIGxpbmtlZExpc3QgPSBTaW5nbHlMaXN0O1xuICBwcml2YXRlIGhhc0N5Y2xlID0gZnVuY3Rpb24oaGVhZCl7XG4gICAgXHR2YXIgZmFzdCA9IGhlYWQ7XG4gICAgXHR2YXIgc2xvdyA9IGhlYWQ7XG4gICAgXHR3aGlsZShmYXN0IT0gbnVsbCAmJiBmYXN0Lm5leHQgIT0gbnVsbCl7XG4gICAgXHRcdGZhc3QgPSBmYXN0Lm5leHQubmV4dDtcbiAgICBcdFx0c2xvdyA9IHNsb3cubmV4dDtcbiAgICAgICAgLy9pZiBmYXN0IGFuZCBzbG93IHBvaW50ZXJzIGFyZSBtZWV0aW5nIHRoZW4gTGlua2VkTGlzdCBpcyBjeWNsaWNcbiAgICBcdFx0aWYoZmFzdCA9PSBzbG93ICl7XG4gICAgXHRcdFx0cmV0dXJuIHRydWU7XG4gICAgXHRcdH1cbiAgICBcdH1cbiAgICBcdHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIE5vZGUgPSBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5uZXh0ID0gbnVsbDtcbiAgICB9XG4gICAgcHJpdmF0ZSBTaW5nbHlMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX2xlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuaGVhZCA9IG51bGw7XG4gICAgfVxuICAgIHByaXZhdGUgYWRkID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgdGhpcy5Ob2RlKHZhbHVlKSxcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gdGhpcy5oZWFkO1xuXG4gICAgICAgIC8vIDFzdCB1c2UtY2FzZTogYW4gZW1wdHkgbGlzdFxuICAgICAgICBpZiAoIWN1cnJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBub2RlO1xuICAgICAgICAgICAgdGhpcy5fbGVuZ3RoKys7XG5cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMm5kIHVzZS1jYXNlOiBhIG5vbi1lbXB0eSBsaXN0XG4gICAgICAgIHdoaWxlIChjdXJyZW50Tm9kZS5uZXh0KSB7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50Tm9kZS5uZXh0ID0gbm9kZTtcblxuICAgICAgICB0aGlzLl9sZW5ndGgrKztcblxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBzZWFyY2hOb2RlQXQgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQsXG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLl9sZW5ndGgsXG4gICAgICAgICAgICBjb3VudCA9IDEsXG4gICAgICAgICAgICBtZXNzYWdlID0ge2ZhaWx1cmU6ICdGYWlsdXJlOiBub24tZXhpc3RlbnQgbm9kZSBpbiB0aGlzIGxpc3QuJ307XG5cbiAgICAgICAgLy8gMXN0IHVzZS1jYXNlOiBhbiBpbnZhbGlkIHBvc2l0aW9uXG4gICAgICAgIGlmIChsZW5ndGggPT09IDAgfHwgcG9zaXRpb24gPCAxIHx8IHBvc2l0aW9uID4gbGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZS5mYWlsdXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDJuZCB1c2UtY2FzZTogYSB2YWxpZCBwb3NpdGlvblxuICAgICAgICB3aGlsZSAoY291bnQgPCBwb3NpdGlvbikge1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjdXJyZW50Tm9kZTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSByZW1vdmUgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgICAgICB2YXIgY3VycmVudE5vZGUgPSB0aGlzLmhlYWQsXG4gICAgICAgICAgICBsZW5ndGggPSB0aGlzLl9sZW5ndGgsXG4gICAgICAgICAgICBjb3VudCA9IDAsXG4gICAgICAgICAgICBtZXNzYWdlID0ge2ZhaWx1cmU6ICdGYWlsdXJlOiBub24tZXhpc3RlbnQgbm9kZSBpbiB0aGlzIGxpc3QuJ30sXG4gICAgICAgICAgICBiZWZvcmVOb2RlVG9EZWxldGUgPSBudWxsLFxuICAgICAgICAgICAgbm9kZVRvRGVsZXRlID0gbnVsbCxcbiAgICAgICAgICAgIGRlbGV0ZWROb2RlID0gbnVsbDtcblxuICAgICAgICAvLyAxc3QgdXNlLWNhc2U6IGFuIGludmFsaWQgcG9zaXRpb25cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMCB8fCBwb3NpdGlvbiA+IGxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZmFpbHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAybmQgdXNlLWNhc2U6IHRoZSBmaXJzdCBub2RlIGlzIHJlbW92ZWRcbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmhlYWQgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICAgICAgZGVsZXRlZE5vZGUgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX2xlbmd0aC0tO1xuXG4gICAgICAgICAgICByZXR1cm4gZGVsZXRlZE5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAzcmQgdXNlLWNhc2U6IGFueSBvdGhlciBub2RlIGlzIHJlbW92ZWRcbiAgICAgICAgd2hpbGUgKGNvdW50IDwgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIGJlZm9yZU5vZGVUb0RlbGV0ZSA9IGN1cnJlbnROb2RlO1xuICAgICAgICAgICAgbm9kZVRvRGVsZXRlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICBiZWZvcmVOb2RlVG9EZWxldGUubmV4dCA9IG5vZGVUb0RlbGV0ZS5uZXh0O1xuICAgICAgICBkZWxldGVkTm9kZSA9IG5vZGVUb0RlbGV0ZTtcbiAgICAgICAgbm9kZVRvRGVsZXRlID0gbnVsbDtcbiAgICAgICAgdGhpcy5fbGVuZ3RoLS07XG5cbiAgICAgICAgcmV0dXJuIGRlbGV0ZWROb2RlO1xuICAgICAgfTtcbn07XG4iLCJpbXBvcnQgeyBIb3dsIH0gZnJvbSBcImhvd2xlclwiO1xuXG5leHBvcnQgY2xhc3MgU291bmRFZmZlY3RzIHtcbiAgcHVibGljIHNuZHNwcml0ZTpIb3dsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgLy9sb2FkIHNwcml0ZVxuICAgICAgdGhpcy5zbmRzcHJpdGUgPSBuZXcgSG93bCh7XG4gICAgICBzcmM6IFsnc3JjL2F1ZGlvL3Nwcml0ZS53YXYnXSxcbiAgICAgIHNwcml0ZToge1xuICAgICAgICBzdGFydDogWzIxMiwgMTY2NF0sXG4gICAgICAgIGRvdDogWzQwMDAsIDEwMDBdLFxuICAgICAgICBsaW5lOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIGtleXByZXNzOiBbMTAsIDU0XSxcbiAgICAgICAgZXJyb3I6IFs2MDAwLCA1MDAwXSxcbiAgICAgICAgbW92ZTogWzYwMDAsIDUwMDBdXG4gICAgICB9XG4gICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBwbGF5ID0gZnVuY3Rpb24oc25kOnN0cmluZyk6dm9pZHtcbiAgICAgIGNvbnNvbGUubG9nKFwic25kXCIsIHNuZCk7XG4gICAgICB0aGlzLnNuZHNwcml0ZS5wbGF5KHNuZCk7XG4gICAgfVxuICB9XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IFBJWEkgPSByZXF1aXJlKCdwaXhpLmpzJyk7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGVzIH0gZnJvbSBcIi4vQ29sb3JQYWxldHRlc1wiO1xuaW1wb3J0IHsgU291bmRFZmZlY3RzIH0gZnJvbSBcIi4vU291bmRFZmZlY3RzXCI7XG5pbXBvcnQgeyBHdWkgfSBmcm9tIFwiLi9HdWlcIjtcblxuLy9HZXQgc291bmQgZWZmZWN0c1xuY29uc3QgU09VTkRMSUIgPSBuZXcgU291bmRFZmZlY3RzO1xuXG4vL0dldCBjb2xvciBpbmZvcm1hdGlvblxuY29uc3QgQ09MT1JMSUIgPSBuZXcgQ29sb3JQYWxldHRlcztcbmxldCBjb2xvcnM6Q29sb3JQYWxldHRlcztcblxuLy8gTG9hZCBHdWkgYWZ0ZXIgY29sb3JzXG5sZXQgbWFpbmd1aTphbnk7XG5cbi8vbG9hZCBjb2xvciBwYWxldHRlXG5sZXQgY2hhbmdlQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcil7XG4gIENPTE9STElCLmxvYWRDb2xvcnMocGluZGV4KVxuICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgc2V0dXBQaXhpKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vL0NyZWF0ZSB0aGUgYXBwXG5sZXQgcmVuZGVyZXI6IGFueTtcbmxldCBzdGFnZTogUElYSS5Db250YWluZXI7XG5cbi8vYnV0dG9uXG5sZXQgcGxheUJ1dHRvbldhaXQ7XG5sZXQgcGxheUJ1dHRvbkRvd247XG5sZXQgcGxheUJ1dHRvbk92ZXI7XG5sZXQgcGxheUJ1dHRvbjtcblxubGV0IHNldHVwUGl4aSA9IGZ1bmN0aW9uKCk6dm9pZHtcblxuICByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDk2MCw1NDAsXG4gICAge2FudGlhbGlhczogdHJ1ZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxLCBhdXRvUmVzaXplOiB0cnVlfVxuICApO1xuICByZW5kZXJlci52aWV3LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICByZW5kZXJlci52aWV3LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gIHJlbmRlcmVyLmF1dG9SZXNpemUgPSB0cnVlO1xuICByZW5kZXJlci5yZXNpemUod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgLy9DcmVhdGUgYSBjb250YWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgYHN0YWdlYFxuICBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuICBzdGFnZS5pbnRlcmFjdGl2ZSA9IHRydWU7XG5cbiAgLy9BZGQgdGhlIGNhbnZhcyB0byB0aGUgSFRNTCBkb2N1bWVudFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIC8vVXBkYXRlIGJhY2tncm91bmQgY29sb3JcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3JzWydiYWNrZ3JvdW5kJ107XG5cbiAgZHJhd1NjZW5lKCk7XG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gICAgLy9pbml0IEd1aSBwYXNzIGluIGNvbG9yc1xuICAgIG1haW5ndWkgPSBuZXcgR3VpKCBzdGFnZSwgY29sb3JzLCBTT1VORExJQik7XG4gICAgLy9zdGFydCByZW5kZXJpbmcgZW5naW5lXG4gICAgZ2FtZUxvb3AoKTtcbiAgICBjb25zb2xlLmxvZyhcInN0YXJ0ZWQgZ2FtZUxvb3BcIik7XG59O1xubGV0IGdhbWVMb29wID0gZnVuY3Rpb24oKTp2b2lke1xuICAvL2xvb3AgNjAgZnJhbWVzIHBlciBzZWNvbmRcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGdhbWVMb29wKTtcblxuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufVxuXG5cbi8vIC8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xuLy8gd2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuLy8gICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbi8vIH1cbi8vIC8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xuLy8gbGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbi8vICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbi8vICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4vLyAgIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuLy8gICAvLyBhcHAudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuLy8gICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbi8vICAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG4vLyB9XG4iXX0=
