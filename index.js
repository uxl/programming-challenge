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
                typing: [6000, 5000],
                error: [6000, 5000],
                move: [6000, 5000]
            }
        });
    }
}
exports.SoundEffects = SoundEffects;

},{"howler":undefined}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Playbtn {
    constructor() {
        //load textures
        // this.btnwait = PIXI.Texture.fromImage('src/graphics/arrow_wait.svg', false,  PIXI.SCALE_MODES.LINEAR, 1.0);
        // // this.btnpress = PIXI.Texture.fromImage('src/graphics/arrow_press.svg', false,  PIXI.SCALE_MODES.LINEAR, 1.0);
        // // this.btnerror = PIXI.Texture.fromImage('src/graphics/arrow_error.svg', false,  PIXI.SCALE_MODES.LINEAR, 1.0);
        //
        // this.brt = new PIXI.BaseRenderTexture(28, 44, PIXI.SCALE_MODES.LINEAR, 1);
        // this.rt = new PIXI.RenderTexture(this.brt);
        //
        // this.btn = new PIXI.Sprite(this.btnwait);
    }
}
exports.Playbtn = Playbtn;
// this.btn.buttonMode = true;
// this.btn.anchor.set(0.5);
// this.btn.x = 0;
// this.btn.y = 0;
// make the button interactive
//   this.btn.interactive = true;
//   this.btn.buttonMode = true;
//
//   this.btn
//         // Mouse & touch events are normalized into
//         // the pointer* events for handling different
//         // button events.
//         .on('pointerdown', this.onButtonDown)
//         .on('pointerup', this.onButtonUp)
//         .on('pointerupoutside', this.onButtonUp)
//         .on('pointerover', this.onButtonOver)
//         .on('pointerout', this.onButtonOut);
// }
//   public appear = function(snd:string):void{
//
//   }
//   private onButtonDown = function() {
//       this.isdown = true;
//       this.texture = this.textureButtonDown;
//       this.alpha = 1;
//   }
//
//   private onButtonUp = function() {
//   this.isdown = false;
//     if (this.isOver) {
//       this.texture = this.textureButtonOver;
//     }
//     else {
//       this.texture = this.textureButton;
//     }
//   }
//
//   private onButtonOver = function() {
//     this.isOver = true;
//     if (this.isdown) {
//         return;
//     }
//     this.texture = this.textureButtonOver;
//   }
//
//   private onButtonOut = function() {
//       this.isOver = false;
//       if (this.isdown) {
//           return;
//       }
//       this.texture = this.textureButton;
//   }
// }

},{}],4:[function(require,module,exports){
/// <reference path="../typings/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const ColorPalettes_1 = require("./ColorPalettes");
const SoundEffects_1 = require("./SoundEffects");
const playbtn_1 = require("./graphics/playbtn");
//Get color information
const COLORLIB = new ColorPalettes_1.ColorPalettes;
let colors;
//Get sound effects
const SOUNDLIB = new SoundEffects_1.SoundEffects;
const play_button = new playbtn_1.Playbtn;
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
        .load(drawScene);
};
//Draw scene
let drawScene = function () {
    //single object test
    var bluearrow = new PIXI.Sprite(PIXI.loader.resources["src/graphics/arrow_blue.png"].texture);
    stage.addChild(bluearrow);
    bluearrow.position.x = 200;
    bluearrow.position.y = 200;
    playButtonWait = PIXI.loader.resources["src/graphics/arrow_wait.png"].texture;
    playButtonDown = PIXI.loader.resources["src/graphics/arrow_error.png"].texture;
    playButtonOver = PIXI.loader.resources["src/graphics/arrow_press.png"].texture;
    playButton = new PIXI.Sprite(playButtonWait);
    playButton.anchor.set(0.5);
    playButton.x = 500;
    playButton.y = 400;
    // make the playButton interactive...
    playButton.interactive = true;
    playButton.buttonMode = true;
    playButton
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);
    stage.addChild(playButton);
    // make the playButton interactive...
    playButton.interactive = true;
    playButton.buttonMode = true;
    //grid test
    // // Create a 5x5 grid
    for (var i = 0; i < 100; i++) {
        var mark = new PIXI.Sprite(PIXI.loader.resources["src/graphics/mark_bracket.png"].texture);
        mark.anchor.set(0.5);
        mark.x = (i % 10) * 100;
        mark.y = Math.floor(i / 10) * 100;
        mark.scale.x = 1;
        mark.scale.y = 1;
        stage.addChild(mark);
    }
    //Tell the 'app' to 'render' the 'stage'
    renderer.render(stage);
};
function onButtonDown() {
    console.log("buttondown");
    this.isdown = true;
    playButton.setTexture = playButtonOver;
    this.alpha = 1;
}
function onButtonUp() {
    this.isdown = false;
    this.texture = playButtonWait;
}
function onButtonOver() {
    console.log("buttonover");
    this.isOver = true;
    this.texture = playButtonOver;
    this.alpha = 1;
}
function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
        return;
    }
    this.texture = playButtonWait;
}

},{"./ColorPalettes":1,"./SoundEffects":2,"./graphics/playbtn":3,"pixi.js":undefined}]},{},[4])(4)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvU291bmRFZmZlY3RzLnRzIiwic3JjL2dyYXBoaWNzL3BsYXlidG4udHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBSUk7UUFFTyxlQUFVLEdBQUcsVUFBUyxNQUFhO1lBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFTLE9BQU8sRUFBRSxNQUFNO2dCQUN2QyxJQUFJLEdBQUcsR0FBVyxpQkFBaUIsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLEdBQVEsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksSUFBUyxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxNQUFNO29CQUNWO3dCQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsV0FBVzs0QkFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ3BDLElBQUksYUFBYSxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ2pELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDekIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUE7d0JBQ3ZFLENBQUM7b0JBQ0gsQ0FBQyxDQUFDO2dCQUVGLEdBQUcsQ0FBQyxP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eEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7SUFDOUIsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFFbkIsQ0FBQztBQUVEO0lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDcEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDZCxNQUFNLENBQUM7SUFDWCxDQUFDO0lBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7QUFDbEMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQge0lQYWxldHRlfSBmcm9tICcuL2ludGVyZmFjZXMvSVBhbGV0dGUnO1xuXG5leHBvcnQgY2xhc3MgQ29sb3JQYWxldHRlcyB7XG4gICAgcHJpdmF0ZSBwYWxldHRlSW5kZXg6IDA7XG4gICAgcHVibGljIHBhbGV0dGVzOiBudWxsO1xuICAgIHByaXZhdGUgYWN0aXZlUGFsZXR0ZTogbnVsbDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKTpQcm9taXNlPGFueT4ge1xuICAgICAgdGhpcy5wYWxldHRlSW5kZXggPSBwaW5kZXg7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGxldCB1cmw6IHN0cmluZyA9ICdzcmMvY29sb3JzLmpzb24nO1xuICAgICAgICAgICAgbGV0IHhocjogYW55ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB4aHIub3BlbignR0VUJywgdXJsKTtcbiAgICAgICAgICAgIHZhciBkYXRhOiBhbnk7XG4gICAgICAgICAgICB4aHIub25sb2FkID1cbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgLy8gU3VjY2VzcyFcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aXZlUGFsZXR0ZTpJUGFsZXR0ZSA9IGRhdGEuY29sb3JzW3BpbmRleF07XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShhY3RpdmVQYWxldHRlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgSG93bCB9IGZyb20gXCJob3dsZXJcIjtcblxuZXhwb3J0IGNsYXNzIFNvdW5kRWZmZWN0cyB7XG4gIHB1YmxpYyBzbmRzcHJpdGU6SG93bDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIC8vbG9hZCBzcHJpdGVcbiAgICAgIHRoaXMuc25kc3ByaXRlID0gbmV3IEhvd2woe1xuICAgICAgc3JjOiBbJ3NyYy9hdWRpby9zcHJpdGUud2F2J10sXG4gICAgICBzcHJpdGU6IHtcbiAgICAgICAgc3RhcnQ6IFswLCAzMDAwXSxcbiAgICAgICAgZG90OiBbNDAwMCwgMTAwMF0sXG4gICAgICAgIGxpbmU6IFs2MDAwLCA1MDAwXSxcbiAgICAgICAgdHlwaW5nOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIGVycm9yOiBbNjAwMCwgNTAwMF0sXG4gICAgICAgIG1vdmU6IFs2MDAwLCA1MDAwXVxuICAgICAgfVxuICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgcGxheSA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gICAgICBjb25zb2xlLmxvZyhcInNuZFwiLCBzbmQpO1xuICAgICAgdGhpcy5zbmRzcHJpdGUucGxheShzbmQpO1xuICAgIH1cbiAgfVxuIiwiaW1wb3J0ICogYXMgUElYSSBmcm9tIFwicGl4aS5qc1wiO1xuXG5leHBvcnQgY2xhc3MgUGxheWJ0biB7XG4gIHB1YmxpYyBidG53YWl0OmFueTtcbiAgcHVibGljIGJ0bnByZXNzOmFueTtcbiAgcHVibGljIGJ0bmVycm9yOmFueTtcbiAgcHVibGljIGJ0bjphbnk7XG4gIHB1YmxpYyB0ZXh0dXJlQnV0dG9uOmFueTtcbiAgcHVibGljIGJydEJ1dHRvbjphbnk7XG4gIHB1YmxpYyBicnQ6YW55O1xuICBwdWJsaWMgcnQ6YW55O1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvL2xvYWQgdGV4dHVyZXNcbiAgICAvLyB0aGlzLmJ0bndhaXQgPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKCdzcmMvZ3JhcGhpY3MvYXJyb3dfd2FpdC5zdmcnLCBmYWxzZSwgIFBJWEkuU0NBTEVfTU9ERVMuTElORUFSLCAxLjApO1xuICAgIC8vIC8vIHRoaXMuYnRucHJlc3MgPSBQSVhJLlRleHR1cmUuZnJvbUltYWdlKCdzcmMvZ3JhcGhpY3MvYXJyb3dfcHJlc3Muc3ZnJywgZmFsc2UsICBQSVhJLlNDQUxFX01PREVTLkxJTkVBUiwgMS4wKTtcbiAgICAvLyAvLyB0aGlzLmJ0bmVycm9yID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZSgnc3JjL2dyYXBoaWNzL2Fycm93X2Vycm9yLnN2ZycsIGZhbHNlLCAgUElYSS5TQ0FMRV9NT0RFUy5MSU5FQVIsIDEuMCk7XG4gICAgLy9cbiAgICAvLyB0aGlzLmJydCA9IG5ldyBQSVhJLkJhc2VSZW5kZXJUZXh0dXJlKDI4LCA0NCwgUElYSS5TQ0FMRV9NT0RFUy5MSU5FQVIsIDEpO1xuICAgIC8vIHRoaXMucnQgPSBuZXcgUElYSS5SZW5kZXJUZXh0dXJlKHRoaXMuYnJ0KTtcbiAgICAvL1xuICAgIC8vIHRoaXMuYnRuID0gbmV3IFBJWEkuU3ByaXRlKHRoaXMuYnRud2FpdCk7XG4gIH1cbn1cblxuICAgIC8vIHRoaXMuYnRuLmJ1dHRvbk1vZGUgPSB0cnVlO1xuICAgIC8vIHRoaXMuYnRuLmFuY2hvci5zZXQoMC41KTtcbiAgICAvLyB0aGlzLmJ0bi54ID0gMDtcbiAgICAvLyB0aGlzLmJ0bi55ID0gMDtcblxuICAgIC8vIG1ha2UgdGhlIGJ1dHRvbiBpbnRlcmFjdGl2ZVxuICAvLyAgIHRoaXMuYnRuLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgLy8gICB0aGlzLmJ0bi5idXR0b25Nb2RlID0gdHJ1ZTtcbiAgLy9cbiAgLy8gICB0aGlzLmJ0blxuICAvLyAgICAgICAgIC8vIE1vdXNlICYgdG91Y2ggZXZlbnRzIGFyZSBub3JtYWxpemVkIGludG9cbiAgLy8gICAgICAgICAvLyB0aGUgcG9pbnRlciogZXZlbnRzIGZvciBoYW5kbGluZyBkaWZmZXJlbnRcbiAgLy8gICAgICAgICAvLyBidXR0b24gZXZlbnRzLlxuICAvLyAgICAgICAgIC5vbigncG9pbnRlcmRvd24nLCB0aGlzLm9uQnV0dG9uRG93bilcbiAgLy8gICAgICAgICAub24oJ3BvaW50ZXJ1cCcsIHRoaXMub25CdXR0b25VcClcbiAgLy8gICAgICAgICAub24oJ3BvaW50ZXJ1cG91dHNpZGUnLCB0aGlzLm9uQnV0dG9uVXApXG4gIC8vICAgICAgICAgLm9uKCdwb2ludGVyb3ZlcicsIHRoaXMub25CdXR0b25PdmVyKVxuICAvLyAgICAgICAgIC5vbigncG9pbnRlcm91dCcsIHRoaXMub25CdXR0b25PdXQpO1xuICAvLyB9XG4gIC8vICAgcHVibGljIGFwcGVhciA9IGZ1bmN0aW9uKHNuZDpzdHJpbmcpOnZvaWR7XG4gIC8vXG4gIC8vICAgfVxuICAvLyAgIHByaXZhdGUgb25CdXR0b25Eb3duID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgICAgIHRoaXMuaXNkb3duID0gdHJ1ZTtcbiAgLy8gICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy50ZXh0dXJlQnV0dG9uRG93bjtcbiAgLy8gICAgICAgdGhpcy5hbHBoYSA9IDE7XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIHByaXZhdGUgb25CdXR0b25VcCA9IGZ1bmN0aW9uKCkge1xuICAvLyAgIHRoaXMuaXNkb3duID0gZmFsc2U7XG4gIC8vICAgICBpZiAodGhpcy5pc092ZXIpIHtcbiAgLy8gICAgICAgdGhpcy50ZXh0dXJlID0gdGhpcy50ZXh0dXJlQnV0dG9uT3ZlcjtcbiAgLy8gICAgIH1cbiAgLy8gICAgIGVsc2Uge1xuICAvLyAgICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLnRleHR1cmVCdXR0b247XG4gIC8vICAgICB9XG4gIC8vICAgfVxuICAvL1xuICAvLyAgIHByaXZhdGUgb25CdXR0b25PdmVyID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgICB0aGlzLmlzT3ZlciA9IHRydWU7XG4gIC8vICAgICBpZiAodGhpcy5pc2Rvd24pIHtcbiAgLy8gICAgICAgICByZXR1cm47XG4gIC8vICAgICB9XG4gIC8vICAgICB0aGlzLnRleHR1cmUgPSB0aGlzLnRleHR1cmVCdXR0b25PdmVyO1xuICAvLyAgIH1cbiAgLy9cbiAgLy8gICBwcml2YXRlIG9uQnV0dG9uT3V0ID0gZnVuY3Rpb24oKSB7XG4gIC8vICAgICAgIHRoaXMuaXNPdmVyID0gZmFsc2U7XG4gIC8vICAgICAgIGlmICh0aGlzLmlzZG93bikge1xuICAvLyAgICAgICAgICAgcmV0dXJuO1xuICAvLyAgICAgICB9XG4gIC8vICAgICAgIHRoaXMudGV4dHVyZSA9IHRoaXMudGV4dHVyZUJ1dHRvbjtcbiAgLy8gICB9XG4gIC8vIH1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuXG5pbXBvcnQgUElYSSA9IHJlcXVpcmUoJ3BpeGkuanMnKTtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZXMgfSBmcm9tIFwiLi9Db2xvclBhbGV0dGVzXCI7XG5pbXBvcnQgeyBTb3VuZEVmZmVjdHMgfSBmcm9tIFwiLi9Tb3VuZEVmZmVjdHNcIjtcbmltcG9ydCB7IFBsYXlidG4gfSBmcm9tIFwiLi9ncmFwaGljcy9wbGF5YnRuXCI7XG5cbi8vR2V0IGNvbG9yIGluZm9ybWF0aW9uXG5jb25zdCBDT0xPUkxJQiA9IG5ldyBDb2xvclBhbGV0dGVzO1xubGV0IGNvbG9yczphbnk7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuY29uc3QgcGxheV9idXR0b24gPSBuZXcgUGxheWJ0bjtcblxuXG4vL2xvYWQgY29sb3IgcGFsZXR0ZVxubGV0IGNoYW5nZUNvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpe1xuICBDT0xPUkxJQi5sb2FkQ29sb3JzKHBpbmRleClcbiAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhLnR5cGUpO1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgc2V0dXBQaXhpKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vLyAvL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbi8vIHdpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbi8vICAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG4vLyB9XG4vLyAvL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbi8vIGxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4vLyAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4vLyAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuLy8gICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4vLyAgIC8vIGFwcC52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbi8vICAgLy8gYXBwLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbi8vICAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4vLyAgIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xuLy8gfVxuXG4vL0NyZWF0ZSB0aGUgYXBwXG5sZXQgcmVuZGVyZXI7XG5sZXQgc3RhZ2U7XG5cbi8vYnV0dG9uXG5sZXQgcGxheUJ1dHRvbldhaXQ7XG5sZXQgcGxheUJ1dHRvbkRvd247XG5sZXQgcGxheUJ1dHRvbk92ZXI7XG5sZXQgcGxheUJ1dHRvbjtcblxubGV0IHNldHVwUGl4aSA9IGZ1bmN0aW9uKCk6dm9pZHtcbiAgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcig5NjAsNTQwLFxuICAgIHthbnRpYWxpYXM6IHRydWUsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMSwgYXV0b1Jlc2l6ZTogdHJ1ZX1cbiAgKTtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgcmVuZGVyZXIudmlldy5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICByZW5kZXJlci5hdXRvUmVzaXplID0gdHJ1ZTtcbiAgcmVuZGVyZXIucmVzaXplKHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gIC8vQ3JlYXRlIGEgY29udGFpbmVyIG9iamVjdCBjYWxsZWQgdGhlIGBzdGFnZWBcbiAgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcbiAgc3RhZ2UuaW50ZXJhY3RpdmUgPSB0cnVlO1xuXG4gIC8vQWRkIHRoZSBjYW52YXMgdG8gdGhlIEhUTUwgZG9jdW1lbnRcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICAvL1VwZGF0ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbG9yc1snYmFja2dyb3VuZCddO1xuXG4gIC8vUGxheSBzdGFydHVwIHNvdW5kXG4gIFNPVU5ETElCLnBsYXkoXCJzdGFydFwiKTtcblxuICAvL2xvYWQgaW1hZ2VzXG4gIFBJWEkubG9hZGVyXG4gICAgLmFkZChbXG4gICAgICBcInNyYy9ncmFwaGljcy9hcnJvd19ibHVlLnBuZ1wiLFxuICAgICAgXCJzcmMvZ3JhcGhpY3MvYXJyb3dfeWVsbG93LnBuZ1wiLFxuICAgICAgXCJzcmMvZ3JhcGhpY3MvYXJyb3dfb3JhbmdlLnBuZ1wiLFxuICAgICAgXCJzcmMvZ3JhcGhpY3MvbWFya19icmFja2V0LnBuZ1wiLFxuICAgICAgXCJzcmMvZ3JhcGhpY3MvbWFya19kb3QucG5nXCIsXG4gICAgICBcInNyYy9ncmFwaGljcy9tYXJrX2JvdGgucG5nXCIsXG4gICAgICBcInNyYy9ncmFwaGljcy9hcnJvd193YWl0LnBuZ1wiLFxuICAgICAgXCJzcmMvZ3JhcGhpY3MvYXJyb3dfcHJlc3MucG5nXCIsXG4gICAgICBcInNyYy9ncmFwaGljcy9hcnJvd19lcnJvci5wbmdcIlxuXG4gICAgXSlcbiAgICAubG9hZChkcmF3U2NlbmUpO1xuXG59XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG5cbiAgLy9zaW5nbGUgb2JqZWN0IHRlc3RcbiAgdmFyIGJsdWVhcnJvdyA9IG5ldyBQSVhJLlNwcml0ZShcbiAgICAgIFBJWEkubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd19ibHVlLnBuZ1wiXS50ZXh0dXJlXG4gICAgKTtcbiAgICBzdGFnZS5hZGRDaGlsZChibHVlYXJyb3cpO1xuICAgIGJsdWVhcnJvdy5wb3NpdGlvbi54ID0gMjAwO1xuICAgIGJsdWVhcnJvdy5wb3NpdGlvbi55ID0gMjAwO1xuXG5cbiAgICBwbGF5QnV0dG9uV2FpdCA9IFBJWEkubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9hcnJvd193YWl0LnBuZ1wiXS50ZXh0dXJlO1xuICAgIHBsYXlCdXR0b25Eb3duID0gUElYSS5sb2FkZXIucmVzb3VyY2VzW1wic3JjL2dyYXBoaWNzL2Fycm93X2Vycm9yLnBuZ1wiXS50ZXh0dXJlO1xuICAgIHBsYXlCdXR0b25PdmVyID0gUElYSS5sb2FkZXIucmVzb3VyY2VzW1wic3JjL2dyYXBoaWNzL2Fycm93X3ByZXNzLnBuZ1wiXS50ZXh0dXJlO1xuXG4gICAgcGxheUJ1dHRvbiA9IG5ldyBQSVhJLlNwcml0ZShwbGF5QnV0dG9uV2FpdCk7XG5cbiAgICBwbGF5QnV0dG9uLmFuY2hvci5zZXQoMC41KTtcbiAgICBwbGF5QnV0dG9uLnggPSA1MDA7XG4gICAgcGxheUJ1dHRvbi55ID0gNDAwO1xuXG4gICAgLy8gbWFrZSB0aGUgcGxheUJ1dHRvbiBpbnRlcmFjdGl2ZS4uLlxuICAgIHBsYXlCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIHBsYXlCdXR0b24uYnV0dG9uTW9kZSA9IHRydWU7XG5cbiAgICBwbGF5QnV0dG9uXG4gICAgICAgLy8gTW91c2UgJiB0b3VjaCBldmVudHMgYXJlIG5vcm1hbGl6ZWQgaW50b1xuICAgICAgIC8vIHRoZSBwb2ludGVyKiBldmVudHMgZm9yIGhhbmRsaW5nIGRpZmZlcmVudFxuICAgICAgIC8vIGJ1dHRvbiBldmVudHMuXG4gICAgICAgLm9uKCdwb2ludGVyZG93bicsIG9uQnV0dG9uRG93bilcbiAgICAgICAub24oJ3BvaW50ZXJ1cCcsIG9uQnV0dG9uVXApXG4gICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgb25CdXR0b25VcClcbiAgICAgICAub24oJ3BvaW50ZXJvdmVyJywgb25CdXR0b25PdmVyKVxuICAgICAgIC5vbigncG9pbnRlcm91dCcsIG9uQnV0dG9uT3V0KTtcblxuICAgICAgIHN0YWdlLmFkZENoaWxkKHBsYXlCdXR0b24pO1xuICAgICAgIC8vIG1ha2UgdGhlIHBsYXlCdXR0b24gaW50ZXJhY3RpdmUuLi5cbiAgICAgICBwbGF5QnV0dG9uLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICBwbGF5QnV0dG9uLmJ1dHRvbk1vZGUgPSB0cnVlO1xuXG4gIC8vZ3JpZCB0ZXN0XG4gIC8vIC8vIENyZWF0ZSBhIDV4NSBncmlkXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgMTAwOyBpKyspIHtcbiAgICAgIHZhciBtYXJrID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkubG9hZGVyLnJlc291cmNlc1tcInNyYy9ncmFwaGljcy9tYXJrX2JyYWNrZXQucG5nXCJdLnRleHR1cmUpO1xuICAgICAgbWFyay5hbmNob3Iuc2V0KDAuNSk7XG4gICAgICBtYXJrLnggPSAoaSAlIDEwKSAqIDEwMDtcbiAgICAgIG1hcmsueSA9IE1hdGguZmxvb3IoaSAvIDEwKSAqIDEwMDtcbiAgICAgIG1hcmsuc2NhbGUueCA9IDE7XG4gICAgICBtYXJrLnNjYWxlLnkgPSAxO1xuICAgICAgc3RhZ2UuYWRkQ2hpbGQobWFyayk7XG4gICAgfVxuXG4gICAgLy9UZWxsIHRoZSAnYXBwJyB0byAncmVuZGVyJyB0aGUgJ3N0YWdlJ1xuICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG59O1xuZnVuY3Rpb24gb25CdXR0b25Eb3duKCkge1xuICBjb25zb2xlLmxvZyhcImJ1dHRvbmRvd25cIik7XG4gICAgdGhpcy5pc2Rvd24gPSB0cnVlO1xuICAgIHBsYXlCdXR0b24uc2V0VGV4dHVyZSA9IHBsYXlCdXR0b25PdmVyO1xuICAgIHRoaXMuYWxwaGEgPSAxO1xufVxuXG5mdW5jdGlvbiBvbkJ1dHRvblVwKCkge1xuICAgIHRoaXMuaXNkb3duID0gZmFsc2U7XG4gICAgdGhpcy50ZXh0dXJlID0gcGxheUJ1dHRvbldhaXQ7XG59XG5cbmZ1bmN0aW9uIG9uQnV0dG9uT3ZlcigpIHtcbiAgY29uc29sZS5sb2coXCJidXR0b25vdmVyXCIpO1xuXG4gICAgdGhpcy5pc092ZXIgPSB0cnVlO1xuICAgIHRoaXMudGV4dHVyZSA9IHBsYXlCdXR0b25PdmVyO1xuICAgIHRoaXMuYWxwaGEgPSAxO1xuXG59XG5cbmZ1bmN0aW9uIG9uQnV0dG9uT3V0KCkge1xuICAgIHRoaXMuaXNPdmVyID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaXNkb3duKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy50ZXh0dXJlID0gcGxheUJ1dHRvbldhaXQ7XG59XG4iXX0=
