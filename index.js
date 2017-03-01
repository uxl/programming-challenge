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

},{"howler":undefined}],3:[function(require,module,exports){
/// <reference path="../typings/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const ColorPalettes_1 = require("./ColorPalettes");
const SoundEffects_1 = require("./SoundEffects");
//Get color information
const COLORLIB = new ColorPalettes_1.ColorPalettes;
let colors;
//Get sound effects
const SOUNDLIB = new SoundEffects_1.SoundEffects;
//load color palette
let changeColors = function (pindex) {
    COLORLIB.loadColors(pindex)
        .then(function (data) {
        console.log(data.type);
        colors = data;
        drawScene();
    })
        .catch(function (err) {
        console.error('Augh, there was an error!', err);
    });
};
changeColors(0);
//Resize electron window
window.onresize = function (event) {
    updateRendererSize();
};
//Handles update of Canvas and Elements
let updateRendererSize = function () {
    let w = window.innerWidth;
    let h = window.innerHeight;
    //this part resizes the canvas but keeps ratio the same
    // renderer.view.style.width = w + "px";
    // renderer.view.style.height = h + "px";
    //this part adjusts the ratio:
    renderer.resize(w, h);
};
//Create the renderer
let renderer = PIXI.autoDetectRenderer(1920, 1080, { antialias: false, transparent: false, resolution: 1, autoResize: true });
//Draw scene
let drawScene = function () {
    //Play startup sound
    SOUNDLIB.play("start");
    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);
    //Create a contrainer object called the 'stage'
    let stage = new PIXI.Container();
    //Set background color
    renderer.backgroundColor = colors['background'];
    //Tell the 'renderer' to 'render' the 'stage'
    renderer.render(stage);
};

},{"./ColorPalettes":1,"./SoundEffects":2,"pixi.js":undefined}]},{},[3])(3)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvU291bmRFZmZlY3RzLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTtJQUlJO1FBRU8sZUFBVSxHQUFHLFVBQVMsTUFBYTtZQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtnQkFDdkMsSUFBSSxHQUFHLEdBQVcsaUJBQWlCLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxHQUFRLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLElBQVMsQ0FBQztnQkFDZCxHQUFHLENBQUMsTUFBTTtvQkFDVjt3QkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLFdBQVc7NEJBQ1gsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUNwQyxJQUFJLGFBQWEsR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNqRCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3pCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO3dCQUN2RSxDQUFDO29CQUNILENBQUMsQ0FBQztnQkFFRixHQUFHLENBQUMsT0FBTyxHQUFHO29CQUNWLE1BQU0sQ0FBQzt3QkFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQ25CLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVTtxQkFDN0IsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQztnQkFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtJQTVCRCxDQUFDO0NBNkJKO0FBbENELHNDQWtDQzs7Ozs7QUNwQ0QsbUNBQThCO0FBRTlCO0lBRUk7UUFjTyxTQUFJLEdBQUcsVUFBUyxHQUFVO1lBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQWhCQyxhQUFhO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQUksQ0FBQztZQUMxQixHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixNQUFNLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztnQkFDbEIsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDakIsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDbEIsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztnQkFDbEIsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztnQkFDbkIsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQzthQUNuQjtTQUNGLENBQUMsQ0FBQztJQUNILENBQUM7Q0FLRjtBQXBCSCxvQ0FvQkc7OztBQ3RCSCw4Q0FBOEM7OztBQUU5QyxnQ0FBaUM7QUFDakMsbURBQWdEO0FBQ2hELGlEQUE4QztBQUU5Qyx1QkFBdUI7QUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSw2QkFBYSxDQUFDO0FBQ25DLElBQUksTUFBVSxDQUFDO0FBRWYsbUJBQW1CO0FBQ25CLE1BQU0sUUFBUSxHQUFHLElBQUksMkJBQVksQ0FBQztBQUVsQyxvQkFBb0I7QUFDcEIsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFhO0lBQ3ZDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQzFCLElBQUksQ0FBQyxVQUFVLElBQUk7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLFNBQVMsRUFBRSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO1NBQ0QsS0FBSyxDQUFDLFVBQVUsR0FBRztRQUNsQixPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBQ0QsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRWhCLHdCQUF3QjtBQUN4QixNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsS0FBSztJQUMvQixrQkFBa0IsRUFBRSxDQUFDO0FBQ3ZCLENBQUMsQ0FBQTtBQUNELHVDQUF1QztBQUN2QyxJQUFJLGtCQUFrQixHQUFHO0lBQ3ZCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDMUIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUMzQix1REFBdUQ7SUFDdkQsd0NBQXdDO0lBQ3hDLHlDQUF5QztJQUN6Qyw4QkFBOEI7SUFDOUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFBO0FBRUQscUJBQXFCO0FBQ3JCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUMsSUFBSSxFQUM5QyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FDeEUsQ0FBQztBQUVGLFlBQVk7QUFDWixJQUFJLFNBQVMsR0FBRztJQUNkLG9CQUFvQjtJQUNwQixRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXZCLHFDQUFxQztJQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFekMsK0NBQStDO0lBQy9DLElBQUksS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWpDLHNCQUFzQjtJQUN0QixRQUFRLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCw2Q0FBNkM7SUFDN0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHtJUGFsZXR0ZX0gZnJvbSAnLi9pbnRlcmZhY2VzL0lQYWxldHRlJztcblxuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZXMge1xuICAgIHByaXZhdGUgcGFsZXR0ZUluZGV4OiAwO1xuICAgIHB1YmxpYyBwYWxldHRlczogbnVsbDtcbiAgICBwcml2YXRlIGFjdGl2ZVBhbGV0dGU6IG51bGw7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgIHB1YmxpYyBsb2FkQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcik6UHJvbWlzZTxhbnk+IHtcbiAgICAgIHRoaXMucGFsZXR0ZUluZGV4ID0gcGluZGV4O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSAnc3JjL2NvbG9ycy5qc29uJztcbiAgICAgICAgICAgIGxldCB4aHI6IGFueSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgICB2YXIgZGF0YTogYW55O1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9XG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MhXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGl2ZVBhbGV0dGU6SVBhbGV0dGUgPSBkYXRhLmNvbG9yc1twaW5kZXhdO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYWN0aXZlUGFsZXR0ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXZSByZWFjaGVkIG91ciB0YXJnZXQgc2VydmVyLCBidXQgaXQgcmV0dXJuZWQgYW4gZXJyb3JcIilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IEhvd2wgfSBmcm9tIFwiaG93bGVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTb3VuZEVmZmVjdHMge1xuICBwdWJsaWMgc25kc3ByaXRlOkhvd2w7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAvL2xvYWQgc3ByaXRlXG4gICAgICB0aGlzLnNuZHNwcml0ZSA9IG5ldyBIb3dsKHtcbiAgICAgIHNyYzogWydzcmMvYXVkaW8vc3ByaXRlLndhdiddLFxuICAgICAgc3ByaXRlOiB7XG4gICAgICAgIHN0YXJ0OiBbMjEyLCAxNjY0XSxcbiAgICAgICAgZG90OiBbNDAwMCwgMTAwMF0sXG4gICAgICAgIGxpbmU6IFs2MDAwLCA1MDAwXSxcbiAgICAgICAga2V5cHJlc3M6IFsxMCwgNTRdLFxuICAgICAgICBlcnJvcjogWzYwMDAsIDUwMDBdLFxuICAgICAgICBtb3ZlOiBbNjAwMCwgNTAwMF1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIHBsYXkgPSBmdW5jdGlvbihzbmQ6c3RyaW5nKTp2b2lke1xuICAgICAgY29uc29sZS5sb2coXCJzbmRcIiwgc25kKTtcbiAgICAgIHRoaXMuc25kc3ByaXRlLnBsYXkoc25kKTtcbiAgICB9XG4gIH1cbiIsIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2luZGV4LmQudHNcIiAvPlxuXG5pbXBvcnQgUElYSSA9IHJlcXVpcmUoJ3BpeGkuanMnKTtcbmltcG9ydCB7IENvbG9yUGFsZXR0ZXMgfSBmcm9tIFwiLi9Db2xvclBhbGV0dGVzXCI7XG5pbXBvcnQgeyBTb3VuZEVmZmVjdHMgfSBmcm9tIFwiLi9Tb3VuZEVmZmVjdHNcIjtcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy9HZXQgc291bmQgZWZmZWN0c1xuY29uc3QgU09VTkRMSUIgPSBuZXcgU291bmRFZmZlY3RzO1xuXG4vL2xvYWQgY29sb3IgcGFsZXR0ZVxubGV0IGNoYW5nZUNvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpe1xuICBDT0xPUkxJQi5sb2FkQ29sb3JzKHBpbmRleClcbiAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhLnR5cGUpO1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgZHJhd1NjZW5lKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbndpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbiAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG59XG4vL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbmxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4gIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4gIC8vIHJlbmRlcmVyLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuICAvLyByZW5kZXJlci52aWV3LnN0eWxlLmhlaWdodCA9IGggKyBcInB4XCI7XG4gIC8vdGhpcyBwYXJ0IGFkanVzdHMgdGhlIHJhdGlvOlxuICByZW5kZXJlci5yZXNpemUodyxoKTtcbn1cblxuLy9DcmVhdGUgdGhlIHJlbmRlcmVyXG5sZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcigxOTIwLDEwODAsXG4gIHthbnRpYWxpYXM6IGZhbHNlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4pO1xuXG4vL0RyYXcgc2NlbmVcbmxldCBkcmF3U2NlbmUgPSBmdW5jdGlvbigpe1xuICAvL1BsYXkgc3RhcnR1cCBzb3VuZFxuICBTT1VORExJQi5wbGF5KFwic3RhcnRcIik7XG5cbiAgLy9BZGQgdGhlIGNhbnZhcyB0byB0aGUgSFRNTCBkb2N1bWVudFxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4gIC8vQ3JlYXRlIGEgY29udHJhaW5lciBvYmplY3QgY2FsbGVkIHRoZSAnc3RhZ2UnXG4gIGxldCBzdGFnZSA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xuXG4gIC8vU2V0IGJhY2tncm91bmQgY29sb3JcbiAgcmVuZGVyZXIuYmFja2dyb3VuZENvbG9yID0gY29sb3JzWydiYWNrZ3JvdW5kJ107XG4gIC8vVGVsbCB0aGUgJ3JlbmRlcmVyJyB0byAncmVuZGVyJyB0aGUgJ3N0YWdlJ1xuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufTtcbiJdfQ==
