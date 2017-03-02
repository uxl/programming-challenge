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
        this._spacing = 50; //row vs col => row.width * rows; min:2px max: 50px;
        this.grid = {};
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
        this.reset = function () {
            //buildGrid
            var grid = this.buildGrid();
            //pick random starting position
            var randomStart = this.randomStart();
            //build linked list
            var head = grid[randomStart];
            return grid;
        };
        this.buildGrid = function () {
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
        this._rows = newval;
    }
    get cols() {
        return this._cols;
    }
    set cols(newval) {
        this._cols = newval;
        this._rows = newval;
    }
    get spacing() {
        return this._spacing;
    }
    set spacing(newval) {
        this._spacing = newval;
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
const createjs = require("createjs-browserify");
class Gui {
    //create container for grid
    constructor(mainStage, mainColors, mainSounds) {
        this.algorithm = new Algorithm_1.Algorithm;
        this.loader = new PIXI.loaders.Loader();
        this.sprites = {};
        this.spacing = 50;
        this.marks = [];
        this.grid = {};
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
                //update board/matrix
                this.increaseGrid();
                this.createGrid();
            }.bind(this));
            var rowsButtonDown = new Btn_1.Btn(this.stage, this.loader.resources, "arrowdown", "rowdown", 400, window.innerHeight - 30, function () {
                //update board/matrix
                this.reduceGrid();
                this.createGrid();
            }.bind(this));
            var colsButtonUp = new Btn_1.Btn(this.stage, this.loader.resources, "arrowup", "colsup", 605, window.innerHeight - 45, function () {
                //update board/matrix
                this.increaseGrid();
                this.createGrid();
            }.bind(this));
            var colsButtonDown = new Btn_1.Btn(this.stage, this.loader.resources, "arrowdown", "colsdown", 600, window.innerHeight - 30, function () {
                //update board/matrix
                this.reduceGrid();
                this.createGrid();
            }.bind(this));
        };
        this.movePlayer = function (gridIndex) {
            //graphic offset
            var padx = this.squarecontainer.x + 25;
            var pady = this.squarecontainer.y + 40;
            //calculate position
            var posx = this.grid[gridIndex].x * this.algorithm.spacing + padx;
            var posy = this.grid[gridIndex].y * this.algorithm.spacing + pady;
            createjs.Tween.get(this.player).to({ x: posx, y: posy, delay: 2000 }, 1000, createjs.Ease.quadOut);
        };
        this.createPlayer = function () {
            //get random position
            var ran = this.algorithm.randomStart();
            //graphic offset
            var padx = this.squarecontainer.x + 25;
            var pady = this.squarecontainer.y + 40;
            //calculate position
            var posx = this.grid[ran].x * this.algorithm.spacing + padx;
            var posy = this.grid[ran].y * this.algorithm.spacing + pady;
            //player
            this.player = this.sprites.player_blue;
            this.stage.addChild(this.player);
            this.player.anchor.set(0.5, 0.8);
            this.player.position.x = posx;
            this.player.position.y = posy;
            this.sounds.play("start");
            this.movePlayer(this.algorithm.randomStart());
        };
        this.isEven = function (n) {
            return n % 2 == 0;
        };
        this.createGrid = function () {
            this.grid = this.algorithm.reset();
            if (this.squarecontainer) {
                this.squarecontainer.destroy(true);
            }
            this.squarecontainer = new PIXI.Container();
            this.stage.addChild(this.squarecontainer);
            //using graphics for squares
            var squares = new PIXI.Graphics();
            let squarecolor;
            for (var i = 0; i < this.grid.length; i++) {
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
                var x = (i % this.algorithm.cols) * this.algorithm.spacing;
                var y = Math.floor(i / this.algorithm.rows) * this.algorithm.spacing;
                squares.drawRect(x, y, this.algorithm.spacing, this.algorithm.spacing);
            }
            this.squarecontainer.addChild(squares);
            // Center on the screen
            this.squarecontainer.x = (window.innerWidth - this.squarecontainer.width) / 2;
            this.squarecontainer.y = (window.innerHeight - this.squarecontainer.height) / 2;
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
    increaseGrid() {
        this.algorithm.rows++;
        this.algorithm.cols++;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
        this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
    }
    reduceGrid() {
        this.algorithm.rows--;
        this.algorithm.cols--;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
        this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
    }
}
exports.Gui = Gui;

},{"./Algorithm":1,"./Btn":2,"createjs-browserify":undefined,"pixi.js":undefined}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0FsZ29yaXRobS50cyIsInNyYy9CdG4udHMiLCJzcmMvQ29sb3JQYWxldHRlcy50cyIsInNyYy9HdWkudHMiLCJzcmMvU2luZ2x5TGlua2VkTGlzdC50cyIsInNyYy9Tb3VuZEVmZmVjdHMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLHlEQUFzRDtBQUd0RDtJQVVFO1FBUkEsNkJBQTZCO1FBQ3JCLGVBQVUsR0FBRyxJQUFJLG1DQUFnQixFQUFFLENBQUM7UUFDcEMsVUFBSyxHQUFVLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQVUsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBVSxFQUFFLENBQUMsQ0FBQyxvREFBb0Q7UUFFMUUsU0FBSSxHQUFVLEVBQUUsQ0FBQztRQU16QixtQ0FBbUM7UUFDM0IsYUFBUSxHQUFHLFVBQVMsSUFBSTtZQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLE9BQU0sSUFBSSxJQUFHLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksRUFBQyxDQUFDO2dCQUN0QyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNqQixpRUFBaUU7Z0JBQ2pFLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBSSxJQUFLLENBQUMsQ0FBQSxDQUFDO29CQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNkLENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQTtRQXVCSSxVQUFLLEdBQUc7WUFDYixXQUFXO1lBQ1gsSUFB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Q0YsSUFBSSxRQUFRLEdBQUc7SUFDYiwyQkFBMkI7SUFDM0IscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUE7QUFHRCwyQkFBMkI7QUFDM0IsMkNBQTJDO0FBQzNDLDBCQUEwQjtBQUMxQixJQUFJO0FBQ0osMENBQTBDO0FBQzFDLDRDQUE0QztBQUM1QywrQkFBK0I7QUFDL0IsZ0NBQWdDO0FBQ2hDLDREQUE0RDtBQUM1RCx3Q0FBd0M7QUFDeEMseUNBQXlDO0FBQ3pDLG1DQUFtQztBQUNuQywwQkFBMEI7QUFDMUIsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBTaW5nbHlMaW5rZWRMaXN0IH0gZnJvbSBcIi4vU2luZ2x5TGlua2VkTGlzdFwiO1xuXG5cbmV4cG9ydCBjbGFzcyBBbGdvcml0aG0ge1xuXG4gIC8vZGVmaW5lIHNpemUgb2YgY2hlY2tlcmJvYXJkXG4gIHByaXZhdGUgc2luZ2x5bGlzdCA9IG5ldyBTaW5nbHlMaW5rZWRMaXN0KCk7XG4gIHByaXZhdGUgX3Jvd3M6bnVtYmVyID0gMTA7XG4gIHByaXZhdGUgX2NvbHM6bnVtYmVyID0gMTA7XG4gIHByaXZhdGUgX3NwYWNpbmc6bnVtYmVyID0gNTA7IC8vcm93IHZzIGNvbCA9PiByb3cud2lkdGggKiByb3dzOyBtaW46MnB4IG1heDogNTBweDtcblxuICBwcml2YXRlIGdyaWQ6T2JqZWN0ID0ge307XG5cbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG5cbiAgLy8gcHJpdmF0ZSBsaW5rZWRMaXN0ID0gU2luZ2x5TGlzdDtcbiAgcHJpdmF0ZSBoYXNDeWNsZSA9IGZ1bmN0aW9uKGhlYWQpe1xuICAgICAgdmFyIGZhc3QgPSBoZWFkO1xuICAgICAgdmFyIHNsb3cgPSBoZWFkO1xuICAgICAgd2hpbGUoZmFzdCE9IG51bGwgJiYgZmFzdC5uZXh0ICE9IG51bGwpe1xuICAgICAgICBmYXN0ID0gZmFzdC5uZXh0Lm5leHQ7XG4gICAgICAgIHNsb3cgPSBzbG93Lm5leHQ7XG4gICAgICAgIC8vaWYgZmFzdCBhbmQgc2xvdyBwb2ludGVycyBhcmUgbWVldGluZyB0aGVuIExpbmtlZExpc3QgaXMgY3ljbGljXG4gICAgICAgIGlmKGZhc3QgPT0gc2xvdyApe1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gIGdldCByb3dzKCk6bnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLl9yb3dzO1xuICB9XG4gIHNldCByb3dzKG5ld3ZhbDpudW1iZXIpIHtcbiAgICAgIHRoaXMuX3Jvd3MgPSBuZXd2YWw7XG4gICAgICB0aGlzLl9yb3dzID0gbmV3dmFsO1xuICB9XG4gIGdldCBjb2xzKCk6bnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb2xzO1xuICB9XG4gIHNldCBjb2xzKG5ld3ZhbDpudW1iZXIpIHtcbiAgICAgIHRoaXMuX2NvbHMgPSBuZXd2YWw7XG4gICAgICB0aGlzLl9yb3dzID0gbmV3dmFsO1xuICB9XG4gIGdldCBzcGFjaW5nKCk6bnVtYmVyIHtcbiAgICAgIHJldHVybiB0aGlzLl9zcGFjaW5nO1xuICB9XG4gIHNldCBzcGFjaW5nKG5ld3ZhbDpudW1iZXIpIHtcbiAgICAgIHRoaXMuX3NwYWNpbmcgPSBuZXd2YWw7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQgPSBmdW5jdGlvbigpe1xuICAgIC8vYnVpbGRHcmlkXG4gICAgdmFyIGdyaWQgPSB0aGlzLmJ1aWxkR3JpZCgpO1xuICAgIC8vcGljayByYW5kb20gc3RhcnRpbmcgcG9zaXRpb25cbiAgICB2YXIgcmFuZG9tU3RhcnQgPSB0aGlzLnJhbmRvbVN0YXJ0KCk7XG4gICAgLy9idWlsZCBsaW5rZWQgbGlzdFxuICAgIHZhciBoZWFkID0gZ3JpZFtyYW5kb21TdGFydF07XG5cbiAgICByZXR1cm4gZ3JpZDtcblxuICB9XG4gIHByaXZhdGUgYnVpbGRHcmlkID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgYW1vdW50ID0gdGhpcy5fcm93cyAqIHRoaXMuX2NvbHM7XG4gICAgbGV0IGRpcmVjdGlvbiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo0KTtcbiAgICBsZXQgZ3JpZDogb2JqZWN0W10gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFtb3VudDsgaSsrKSB7XG4gICAgICB2YXIgY2VsbCA9IHt4OihpICUgdGhpcy5fY29scyksIHk6IE1hdGguZmxvb3IoaSAvIHRoaXMuX3Jvd3MpLCBkaXJlY3Rpb246ZGlyZWN0aW9ufTtcbiAgICAgIGdyaWQucHVzaChjZWxsKTtcbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cbiAgcHVibGljIHJhbmRvbVN0YXJ0ID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgYW1vdW50ID0gdGhpcy5fcm93cyAqIHRoaXMuX2NvbHM7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSphbW91bnQpO1xuICB9XG4gIC8vIHByaXZhdGUgcmFuVmVjdG9yID0gZnVuY3Rpb24oLTEsIDEpIHtcbiAgLy8gICBsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIC8vICAgbGV0IHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuICAvLyAgIHJldHVybiB7eCx5fTsgKDAsMSlcbiAgLy8gfVxuICBwcml2YXRlIE5vZGUgPSBmdW5jdGlvbihkYXRhLCBuZXh0KSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLm5leHQgPSBuZXh0O1xuICB9XG4gIHByaXZhdGUgU2luZ2x5TGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX2xlbmd0aCA9IDA7XG4gICAgdGhpcy5oZWFkID0gbnVsbDtcbiAgfVxuXG5cblxuXG5cbi8vbW92ZSB0byBndWlcbi8vIC8vZHJhdyBzcXVhcmVzXG4vLyBwcml2YXRlIGRyYXdTcXVhcmVzID0gZnVuY3Rpb24oc3RhZ2UsIGxvYWRlcil7XG4vLyBsZXQgdG90YWxTcXVhcmVzOm51bWJlciA9IGNvbHMqcm93cztcbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbFNxdWFyZXM7IGkrKykge1xuLy8gICAgIC8vY3JlYXRlIGluc3RhbmNlIG9mIHNxdWFyZVxuLy8gICAgIC8vY2FsY3VsYXRlIHgsIHlcbi8vICAgICBsZXQgeCA9IChpICUgY29scykgKiBzcGFjaW5nO1xuLy8gICAgIGxldCB5ID0gTWF0aC5mbG9vcihpIC8gcm93cykgKiBzcGFjaW5nO1xuLy8gICAgIC8vPHNxdWFyZXNjb250YWluZXIgPT4gc3F1YXJlY2xhc3MgbmV3IGluc3RhbmNlIGFuZCBwb3NpdGlvbih4Om51bWJlciwgeTpudW1iZXIpPlxuLy8gICB9XG4vLyB9XG5cbi8vcmFuZG9taXplIGRpcmVjdGlvbiBvbiBzcXVhcmVzXG4vLyAvL3N0YXJ0IGNoZWNrZXIgYXQgcmFuZG9tIGluc2VydGlvbiBzcXVhcmVcbi8vIGxldCBzdGFydHggPSBNYXRoLnJhbmRvbSgpKnJvd3M7XG4vLyBsZXQgc3RhcnR5ID0gTWF0aC5yYW5kb20oKSpjb2xzO1xuLy88c3F1YXJlc2NvbnRhaW5lciA9PiBwbGF5ZXJjbGFzcyAtIHBvc2l0aW9uIHBsYXllcj5cblxuLy9tb3ZlIDEgdHVyblxuLy9nZXREaXJlY3Rpb24gZnJvbSBjdXJyZW50IHNxdWFyZVxuLy9hbmltYXRlIHRvIG5ldyBzcXVhcmVcblxuLy9jaGVjayBib3VuZHMgKGNvbmRpdGlvbjEpXG4vLyBpZih4IDwgMCAmJiB4ID4gY29scyAmJiB5IDwgMCAmJiB5ID4gcm93cyl7XG4vLyAgIGNvbnNvbGUubG9nKFwieW91IGFyZSBvdXRzaWRlIGJvdW5kc1wiKTtcbi8vIH1cblxuLy9jaGVjayBjeWNsZSAoY29uZGl0aW9uMilcblxuLy9oaXN0b3J5IGFycmF5XG4vLyBsZXQgaGlzdG9yeSA9IG5ldyBBcnJheSgpO1xuLy9cbi8vIC8vY29vcmRpbmF0ZSBvYmplY3QgKGludGVyZmFjZT8pXG4vLyBsZXQgY29vcmRpbmF0ZSA9IGZ1bmN0aW9uKHgsIHkpe1xuLy8gICB0aGlzLnggPSB4O1xuLy8gICB0aGlzLnkgPSB5O1xuLy8gfVxuXG4vL2NoZWNrIGZvciByZXBlYXRcbi8vIGZ1bmN0aW9uIGNoZWNrQW5kQWRkKHgseSkge1xuLy8gICB2YXIgdGVzdCA9IG5ldyBjb29yZGluYXRlKHgseSk7XG4vL1xuLy8gICB2YXIgZm91bmQgPSBoaXN0b3J5LnNvbWUoZnVuY3Rpb24gKGVsKSB7XG4vLyAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZWwpID09PSBKU09OLnN0cmluZ2lmeSh0ZXN0KTtcbi8vICAgfSk7XG4vLyAgIGlmICghZm91bmQpIHtcbi8vICAgICBjb25zb2xlLmxvZyhcIm5vdCBmb3VuZFwiKTtcbi8vICAgICBoaXN0b3J5LnB1c2godGVzdCk7XG4vLyAgIH1lbHNle1xuLy8gICAgIGNvbnNvbGUubG9nKFwiZm91bmRcIik7XG4vLyAgICAgLy8gY29uZGl0aW9uIDIgbWV0IGVuZCAvL1xuLy8gICAgIDxzcXVhcmVzY29udGFpbmVyID0gcGxheWVyY2xhc3MgZGVzdHJveT5cbi8vICAgICA8c3F1YXJlc2NvbnRhaW5lciA9IHNxdWFyZSB0dXJuIHJlZD5cbi8vICAgfVxuLy8gfVxuXG4vL3NxdWFyZSBjbGFzc1xuLy9wb3NzaWJsZSBkaXJlY3Rpb25zXG5cbi8vIHByaXZhdGUgb3B0aW9uczpzdHJpbmdzO1xuLy8gY29uc3RydWN0b3IgPSB7XG4vLyAgIG9wdGlvbnMgPSBbJ3VwJywncmlnaHQnLCdkb3duJywnbGVmdCddO1xuLy8gfVxuLy9cbi8vIGxldCBzZXRSYW5kb21EaXJlY3Rpb24gPSBmdW5jdGlvbigpe1xuLy8gICAvL3NldCByYW5kb20gNCB2YWx1ZXNcbi8vICAgTWF0aC5yYW5kb20oKSpvcHRpb25zLmxlbmd0aDtcbi8vIH1cbi8vIGxldCBjaGFuZ2VEaXNwbGF5ID0gZnVuY3Rpb24ob3B0aW9uOm51bWJlcil7XG4vLyAgIHN3aXRjaChvcHRpb24pe1xuLy8gICAgIGNhc2UgMDpcbi8vICAgICAgIC8vc3dhcCB0ZXh0dXJlXG4vLyAgICAgYnJlYWs7XG4vLyAgICAgY2FzZSAxOlxuLy8gICAgICAgLy9zd2FwIHRleHR1cmVcbi8vICAgICBicmVhaztcbi8vICAgICBjYXNlIDI6XG4vLyAgICAgICAvL3N3YXAgdGV4dHVyZVxuLy8gICAgIGJyZWFrO1xuLy8gICAgIGNhc2UgMzpcbi8vICAgICAgIC8vc3dhcCB0ZXh0dXJlXG4vLyAgICAgYnJlYWs7XG4vLyAgICAgZGVmYXVsdDpcbi8vICAgICAgIGNvbnNvbGUubG9nKFwibm8gdmFsaWQgY2FzZVwiKTtcbi8vICAgICBicmVhaztcbi8vICAgfVxuLy8gfVxufVxuIiwiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgQnRuIHtcbiAgICBwcml2YXRlIGJ1dHRvbk9iamVjdDogT2JqZWN0ID0ge307XG4gICAgcHJpdmF0ZSBidG5raW5kOiBTdHJpbmc7XG4gICAgcHJpdmF0ZSBjYWxsYmFjazpGdW5jdGlvbjtcbiAgICBwcml2YXRlIHN0YWdlOlBJWEkuQ29udGFpbmVyO1xuXG4gICAgY29uc3RydWN0b3IobWFpblN0YWdlOmFueSwgcmVzb3VyY2VzOmFueSwgYnRua2luZDogc3RyaW5nLCBuYW1lOnN0cmluZywgeHBvczogbnVtYmVyLCB5cG9zOiBudW1iZXIsIGNhbGxiazpGdW5jdGlvbikge1xuICAgICAgICAvLyBjcmVhdGUgc29tZSB0ZXh0dXJlcyBmcm9tIGFuIGltYWdlIHBhdGhcbiAgICAgICAgdGhpcy5zdGFnZSA9IG1haW5TdGFnZTtcbiAgICAgICAgdGhpcy5idG5raW5kID0gYnRua2luZDtcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiaztcblxuICAgICAgICBjb25zb2xlLmxvZyhcImJ0bmtpbmQ6IFwiICsgdGhpcy5idG5raW5kKTtcbiAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgICAgIC8vIHZhciB0ZXh0dXJlQnV0dG9uID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZSgncmVxdWlyZWQvYXNzZXRzL2J1dHRvbi5wbmcnKTtcblxuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJ1cFwiXSA9IHJlc291cmNlc1tidG5raW5kICsgJ191cCddLnRleHR1cmU7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcIm92ZXJcIl0gPSByZXNvdXJjZXNbYnRua2luZCArIFwiX292ZXJcIl0udGV4dHVyZTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiaGl0XCJdID0gcmVzb3VyY2VzW2J0bmtpbmQgKyBcIl9oaXRcIl0udGV4dHVyZTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXSA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXNbYnRua2luZCArIFwiX3VwXCJdLnRleHR1cmUpO1xuICAgICAgICB0aGlzLmJ1dHRvbk9iamVjdFtuYW1lICsgXCJiYXNlXCJdLmFuY2hvci5zZXQoMC41KTtcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXS54ID0geHBvcztcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXS55ID0geXBvcztcblxuICAgICAgICAvLyBtYWtlIHRoZSBidXR0b24gaW50ZXJhY3RpdmUuLi5cbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXS5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0uYnV0dG9uTW9kZSA9IHRydWU7XG5cbiAgICAgICAgLy8gTW91c2UgJiB0b3VjaCBldmVudHMgYXJlIG5vcm1hbGl6ZWQgaW50b1xuICAgICAgICAvLyB0aGUgcG9pbnRlciogZXZlbnRzIGZvciBoYW5kbGluZyBkaWZmZXJlbnRcbiAgICAgICAgdGhpcy5idXR0b25PYmplY3RbbmFtZSArIFwiYmFzZVwiXVxuICAgICAgICAgICAgLm9uKCdwb2ludGVyZG93bicsIHRoaXMub25CdXR0b25Eb3duLmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIsIHRoaXMuY2FsbGJhY2spKVxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXAnLCB0aGlzLm9uQnV0dG9uVXAuYmluZCh0aGlzLCBcInRleHR1cmVCdXR0b25cIikpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCB0aGlzLm9uQnV0dG9uVXAuYmluZCh0aGlzLCBcInRleHR1cmVCdXR0b25cIikpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJvdmVyJywgdGhpcy5vbkJ1dHRvbk92ZXIuYmluZCh0aGlzLCBcInRleHR1cmVCdXR0b25cIikpXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJvdXQnLCB0aGlzLm9uQnV0dG9uT3V0LmJpbmQodGhpcywgXCJ0ZXh0dXJlQnV0dG9uXCIpKTtcblxuICAgICAgICAvLyBVc2UgbW91c2Utb25seSBldmVudHNcbiAgICAgICAgLy8gLm9uKCdtb3VzZWRvd24nLCBvbkJ1dHRvbkRvd24pXG4gICAgICAgIC8vIC5vbignbW91c2V1cCcsIG9uQnV0dG9uVXApXG4gICAgICAgIC8vIC5vbignbW91c2V1cG91dHNpZGUnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ21vdXNlb3ZlcicsIG9uQnV0dG9uT3ZlcilcbiAgICAgICAgLy8gLm9uKCdtb3VzZW91dCcsIG9uQnV0dG9uT3V0KVxuXG4gICAgICAgIC8vIFVzZSB0b3VjaC1vbmx5IGV2ZW50c1xuICAgICAgICAvLyAub24oJ3RvdWNoc3RhcnQnLCBvbkJ1dHRvbkRvd24pXG4gICAgICAgIC8vIC5vbigndG91Y2hlbmQnLCBvbkJ1dHRvblVwKVxuICAgICAgICAvLyAub24oJ3RvdWNoZW5kb3V0c2lkZScsIG9uQnV0dG9uVXApXG5cbiAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBzdGFnZVxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuYnV0dG9uT2JqZWN0W25hbWUgKyBcImJhc2VcIl0pO1xuICAgIH1cbiAgICBwcml2YXRlIG9uQnV0dG9uRG93biA9IGZ1bmN0aW9uKG1lLGNhbGxiYWNrKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwib25CdXR0b25Eb3duXCIpO1xuICAgICAgICB0aGlzLmlzZG93biA9IHRydWU7XG4gICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfaGl0XCJdO1xuICAgICAgICB0aGlzLmFscGhhID0gMTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvblVwID0gZnVuY3Rpb24obWUpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJvbkJ1dHRvblVwXCIpO1xuICAgICAgICB0aGlzLmlzZG93biA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc092ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfb3ZlclwiXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMuYnV0dG9uT2JqZWN0W21lICsgXCJfdXBcIl07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBvbkJ1dHRvbk92ZXIgPSBmdW5jdGlvbihtZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uT3ZlclwiKTtcbiAgICAgICAgdGhpcy5pc092ZXIgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX292ZXJcIl07XG4gICAgfVxuICAgIHByaXZhdGUgb25CdXR0b25PdXQgPSBmdW5jdGlvbihtZSk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm9uQnV0dG9uT3V0XCIpO1xuICAgICAgICB0aGlzLmlzT3ZlciA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLmJ1dHRvbk9iamVjdFttZSArIFwiX3VwXCJdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgKiBhcyBQSVhJIGZyb20gXCJwaXhpLmpzXCI7XG5pbXBvcnQgeyBCdG4gfSBmcm9tIFwiLi9CdG5cIjtcbmltcG9ydCB7IEFsZ29yaXRobSB9IGZyb20gXCIuL0FsZ29yaXRobVwiO1xuaW1wb3J0ICogYXMgY3JlYXRlanMgZnJvbSBcImNyZWF0ZWpzLWJyb3dzZXJpZnlcIjtcblxuXG5leHBvcnQgY2xhc3MgR3VpIHtcbiAgICBwcml2YXRlIHN0YWdlOiBQSVhJLkNvbnRhaW5lcjtcbiAgICBwcml2YXRlIGFsZ29yaXRobTogQWxnb3JpdGhtID0gbmV3IEFsZ29yaXRobTtcbiAgICBwcml2YXRlIGNvbG9yczogYW55O1xuICAgIHByaXZhdGUgc291bmRzOiBhbnk7XG5cbiAgICAvL3RleHQgZWxlbWVudHNcbiAgICBwcml2YXRlIHN0YXR1czogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgcm93c1RpdGxlOiBQSVhJLlRleHQ7XG4gICAgcHJpdmF0ZSByb3dzVmFsdWU6IFBJWEkuVGV4dDtcbiAgICBwcml2YXRlIGNvbHNUaXRsZTogUElYSS5UZXh0O1xuICAgIHByaXZhdGUgY29sc1ZhbHVlOiBQSVhJLlRleHQ7XG5cbiAgICBwcml2YXRlIGxpbmU6IFBJWEkuR3JhcGhpY3M7XG4gICAgcHJpdmF0ZSBsb2FkZXIgPSBuZXcgUElYSS5sb2FkZXJzLkxvYWRlcigpO1xuICAgIHByaXZhdGUgc3ByaXRlczogYW55ID0ge307XG5cblxuICAgIHByaXZhdGUgc3BhY2luZzogbnVtYmVyID0gNTA7XG4gICAgcHJpdmF0ZSByZXNvdXJjZXM6IGFueTtcbiAgICBwcml2YXRlIG1hcmtzOiBhbnkgPSBbXTtcbiAgICBwcml2YXRlIHBsYXllcjogUElYSS5TcHJpdGU7XG4gICAgcHJpdmF0ZSBzcXVhcmVjb250YWluZXI6IFBJWEkuQ29udGFpbmVyO1xuICAgIHByaXZhdGUgZ3JpZDphbnkgPSB7fTtcbiAgICAvL2NyZWF0ZSBjb250YWluZXIgZm9yIGdyaWRcblxuICAgIGNvbnN0cnVjdG9yKG1haW5TdGFnZTogUElYSS5Db250YWluZXIsIG1haW5Db2xvcnM6IGFueSwgbWFpblNvdW5kczogYW55KSB7XG4gICAgICAgIHRoaXMuc3RhZ2UgPSBtYWluU3RhZ2U7XG5cbiAgICAgICAgdGhpcy5jb2xvcnMgPSBtYWluQ29sb3JzO1xuICAgICAgICB0aGlzLnNvdW5kcyA9IG1haW5Tb3VuZHM7XG4gICAgICAgIHRoaXMubG9hZEltYWdlcygpO1xuICAgIH1cbiAgICBwcml2YXRlIGxvYWRJbWFnZXMgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy9sb2FkIGltYWdlcydcbiAgICAgICAgdGhpcy5sb2FkZXIgPSBQSVhJLmxvYWRlclxuICAgICAgICAgICAgLmFkZCgncGxheWVyX2JsdWUnLCAnc3JjL2dyYXBoaWNzL3BsYXllcl9ibHVlLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdtYXJrX2RvdCcsICdzcmMvZ3JhcGhpY3MvbWFya19kb3QucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfdXAnLCAnc3JjL2dyYXBoaWNzL2Fycm93dXBfdXAucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93dXBfb3ZlcicsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9vdmVyLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd3VwX2hpdCcsICdzcmMvZ3JhcGhpY3MvYXJyb3d1cF9oaXQucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93ZG93bl91cCcsICdzcmMvZ3JhcGhpY3MvYXJyb3dkb3duX3VwLnBuZycpXG4gICAgICAgICAgICAuYWRkKCdhcnJvd2Rvd25fb3ZlcicsICdzcmMvZ3JhcGhpY3MvYXJyb3dkb3duX292ZXIucG5nJylcbiAgICAgICAgICAgIC5hZGQoJ2Fycm93ZG93bl9oaXQnLCAnc3JjL2dyYXBoaWNzL2Fycm93ZG93bl9oaXQucG5nJylcbiAgICAgICAgICAgIC5vbignY29tcGxldGUnLCBmdW5jdGlvbihsb2FkZXIsIHJlc291cmNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5wbGF5ZXJfYmx1ZSA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMucGxheWVyX2JsdWUudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLm1hcmtfZG90ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5tYXJrX2RvdC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc3VwX3VwID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5jb2xzdXBfb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF9vdmVyLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5jb2xzdXBfaGl0ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd3VwX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5jb2xzZG93bl91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ByaXRlcy5jb2xzZG93bl9vdmVyID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd2Rvd25fb3Zlci50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMuY29sc2Rvd25faGl0ID0gbmV3IFBJWEkuU3ByaXRlKHJlc291cmNlcy5hcnJvd2Rvd25fdXAudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3N1cF91cCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucm93c3VwX292ZXIgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93dXBfb3Zlci50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucm93c3VwX2hpdCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3d1cF91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucm93c2Rvd25fdXAgPSBuZXcgUElYSS5TcHJpdGUocmVzb3VyY2VzLmFycm93ZG93bl91cC50ZXh0dXJlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNwcml0ZXMucm93c2Rvd25fb3ZlciA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX292ZXIudGV4dHVyZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zcHJpdGVzLnJvd3Nkb3duX2hpdCA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYXJyb3dkb3duX3VwLnRleHR1cmUpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkQ29tcGxldGVkKCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmxvYWRlci5sb2FkKCk7XG4gICAgfVxuICAgIHByaXZhdGUgY29vcmRpbmF0ZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIH1cblxuICAgIHByaXZhdGUgb25Mb2FkQ29tcGxldGVkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlR3JpZCh0aGlzLmFsZ29yaXRobS5jb2xzLCB0aGlzLmFsZ29yaXRobS5yb3dzKTtcbiAgICAgICAgdGhpcy5jcmVhdGVMaW5lKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBpbmNyZWFzZUdyaWQoKXtcbiAgICAgIHRoaXMuYWxnb3JpdGhtLnJvd3MrKztcbiAgICAgIHRoaXMuYWxnb3JpdGhtLmNvbHMrKztcbiAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5yb3dzLnRvU3RyaW5nKCksIDAsIDApO1xuICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVmFsdWUsIHRoaXMuYWxnb3JpdGhtLmNvbHMudG9TdHJpbmcoKSwgMCwgMCk7XG4gICAgfVxuICAgIHByaXZhdGUgcmVkdWNlR3JpZCgpe1xuICAgICAgdGhpcy5hbGdvcml0aG0ucm93cy0tO1xuICAgICAgdGhpcy5hbGdvcml0aG0uY29scy0tO1xuICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVmFsdWUsIHRoaXMuYWxnb3JpdGhtLnJvd3MudG9TdHJpbmcoKSwgMCwgMCk7XG4gICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNWYWx1ZSwgdGhpcy5hbGdvcml0aG0uY29scy50b1N0cmluZygpLCAwLCAwKTtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByb3dzQnV0dG9uVXAgPSBuZXcgQnRuKHRoaXMuc3RhZ2UsIHRoaXMubG9hZGVyLnJlc291cmNlcywgXCJhcnJvd3VwXCIsIFwicm93c3VwXCIsIDQwNSwgd2luZG93LmlubmVySGVpZ2h0IC0gNDUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG4gICAgICAgICAgICB0aGlzLmluY3JlYXNlR3JpZCgpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVHcmlkKCk7XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdmFyIHJvd3NCdXR0b25Eb3duID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIFwiYXJyb3dkb3duXCIsIFwicm93ZG93blwiLCA0MDAsIHdpbmRvdy5pbm5lckhlaWdodCAtIDMwLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vdXBkYXRlIGJvYXJkL21hdHJpeFxuICAgICAgICAgICAgdGhpcy5yZWR1Y2VHcmlkKCk7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcblxuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICB2YXIgY29sc0J1dHRvblVwID0gbmV3IEJ0bih0aGlzLnN0YWdlLCB0aGlzLmxvYWRlci5yZXNvdXJjZXMsIFwiYXJyb3d1cFwiLCBcImNvbHN1cFwiLCA2MDUsIHdpbmRvdy5pbm5lckhlaWdodCAtIDQ1LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vdXBkYXRlIGJvYXJkL21hdHJpeFxuICAgICAgICAgICAgdGhpcy5pbmNyZWFzZUdyaWQoKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIHZhciBjb2xzQnV0dG9uRG93biA9IG5ldyBCdG4odGhpcy5zdGFnZSwgdGhpcy5sb2FkZXIucmVzb3VyY2VzLCBcImFycm93ZG93blwiLCBcImNvbHNkb3duXCIsIDYwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gMzAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy91cGRhdGUgYm9hcmQvbWF0cml4XG4gICAgICAgICAgICB0aGlzLnJlZHVjZUdyaWQoKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgfVxuICAgIHByaXZhdGUgbW92ZVBsYXllciA9IGZ1bmN0aW9uKGdyaWRJbmRleDpudW1iZXIpOiB2b2lkIHtcbiAgICAgIC8vZ3JhcGhpYyBvZmZzZXRcbiAgICAgIHZhciBwYWR4ID0gdGhpcy5zcXVhcmVjb250YWluZXIueCArIDI1O1xuICAgICAgdmFyIHBhZHkgPSB0aGlzLnNxdWFyZWNvbnRhaW5lci55ICsgNDA7XG4gICAgICAvL2NhbGN1bGF0ZSBwb3NpdGlvblxuICAgICAgdmFyIHBvc3ggPSB0aGlzLmdyaWRbZ3JpZEluZGV4XS54ICogdGhpcy5hbGdvcml0aG0uc3BhY2luZyArIHBhZHg7XG4gICAgICB2YXIgcG9zeSA9IHRoaXMuZ3JpZFtncmlkSW5kZXhdLnkgKiB0aGlzLmFsZ29yaXRobS5zcGFjaW5nICsgcGFkeTtcblxuICAgICAgY3JlYXRlanMuVHdlZW4uZ2V0KHRoaXMucGxheWVyKS50byh7IHg6cG9zeCwgeTpwb3N5LCBkZWxheToyMDAwfSwxMDAwLCBjcmVhdGVqcy5FYXNlLnF1YWRPdXQpO1xuXG4gICAgfVxuICAgIHByaXZhdGUgY3JlYXRlUGxheWVyID0gZnVuY3Rpb24oKTogdm9pZCB7XG5cbiAgICAgIC8vZ2V0IHJhbmRvbSBwb3NpdGlvblxuICAgICAgdmFyIHJhbiA9IHRoaXMuYWxnb3JpdGhtLnJhbmRvbVN0YXJ0KCk7XG5cbiAgICAgIC8vZ3JhcGhpYyBvZmZzZXRcbiAgICAgIHZhciBwYWR4ID0gdGhpcy5zcXVhcmVjb250YWluZXIueCArIDI1O1xuICAgICAgdmFyIHBhZHkgPSB0aGlzLnNxdWFyZWNvbnRhaW5lci55ICsgNDA7XG4gICAgICAvL2NhbGN1bGF0ZSBwb3NpdGlvblxuICAgICAgdmFyIHBvc3ggPSB0aGlzLmdyaWRbcmFuXS54ICogdGhpcy5hbGdvcml0aG0uc3BhY2luZyArIHBhZHg7XG4gICAgICB2YXIgcG9zeSA9IHRoaXMuZ3JpZFtyYW5dLnkgKiB0aGlzLmFsZ29yaXRobS5zcGFjaW5nICsgcGFkeTtcblxuICAgICAgLy9wbGF5ZXJcbiAgICAgIHRoaXMucGxheWVyID0gdGhpcy5zcHJpdGVzLnBsYXllcl9ibHVlO1xuICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnBsYXllcik7XG4gICAgICB0aGlzLnBsYXllci5hbmNob3Iuc2V0KDAuNSwwLjgpO1xuICAgICAgdGhpcy5wbGF5ZXIucG9zaXRpb24ueCA9IHBvc3g7XG4gICAgICB0aGlzLnBsYXllci5wb3NpdGlvbi55ID0gcG9zeTtcblxuICAgICAgdGhpcy5zb3VuZHMucGxheShcInN0YXJ0XCIpO1xuXG4gICAgICB0aGlzLm1vdmVQbGF5ZXIodGhpcy5hbGdvcml0aG0ucmFuZG9tU3RhcnQoKSk7XG4gICAgfVxuICAgIHByaXZhdGUgaXNFdmVuID0gZnVuY3Rpb24obikge1xuICAgICAgICByZXR1cm4gbiAlIDIgPT0gMDtcbiAgICB9XG4gICAgcHJpdmF0ZSBjcmVhdGVHcmlkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuZ3JpZCA9IHRoaXMuYWxnb3JpdGhtLnJlc2V0KCk7XG5cbiAgICAgICAgaWYodGhpcy5zcXVhcmVjb250YWluZXIpe1xuICAgICAgICAgIHRoaXMuc3F1YXJlY29udGFpbmVyLmRlc3Ryb3kodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zcXVhcmVjb250YWluZXIgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnNxdWFyZWNvbnRhaW5lcik7XG5cbiAgICAgICAgLy91c2luZyBncmFwaGljcyBmb3Igc3F1YXJlc1xuICAgICAgICB2YXIgc3F1YXJlcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XG4gICAgICAgIGxldCBzcXVhcmVjb2xvcjogbnVtYmVyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLy8gc2V0IGEgZmlsbCBhbmQgbGluZSBzdHlsZVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNFdmVuKE1hdGguZmxvb3IoaSAvIHRoaXMuYWxnb3JpdGhtLnJvd3MpKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRXZlbihpKSkge1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmVjb2xvciA9IHRoaXMuY29sb3JzLnNxdWFyZWRhcmtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcXVhcmVjb2xvciA9IHRoaXMuY29sb3JzLnNxdWFyZWxpZ2h0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0V2ZW4oaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3F1YXJlY29sb3IgPSB0aGlzLmNvbG9ycy5zcXVhcmVsaWdodFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNxdWFyZWNvbG9yID0gdGhpcy5jb2xvcnMuc3F1YXJlZGFya1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNxdWFyZXMuYmVnaW5GaWxsKHNxdWFyZWNvbG9yLCAwLjUpO1xuICAgICAgICAgICAgc3F1YXJlcy5saW5lU3R5bGUoMSwgdGhpcy5jb2xvcnMubGluZXMsIDEpO1xuICAgICAgICAgICAgdmFyIHggPSAoaSAlIHRoaXMuYWxnb3JpdGhtLmNvbHMpICogdGhpcy5hbGdvcml0aG0uc3BhY2luZztcbiAgICAgICAgICAgIHZhciB5ID0gTWF0aC5mbG9vcihpIC8gdGhpcy5hbGdvcml0aG0ucm93cykgKiB0aGlzLmFsZ29yaXRobS5zcGFjaW5nO1xuICAgICAgICAgICAgc3F1YXJlcy5kcmF3UmVjdCh4LCB5LCB0aGlzLmFsZ29yaXRobS5zcGFjaW5nLCB0aGlzLmFsZ29yaXRobS5zcGFjaW5nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNxdWFyZWNvbnRhaW5lci5hZGRDaGlsZChzcXVhcmVzKTtcblxuICAgICAgICAvLyBDZW50ZXIgb24gdGhlIHNjcmVlblxuICAgICAgICB0aGlzLnNxdWFyZWNvbnRhaW5lci54ID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gdGhpcy5zcXVhcmVjb250YWluZXIud2lkdGgpIC8gMjtcbiAgICAgICAgdGhpcy5zcXVhcmVjb250YWluZXIueSA9ICh3aW5kb3cuaW5uZXJIZWlnaHQgLSB0aGlzLnNxdWFyZWNvbnRhaW5lci5oZWlnaHQpIC8gMjtcbiAgICAgICAgdGhpcy5jcmVhdGVQbGF5ZXIoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUxpbmUgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcblxuICAgICAgICAvLyBzZXQgYSBmaWxsIGFuZCBsaW5lIHN0eWxlXG4gICAgICAgIHRoaXMubGluZS5saW5lU3R5bGUoMC41LCB0aGlzLmNvbG9ycy5saW5lLCAwLjUpO1xuXG4gICAgICAgIC8vIGRyYXcgYSBzaGFwZVxuICAgICAgICB0aGlzLmxpbmUubW92ZVRvKDEwMCwgd2luZG93LmlubmVySGVpZ2h0IC0gNzApO1xuICAgICAgICB0aGlzLmxpbmUubGluZVRvKHdpbmRvdy5pbm5lcldpZHRoIC0gMTAwLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSA3MCk7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLmxpbmUpO1xuICAgIH1cbiAgICBwcml2YXRlIGNyZWF0ZVRleHQgPSBmdW5jdGlvbigpOiB2b2lkIHtcbiAgICAgICAgLy90ZXh0IHRlc3RcbiAgICAgICAgbGV0IHN0eWxlID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdIZWx2ZXRpY2EnLFxuICAgICAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZmlsbDogdGhpcy5jb2xvcnMuZm9udCxcbiAgICAgICAgICAgIC8vIHN0cm9rZTogJyM0YTE4NTAnLFxuICAgICAgICAgICAgLy8gc3Ryb2tlVGhpY2tuZXNzOiA1LFxuICAgICAgICAgICAgZHJvcFNoYWRvdzogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0JsdXI6IDQsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0Rpc3RhbmNlOiA2LFxuICAgICAgICAgICAgd29yZFdyYXA6IHRydWUsXG4gICAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBoZWFkbGluZSA9IG5ldyBQSVhJLlRleHRTdHlsZSh7XG4gICAgICAgICAgICBmb250RmFtaWx5OiAnSGVsdmV0aWNhJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxOCxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZpbGw6IHRoaXMuY29sb3JzLmhlYWRsaW5lLFxuICAgICAgICAgICAgLy8gc3Ryb2tlOiAnIzRhMTg1MCcsXG4gICAgICAgICAgICAvLyBzdHJva2VUaGlja25lc3M6IDUsXG4gICAgICAgICAgICBkcm9wU2hhZG93OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIGRyb3BTaGFkb3dDb2xvcjogJyMwMDAwMDAnLFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0JsdXI6IDQsXG4gICAgICAgICAgICAvLyBkcm9wU2hhZG93QW5nbGU6IE1hdGguUEkgLyA2LFxuICAgICAgICAgICAgLy8gZHJvcFNoYWRvd0Rpc3RhbmNlOiA2LFxuICAgICAgICAgICAgd29yZFdyYXA6IHRydWUsXG4gICAgICAgICAgICB3b3JkV3JhcFdpZHRoOiA0NDBcbiAgICAgICAgfSk7XG4gICAgICAgIC8vc3RhdHVzXG4gICAgICAgIHRoaXMuc3RhdHVzID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLnN0YXR1cy54ID0gMTEwO1xuICAgICAgICB0aGlzLnN0YXR1cy55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnN0YXR1cyk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMuc3RhdHVzLCBcIkluaXRpYWxpemluZy4uLlwiLCAwLCAyMDAwKTtcblxuICAgICAgICAvL3Jvd3MgdGl0bGVcbiAgICAgICAgdGhpcy5yb3dzVGl0bGUgPSBuZXcgUElYSS5UZXh0KCcuLi4nLCBzdHlsZSk7XG4gICAgICAgIHRoaXMucm93c1RpdGxlLnggPSAzMDA7XG4gICAgICAgIHRoaXMucm93c1RpdGxlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMucm93c1RpdGxlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5yb3dzVGl0bGUsIFwicm93czpcIiwgMCwgMzUwMCk7XG5cbiAgICAgICAgLy9yb3dzIHZhbHVlXG4gICAgICAgIHRoaXMucm93c1ZhbHVlID0gbmV3IFBJWEkuVGV4dCgnLi4uJywgaGVhZGxpbmUpO1xuICAgICAgICB0aGlzLnJvd3NWYWx1ZS54ID0gMzUwO1xuICAgICAgICB0aGlzLnJvd3NWYWx1ZS55ID0gd2luZG93LmlubmVySGVpZ2h0IC0gNTA7XG5cbiAgICAgICAgdGhpcy5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvd3NWYWx1ZSk7XG4gICAgICAgIHRoaXMudHlwZU1lKHRoaXMucm93c1ZhbHVlLCB0aGlzLmFsZ29yaXRobS5yb3dzLnRvU3RyaW5nKCksIDAsIDQwMDApO1xuXG4gICAgICAgIC8vY29scyB0aXRsZVxuICAgICAgICB0aGlzLmNvbHNUaXRsZSA9IG5ldyBQSVhJLlRleHQoJy4uLjonLCBzdHlsZSk7XG4gICAgICAgIHRoaXMuY29sc1RpdGxlLnggPSA1MDA7XG4gICAgICAgIHRoaXMuY29sc1RpdGxlLnkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSA1MDtcblxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuY29sc1RpdGxlKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5jb2xzVGl0bGUsICdjb2xzOicsIDAsIDQ1MDApO1xuXG4gICAgICAgIC8vIC8vY29scyB2YWx1ZVxuICAgICAgICB0aGlzLmNvbHNWYWx1ZSA9IG5ldyBQSVhJLlRleHQoJy4uLicsIGhlYWRsaW5lKTtcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUueCA9IDU1MDtcbiAgICAgICAgdGhpcy5jb2xzVmFsdWUueSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIDUwO1xuXG4gICAgICAgIHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5jb2xzVmFsdWUpO1xuICAgICAgICB0aGlzLnR5cGVNZSh0aGlzLmNvbHNWYWx1ZSwgdGhpcy5hbGdvcml0aG0uY29scy50b1N0cmluZygpLCAwLCA1MDAwKTtcbiAgICAgICAgdGhpcy50eXBlTWUodGhpcy5zdGF0dXMsIFwiUmVhZHlcIiwgMCwgNjAwMCk7XG5cbiAgICB9XG4gICAgcHJpdmF0ZSB0eXBlTWUgPSBmdW5jdGlvbih0ZXh0T2JqOiBQSVhJLlRleHQsIG1lc3NhZ2U6IHN0cmluZywgbWVzc2FnZUxlbmd0aDogbnVtYmVyLCBkZWxheTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UgKyAnIHwgJyArIG1lc3NhZ2VMZW5ndGgpO1xuICAgICAgICBpZiAobWVzc2FnZUxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInN0YXJ0aW5nIHR5cGVcIik7XG4gICAgICAgICAgICB0ZXh0T2JqLnRleHQgPSBcIlwiO1xuICAgICAgICAgICAgbWVzc2FnZUxlbmd0aCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvL2xvb3AgdGhyb3VnaCB0eXBpbmdcbiAgICAgICAgbGV0IG5ld1N0cmluZzogc3RyaW5nID0gbWVzc2FnZS5zdWJzdHJpbmcoMCwgbWVzc2FnZUxlbmd0aCk7XG4gICAgICAgIHRleHRPYmoudGV4dCA9IG5ld1N0cmluZztcbiAgICAgICAgaWYgKG1lc3NhZ2VMZW5ndGggPj0gMSkge1xuICAgICAgICAgICAgdGhpcy5zb3VuZHMucGxheShcImtleXByZXNzXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5ld1N0cmluZyk7XG4gICAgICAgIC8vaW5jcmVtZW50IGxlbmd0aCBvZiBtZXNzYWdlXG4gICAgICAgIG1lc3NhZ2VMZW5ndGgrKztcblxuICAgICAgICBpZiAobWVzc2FnZUxlbmd0aCA8IG1lc3NhZ2UubGVuZ3RoICsgMSkge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLnR5cGVNZS5iaW5kKHRoaXMsIHRleHRPYmosIG1lc3NhZ2UsIG1lc3NhZ2VMZW5ndGgsIDUwKSwgZGVsYXkpO1xuICAgICAgICAgICAgLy8gc2V0VGltZW91dCh0aGlzLmRlY2xhcmUuYmluZCh0aGlzKSwgMTAwMCk7XG4gICAgICAgIH1cblxuICAgIH1cbn1cbiIsIi8vc291cmNlc1xuLy9odHRwczovL2NvZGUudHV0c3BsdXMuY29tL2FydGljbGVzL2RhdGEtc3RydWN0dXJlcy13aXRoLWphdmFzY3JpcHQtc2luZ2x5LWxpbmtlZC1saXN0LWFuZC1kb3VibHktbGlua2VkLWxpc3QtLWNtcy0yMzM5MlxuLy9odHRwOi8vdGVjaGllbWUuaW4vZmluZGluZy1sb29wLWluLWxpbmtlZC1saXN0L1xuXG4vL0EgU2luZ2x5LUxpbmtlZCBMaXN0XG4vL0luIGNvbXB1dGVyIHNjaWVuY2UsIGEgc2luZ2x5LWxpbmtlZCBsaXN0IGlzIGEgZGF0YSBzdHJ1Y3R1cmVcbi8vdGhhdCBob2xkcyBhIHNlcXVlbmNlIG9mIGxpbmtlZCBub2Rlcy4gRWFjaCBub2RlLCBpbiB0dXJuLCBjb250YWlucyBkYXRhIGFuZCBhIHBvaW50ZXIsIHdoaWNoIGNhbiBwb2ludCB0byBhbm90aGVyIG5vZGUuXG5cbmV4cG9ydCBjbGFzcyBTaW5nbHlMaW5rZWRMaXN0IHtcbiAgY29uc3RydWN0b3IoKXtcblxuICB9XG4gICAgcHJpdmF0ZSBOb2RlID0gZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMubmV4dCA9IG51bGw7XG4gICAgfVxuICAgIHByaXZhdGUgU2luZ2x5TGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmhlYWQgPSBudWxsO1xuICAgIH1cbiAgICBwcml2YXRlIGFkZCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciBub2RlID0gbmV3IHRoaXMuTm9kZSh2YWx1ZSksXG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IHRoaXMuaGVhZDtcblxuICAgICAgICAvLyAxc3QgdXNlLWNhc2U6IGFuIGVtcHR5IGxpc3RcbiAgICAgICAgaWYgKCFjdXJyZW50Tm9kZSkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gbm9kZTtcbiAgICAgICAgICAgIHRoaXMuX2xlbmd0aCsrO1xuXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIDJuZCB1c2UtY2FzZTogYSBub24tZW1wdHkgbGlzdFxuICAgICAgICB3aGlsZSAoY3VycmVudE5vZGUubmV4dCkge1xuICAgICAgICAgICAgY3VycmVudE5vZGUgPSBjdXJyZW50Tm9kZS5uZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudE5vZGUubmV4dCA9IG5vZGU7XG5cbiAgICAgICAgdGhpcy5fbGVuZ3RoKys7XG5cbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfTtcblxuICAgIHByaXZhdGUgc2VhcmNoTm9kZUF0ID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5oZWFkLFxuICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5fbGVuZ3RoLFxuICAgICAgICAgICAgY291bnQgPSAxLFxuICAgICAgICAgICAgbWVzc2FnZSA9IHtmYWlsdXJlOiAnRmFpbHVyZTogbm9uLWV4aXN0ZW50IG5vZGUgaW4gdGhpcyBsaXN0Lid9O1xuXG4gICAgICAgIC8vIDFzdCB1c2UtY2FzZTogYW4gaW52YWxpZCBwb3NpdGlvblxuICAgICAgICBpZiAobGVuZ3RoID09PSAwIHx8IHBvc2l0aW9uIDwgMSB8fCBwb3NpdGlvbiA+IGxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UuZmFpbHVyZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAybmQgdXNlLWNhc2U6IGEgdmFsaWQgcG9zaXRpb25cbiAgICAgICAgd2hpbGUgKGNvdW50IDwgcG9zaXRpb24pIHtcbiAgICAgICAgICAgIGN1cnJlbnROb2RlID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3VycmVudE5vZGU7XG4gICAgfTtcblxuICAgIHByaXZhdGUgcmVtb3ZlID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICAgICAgdmFyIGN1cnJlbnROb2RlID0gdGhpcy5oZWFkLFxuICAgICAgICAgICAgbGVuZ3RoID0gdGhpcy5fbGVuZ3RoLFxuICAgICAgICAgICAgY291bnQgPSAwLFxuICAgICAgICAgICAgbWVzc2FnZSA9IHtmYWlsdXJlOiAnRmFpbHVyZTogbm9uLWV4aXN0ZW50IG5vZGUgaW4gdGhpcyBsaXN0Lid9LFxuICAgICAgICAgICAgYmVmb3JlTm9kZVRvRGVsZXRlID0gbnVsbCxcbiAgICAgICAgICAgIG5vZGVUb0RlbGV0ZSA9IG51bGwsXG4gICAgICAgICAgICBkZWxldGVkTm9kZSA9IG51bGw7XG5cbiAgICAgICAgLy8gMXN0IHVzZS1jYXNlOiBhbiBpbnZhbGlkIHBvc2l0aW9uXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDAgfHwgcG9zaXRpb24gPiBsZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlLmZhaWx1cmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gMm5kIHVzZS1jYXNlOiB0aGUgZmlyc3Qgbm9kZSBpcyByZW1vdmVkXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gY3VycmVudE5vZGUubmV4dDtcbiAgICAgICAgICAgIGRlbGV0ZWROb2RlID0gY3VycmVudE5vZGU7XG4gICAgICAgICAgICBjdXJyZW50Tm9kZSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9sZW5ndGgtLTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZWROb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gM3JkIHVzZS1jYXNlOiBhbnkgb3RoZXIgbm9kZSBpcyByZW1vdmVkXG4gICAgICAgIHdoaWxlIChjb3VudCA8IHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBiZWZvcmVOb2RlVG9EZWxldGUgPSBjdXJyZW50Tm9kZTtcbiAgICAgICAgICAgIG5vZGVUb0RlbGV0ZSA9IGN1cnJlbnROb2RlLm5leHQ7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgYmVmb3JlTm9kZVRvRGVsZXRlLm5leHQgPSBub2RlVG9EZWxldGUubmV4dDtcbiAgICAgICAgZGVsZXRlZE5vZGUgPSBub2RlVG9EZWxldGU7XG4gICAgICAgIG5vZGVUb0RlbGV0ZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2xlbmd0aC0tO1xuXG4gICAgICAgIHJldHVybiBkZWxldGVkTm9kZTtcbiAgICAgIH07XG59O1xuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFsyMTIsIDE2NjRdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICBrZXlwcmVzczogWzEwLCA1NF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcbmltcG9ydCB7IFNvdW5kRWZmZWN0cyB9IGZyb20gXCIuL1NvdW5kRWZmZWN0c1wiO1xuaW1wb3J0IHsgR3VpIH0gZnJvbSBcIi4vR3VpXCI7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOkNvbG9yUGFsZXR0ZXM7XG5cbi8vIExvYWQgR3VpIGFmdGVyIGNvbG9yc1xubGV0IG1haW5ndWk6YW55O1xuXG4vL2xvYWQgY29sb3IgcGFsZXR0ZVxubGV0IGNoYW5nZUNvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpe1xuICBDT0xPUkxJQi5sb2FkQ29sb3JzKHBpbmRleClcbiAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb2xvcnMgPSBkYXRhO1xuICAgIHNldHVwUGl4aSgpO1xuICB9KVxuICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0F1Z2gsIHRoZXJlIHdhcyBhbiBlcnJvciEnLCBlcnIpO1xuICB9KTtcbn1cbmNoYW5nZUNvbG9ycygwKTtcblxuLy9DcmVhdGUgdGhlIGFwcFxubGV0IHJlbmRlcmVyOiBhbnk7XG5sZXQgc3RhZ2U6IFBJWEkuQ29udGFpbmVyO1xuXG4vL2J1dHRvblxubGV0IHBsYXlCdXR0b25XYWl0O1xubGV0IHBsYXlCdXR0b25Eb3duO1xubGV0IHBsYXlCdXR0b25PdmVyO1xubGV0IHBsYXlCdXR0b247XG5cbmxldCBzZXR1cFBpeGkgPSBmdW5jdGlvbigpOnZvaWR7XG5cbiAgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcig5NjAsNTQwLFxuICAgIHthbnRpYWxpYXM6IHRydWUsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMSwgYXV0b1Jlc2l6ZTogdHJ1ZX1cbiAgKTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIC8vQ3JlYXRlIGEgY29udGFpbmVyIG9iamVjdCBjYWxsZWQgdGhlIGBzdGFnZWBcbiAgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gIC8vQWRkIHRoZSBjYW52YXMgdG8gdGhlIEhUTUwgZG9jdW1lbnRcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICAvL1VwZGF0ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbG9yc1snYmFja2dyb3VuZCddO1xuXG4gIGRyYXdTY2VuZSgpO1xufVxuXG4vL0RyYXcgc2NlbmVcbmxldCBkcmF3U2NlbmUgPSBmdW5jdGlvbigpe1xuICAgIC8vaW5pdCBHdWkgcGFzcyBpbiBjb2xvcnNcbiAgICBtYWluZ3VpID0gbmV3IEd1aSggc3RhZ2UsIGNvbG9ycywgU09VTkRMSUIpO1xuICAgIC8vc3RhcnQgcmVuZGVyaW5nIGVuZ2luZVxuICAgIGdhbWVMb29wKCk7XG4gICAgY29uc29sZS5sb2coXCJzdGFydGVkIGdhbWVMb29wXCIpO1xufTtcbmxldCBnYW1lTG9vcCA9IGZ1bmN0aW9uKCk6dm9pZHtcbiAgLy9sb29wIDYwIGZyYW1lcyBwZXIgc2Vjb25kXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG5cbiAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKTtcbn1cblxuXG4vLyAvL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbi8vICAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG4vLyB9XG4vLyAvL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbi8vIGxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4vLyAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8gICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4vLyAgIC8vIGFwcC52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbi8vICAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4vLyAgIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xuLy8gfVxuIl19
