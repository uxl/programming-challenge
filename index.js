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
                            resolve(data.colors[pindex]);
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
//return this.colorLibrary[this.paletteIndex];
// console.log('index: ' + colors);
// let colors: palette = JSON.parse(data);
// console.log('colors: ' + colors[index]);
// return colors[index];
// = (function (e) {
//            return function() {
//  console.log("json loaded1: " + this.colorLibrary);
//  this.colorLibrary = JSON.parse(this.responseText);
//  console.log("json loaded2: " + this.colorLibrary);
//
//              this.changePalette(0);
//            }
//        }(this));
// let colors: palette[] = [];
// let currentScheme: number;

},{}],2:[function(require,module,exports){
/// <reference path="../typings/index.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const ColorPalettes_1 = require("./ColorPalettes");
//Get color information
const COLORLIB = new ColorPalettes_1.ColorPalettes;
let colors;
//load color palette
let changeColors = function (pindex) {
    COLORLIB.loadColors(pindex)
        .then(function (data) {
        console.log(data);
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
    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);
    //Create a contrainer object called the 'stage'
    let stage = new PIXI.Container();
    //Set background color
    renderer.backgroundColor = colors['background'];
    //Tell the 'renderer' to 'render' the 'stage'
    renderer.render(stage);
};

},{"./ColorPalettes":1,"pixi.js":undefined}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ2FBO0lBSUk7UUFFTyxlQUFVLEdBQUcsVUFBUyxNQUFhO1lBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFTLE9BQU8sRUFBRSxNQUFNO2dCQUN2QyxJQUFJLEdBQUcsR0FBVyxpQkFBaUIsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLEdBQVEsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksSUFBUyxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxNQUFNO29CQUNWO3dCQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsV0FBVzs0QkFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ3BDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQy9CLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO3dCQUN2RSxDQUFDO29CQUNILENBQUMsQ0FBQztnQkFFRixHQUFHLENBQUMsT0FBTyxHQUFHO29CQUNWLE1BQU0sQ0FBQzt3QkFDSCxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07d0JBQ25CLFVBQVUsRUFBRSxHQUFHLENBQUMsVUFBVTtxQkFDN0IsQ0FBQyxDQUFDO2dCQUNQLENBQUMsQ0FBQztnQkFDRixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtJQTNCRCxDQUFDO0NBaURKO0FBdERELHNDQXNEQztBQUdPLDhDQUE4QztBQUc5QyxtQ0FBbUM7QUFDbkMsMENBQTBDO0FBQzFDLDJDQUEyQztBQUMzQyx3QkFBd0I7QUFFaEMsb0JBQW9CO0FBQ3BCLGlDQUFpQztBQUNyQixzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUNsRSxFQUFFO0FBQ0Ysc0NBQXNDO0FBQ3RDLGVBQWU7QUFDZixtQkFBbUI7QUFJbkIsOEJBQThCO0FBRTlCLDZCQUE2Qjs7O0FDNUY3Qiw4Q0FBOEM7OztBQUU5QyxnQ0FBaUM7QUFDakMsbURBQWdEO0FBRWhELHVCQUF1QjtBQUN2QixNQUFNLFFBQVEsR0FBRyxJQUFJLDZCQUFhLENBQUM7QUFDbkMsSUFBSSxNQUFVLENBQUM7QUFFZixvQkFBb0I7QUFDcEIsSUFBSSxZQUFZLEdBQUcsVUFBUyxNQUFhO0lBQ3ZDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1NBQzFCLElBQUksQ0FBQyxVQUFVLElBQUk7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2QsU0FBUyxFQUFFLENBQUM7SUFDZCxDQUFDLENBQUM7U0FDRCxLQUFLLENBQUMsVUFBVSxHQUFHO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUE7QUFDRCxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFaEIsd0JBQXdCO0FBQ3hCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBVSxLQUFLO0lBQy9CLGtCQUFrQixFQUFFLENBQUM7QUFDdkIsQ0FBQyxDQUFBO0FBQ0QsdUNBQXVDO0FBQ3ZDLElBQUksa0JBQWtCLEdBQUc7SUFDdkIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQzNCLHVEQUF1RDtJQUN2RCx3Q0FBd0M7SUFDeEMseUNBQXlDO0lBQ3pDLDhCQUE4QjtJQUM5QixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUE7QUFFRCxxQkFBcUI7QUFDckIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBQyxJQUFJLEVBQzlDLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQyxDQUN4RSxDQUFDO0FBRUYsWUFBWTtBQUNaLElBQUksU0FBUyxHQUFHO0lBQ2QscUNBQXFDO0lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUV6QywrQ0FBK0M7SUFDL0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFakMsc0JBQXNCO0lBQ3RCLFFBQVEsQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hELDZDQUE2QztJQUM3QyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbnRlcmZhY2UgcGFsZXR0ZSB7XG4gICAgYmFja2dyb3VuZDogbnVtYmVyLFxuICAgIGhlYWRsaW5lOiBudW1iZXIsXG4gICAgZm9udDogbnVtYmVyLFxuICAgIHNxdWFyZWRhcms6IG51bWJlcixcbiAgICBzcXVhcmVsaWdodDogbnVtYmVyLFxuICAgIGJ1dHRvbnNvbGlkOiBudW1iZXIsXG4gICAgYnV0dG9ub3V0bGluZTogbnVtYmVyLFxuICAgIGJ1dHRvbmJhY2tncm91bmQ6IG51bWJlcixcbiAgICBkb3Q6IG51bWJlcixcbiAgICBsaW5lOiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIENvbG9yUGFsZXR0ZXMge1xuICAgIHByaXZhdGUgcGFsZXR0ZUluZGV4OiAwO1xuICAgIHB1YmxpYyBwYWxldHRlczogbnVsbDtcbiAgICBwcml2YXRlIGFjdGl2ZVBhbGV0dGU6IG51bGw7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuICAgIHB1YmxpYyBsb2FkQ29sb3JzID0gZnVuY3Rpb24ocGluZGV4Om51bWJlcik6UHJvbWlzZTxhbnk+IHtcbiAgICAgIHRoaXMucGFsZXR0ZUluZGV4ID0gcGluZGV4O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSAnc3JjL2NvbG9ycy5qc29uJztcbiAgICAgICAgICAgIGxldCB4aHI6IGFueSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCk7XG4gICAgICAgICAgICB2YXIgZGF0YTogYW55O1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9XG4gICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MhXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhLmNvbG9yc1twaW5kZXhdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIldlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclwiKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbigpOmFueSB7XG4gICAgLy8gICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gICAgLy8gICAgIGxldCB1cmw6IHN0cmluZyA9ICdzcmMvY29sb3JzLmpzb24nO1xuICAgIC8vICAgICByZXEub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgLy8gICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgIC8vICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICAvLyAgICAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyB0YXJnZXQucGFyc2VKU09OKHJlcSwgdXJsKSB9O1xuICAgIC8vICAgICByZXEuc2VuZChudWxsKTtcbiAgICAvLyB9XG4gICAgLy8gcGFyc2VKU09OID0gZnVuY3Rpb24ocmVxLCB1cmwpOiBvYmplY3Qge1xuICAgIC8vICAgICBpZiAocmVxLnN0YXR1cyA9PSAyMDApIHtcbiAgICAvLyAgICAgICAgIHRoaXMucGFsZXR0ZXMgPSBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpO1xuICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMucGFsZXR0ZXNbdGhpcy5hY3RpdmVQYWxldHRlXTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBjaGFuZ2VQYWxldHRlID0gZnVuY3Rpb24oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImNoYW5nZVBhbGV0dGVcIik7XG4gICAgLy8gICAgIHRoaXMucGFsZXR0ZUluZGV4ID0gaW5kZXg7XG4gICAgLy8gICAgIHRoaXMuZ2V0UGFsZXR0ZSgpO1xuICAgIC8vIH1cbn1cblxuXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuY29sb3JMaWJyYXJ5W3RoaXMucGFsZXR0ZUluZGV4XTtcblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbmRleDogJyArIGNvbG9ycyk7XG4gICAgICAgIC8vIGxldCBjb2xvcnM6IHBhbGV0dGUgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29sb3JzOiAnICsgY29sb3JzW2luZGV4XSk7XG4gICAgICAgIC8vIHJldHVybiBjb2xvcnNbaW5kZXhdO1xuXG4vLyA9IChmdW5jdGlvbiAoZSkge1xuLy8gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgY29uc29sZS5sb2coXCJqc29uIGxvYWRlZDE6IFwiICsgdGhpcy5jb2xvckxpYnJhcnkpO1xuICAgICAgICAgICAgLy8gIHRoaXMuY29sb3JMaWJyYXJ5ID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAvLyAgY29uc29sZS5sb2coXCJqc29uIGxvYWRlZDI6IFwiICsgdGhpcy5jb2xvckxpYnJhcnkpO1xuLy9cbi8vICAgICAgICAgICAgICB0aGlzLmNoYW5nZVBhbGV0dGUoMCk7XG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICB9KHRoaXMpKTtcblxuXG5cbi8vIGxldCBjb2xvcnM6IHBhbGV0dGVbXSA9IFtdO1xuXG4vLyBsZXQgY3VycmVudFNjaGVtZTogbnVtYmVyO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY29sb3JzOmFueTtcblxuLy9sb2FkIGNvbG9yIHBhbGV0dGVcbmxldCBjaGFuZ2VDb2xvcnMgPSBmdW5jdGlvbihwaW5kZXg6bnVtYmVyKXtcbiAgQ09MT1JMSUIubG9hZENvbG9ycyhwaW5kZXgpXG4gIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgY29sb3JzID0gZGF0YTtcbiAgICBkcmF3U2NlbmUoKTtcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmVycm9yKCdBdWdoLCB0aGVyZSB3YXMgYW4gZXJyb3IhJywgZXJyKTtcbiAgfSk7XG59XG5jaGFuZ2VDb2xvcnMoMCk7XG5cbi8vUmVzaXplIGVsZWN0cm9uIHdpbmRvd1xud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbn1cbi8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xubGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbiAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbiAgLy8gcmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IHcgKyBcInB4XCI7XG4gIC8vIHJlbmRlcmVyLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbiAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4gIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xufVxuXG4vL0NyZWF0ZSB0aGUgcmVuZGVyZXJcbmxldCByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDE5MjAsMTA4MCxcbiAge2FudGlhbGlhczogZmFsc2UsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMSwgYXV0b1Jlc2l6ZTogdHJ1ZX1cbik7XG5cbi8vRHJhdyBzY2VuZVxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gIC8vQWRkIHRoZSBjYW52YXMgdG8gdGhlIEhUTUwgZG9jdW1lbnRcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRyYWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgJ3N0YWdlJ1xuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcblxuICAvL1NldCBiYWNrZ3JvdW5kIGNvbG9yXG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGNvbG9yc1snYmFja2dyb3VuZCddO1xuICAvL1RlbGwgdGhlICdyZW5kZXJlcicgdG8gJ3JlbmRlcicgdGhlICdzdGFnZSdcbiAgcmVuZGVyZXIucmVuZGVyKHN0YWdlKTtcbn07XG4iXX0=
