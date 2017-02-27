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
// import Howl = require("howler");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvU291bmRFZmZlY3RzLnRzIiwic3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNFQTtJQUlJO1FBRU8sZUFBVSxHQUFHLFVBQVMsTUFBYTtZQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztZQUN6QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUUsTUFBTTtnQkFDdkMsSUFBSSxHQUFHLEdBQVcsaUJBQWlCLENBQUM7Z0JBQ3BDLElBQUksR0FBRyxHQUFRLElBQUksY0FBYyxFQUFFLENBQUM7Z0JBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixJQUFJLElBQVMsQ0FBQztnQkFDZCxHQUFHLENBQUMsTUFBTTtvQkFDVjt3QkFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7NEJBQzVDLFdBQVc7NEJBQ1gsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDOzRCQUNwQyxJQUFJLGFBQWEsR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUNqRCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7d0JBQ3pCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO3dCQUN2RSxDQUFDO29CQUNILENBQUMsQ0FBQztnQkFFRixHQUFHLENBQUMsT0FBTyxHQUFHO29CQUNWLE1BQU0sQ0FBQzt3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Q3hFLENBQUM7QUFFRixZQUFZO0FBQ1osSUFBSSxTQUFTLEdBQUc7SUFDZCxvQkFBb0I7SUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV2QixxQ0FBcUM7SUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpDLCtDQUErQztJQUMvQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVqQyxzQkFBc0I7SUFDdEIsUUFBUSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsNkNBQTZDO0lBQzdDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLyBpbXBvcnQgSG93bCA9IHJlcXVpcmUoXCJob3dsZXJcIik7XG5pbXBvcnQgeyBIb3dsIH0gZnJvbSBcImhvd2xlclwiO1xuXG5leHBvcnQgY2xhc3MgU291bmRFZmZlY3RzIHtcbiAgcHVibGljIHNuZHNwcml0ZTpIb3dsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgLy9sb2FkIHNwcml0ZVxuICAgICAgdGhpcy5zbmRzcHJpdGUgPSBuZXcgSG93bCh7XG4gICAgICBzcmM6IFsnc3JjL2F1ZGlvL3Nwcml0ZS53YXYnXSxcbiAgICAgIHNwcml0ZToge1xuICAgICAgICBzdGFydDogWzAsIDMwMDBdLFxuICAgICAgICBkb3Q6IFs0MDAwLCAxMDAwXSxcbiAgICAgICAgbGluZTogWzYwMDAsIDUwMDBdLFxuICAgICAgICB0eXBpbmc6IFs2MDAwLCA1MDAwXSxcbiAgICAgICAgZXJyb3I6IFs2MDAwLCA1MDAwXSxcbiAgICAgICAgbW92ZTogWzYwMDAsIDUwMDBdXG4gICAgICB9XG4gICAgfSk7XG4gICAgfVxuICAgIHB1YmxpYyBwbGF5ID0gZnVuY3Rpb24oc25kOnN0cmluZyk6dm9pZHtcbiAgICAgIGNvbnNvbGUubG9nKFwic25kXCIsIHNuZCk7XG4gICAgICB0aGlzLnNuZHNwcml0ZS5wbGF5KHNuZCk7XG4gICAgfVxuICB9XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IFBJWEkgPSByZXF1aXJlKCdwaXhpLmpzJyk7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGVzIH0gZnJvbSBcIi4vQ29sb3JQYWxldHRlc1wiO1xuaW1wb3J0IHsgU291bmRFZmZlY3RzIH0gZnJvbSBcIi4vU291bmRFZmZlY3RzXCI7XG5cbi8vR2V0IGNvbG9yIGluZm9ybWF0aW9uXG5jb25zdCBDT0xPUkxJQiA9IG5ldyBDb2xvclBhbGV0dGVzO1xubGV0IGNvbG9yczphbnk7XG5cbi8vR2V0IHNvdW5kIGVmZmVjdHNcbmNvbnN0IFNPVU5ETElCID0gbmV3IFNvdW5kRWZmZWN0cztcblxuLy9sb2FkIGNvbG9yIHBhbGV0dGVcbmxldCBjaGFuZ2VDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKXtcbiAgQ09MT1JMSUIubG9hZENvbG9ycyhwaW5kZXgpXG4gIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YS50eXBlKTtcbiAgICBjb2xvcnMgPSBkYXRhO1xuICAgIGRyYXdTY2VuZSgpO1xuICB9KVxuICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0F1Z2gsIHRoZXJlIHdhcyBhbiBlcnJvciEnLCBlcnIpO1xuICB9KTtcbn1cbmNoYW5nZUNvbG9ycygwKTtcblxuLy9SZXNpemUgZWxlY3Ryb24gd2luZG93XG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbiAoZXZlbnQpOnZvaWR7XG4gIHVwZGF0ZVJlbmRlcmVyU2l6ZSgpO1xufVxuLy9IYW5kbGVzIHVwZGF0ZSBvZiBDYW52YXMgYW5kIEVsZW1lbnRzXG5sZXQgdXBkYXRlUmVuZGVyZXJTaXplID0gZnVuY3Rpb24oKTp2b2lke1xuICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgLy90aGlzIHBhcnQgcmVzaXplcyB0aGUgY2FudmFzIGJ1dCBrZWVwcyByYXRpbyB0aGUgc2FtZVxuICAvLyByZW5kZXJlci52aWV3LnN0eWxlLndpZHRoID0gdyArIFwicHhcIjtcbiAgLy8gcmVuZGVyZXIudmlldy5zdHlsZS5oZWlnaHQgPSBoICsgXCJweFwiO1xuICAvL3RoaXMgcGFydCBhZGp1c3RzIHRoZSByYXRpbzpcbiAgcmVuZGVyZXIucmVzaXplKHcsaCk7XG59XG5cbi8vQ3JlYXRlIHRoZSByZW5kZXJlclxubGV0IHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIoMTkyMCwxMDgwLFxuICB7YW50aWFsaWFzOiBmYWxzZSwgdHJhbnNwYXJlbnQ6IGZhbHNlLCByZXNvbHV0aW9uOiAxLCBhdXRvUmVzaXplOiB0cnVlfVxuKTtcblxuLy9EcmF3IHNjZW5lXG5sZXQgZHJhd1NjZW5lID0gZnVuY3Rpb24oKXtcbiAgLy9QbGF5IHN0YXJ0dXAgc291bmRcbiAgU09VTkRMSUIucGxheShcInN0YXJ0XCIpO1xuXG4gIC8vQWRkIHRoZSBjYW52YXMgdG8gdGhlIEhUTUwgZG9jdW1lbnRcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRyYWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgJ3N0YWdlJ1xuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcblxuICAvL1NldCBiYWNrZ3JvdW5kIGNvbG9yXG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbG9yc1snYmFja2dyb3VuZCddO1xuICAvL1RlbGwgdGhlICdyZW5kZXJlcicgdG8gJ3JlbmRlcicgdGhlICdzdGFnZSdcbiAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKTtcbn07XG4iXX0=
