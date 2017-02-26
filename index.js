(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jiboProgrammingChallenge = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorPalettes {
    constructor() {
        this.loadColors = function () {
            return new Promise(function (resolve, reject) {
                let url = 'src/colors.json';
                let xhr = new XMLHttpRequest();
                ///GET JQUERY!!!!
                //xhr.responseType = 'json';
                //xhr.json = true,
                // xhr.setRequestHeader('application/json', 'odata=verbose');
                // xhr.setRequestHeader('Accept', 'application/json');
                xhr.open('GET', url);
                var data;
                xhr.onload =
                    function () {
                        if (this.status >= 200 && this.status < 300) {
                            // Success!
                            resolve(data = JSON.parse(xhr.responseText));
                        }
                        else {
                            // We reached our target server, but it returned an error
                        }
                    };
                // function() {
                //     if (this.status >= 200 && this.status < 300) {
                //         resolve(JSON.parse(xhr.response));
                //     } else {
                //         reject({
                //             status: this.status,
                //             statusText: xhr.statusText
                //         });
                //     }
                // };
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
let currentPalette = {};
COLORLIB.loadColors()
    .then(function (datums) {
    console.log(datums);
    currentPalette = datums;
    drawScene();
})
    .catch(function (err) {
    console.error('Augh, there was an error!', err.statusText);
});
//resize event
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
//Draw scene when color is loaded
let drawScene = function () {
    //Add the canvas to the HTML document
    document.body.appendChild(renderer.view);
    //Create a contrainer object called the 'stage'
    let stage = new PIXI.Container();
    //Set background color
    renderer.backgroundColor = currentPalette['background'];
    //Tell the 'renderer' to 'render' the 'stage'
    renderer.render(stage);
};

},{"./ColorPalettes":1,"pixi.js":undefined}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ2FBO0lBSUk7UUFFTyxlQUFVLEdBQUc7WUFDaEIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFFLE1BQU07Z0JBQ3ZDLElBQUksR0FBRyxHQUFXLGlCQUFpQixDQUFDO2dCQUNwQyxJQUFJLEdBQUcsR0FBUSxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUVwQyxpQkFBaUI7Z0JBRWpCLDRCQUE0QjtnQkFDNUIsa0JBQWtCO2dCQUNsQiw2REFBNkQ7Z0JBQzdELHNEQUFzRDtnQkFDdEQsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksSUFBUyxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxNQUFNO29CQUNWO3dCQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsV0FBVzs0QkFDWCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7d0JBQy9DLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04seURBQXlEO3dCQUUzRCxDQUFDO29CQUNILENBQUMsQ0FBQztnQkFDRixlQUFlO2dCQUNmLHFEQUFxRDtnQkFDckQsNkNBQTZDO2dCQUM3QyxlQUFlO2dCQUNmLG1CQUFtQjtnQkFDbkIsbUNBQW1DO2dCQUNuQyx5Q0FBeUM7Z0JBQ3pDLGNBQWM7Z0JBQ2QsUUFBUTtnQkFDUixLQUFLO2dCQUNMLEdBQUcsQ0FBQyxPQUFPLEdBQUc7b0JBQ1YsTUFBTSxDQUFDO3dCQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTt3QkFDbkIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO3FCQUM3QixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO0lBMUNELENBQUM7Q0FnRUo7QUFyRUQsc0NBcUVDO0FBR08sOENBQThDO0FBRzlDLG1DQUFtQztBQUNuQywwQ0FBMEM7QUFDMUMsMkNBQTJDO0FBQzNDLHdCQUF3QjtBQUVoQyxvQkFBb0I7QUFDcEIsaUNBQWlDO0FBQ3JCLHNEQUFzRDtBQUN0RCxzREFBc0Q7QUFDdEQsc0RBQXNEO0FBQ2xFLEVBQUU7QUFDRixzQ0FBc0M7QUFDdEMsZUFBZTtBQUNmLG1CQUFtQjtBQUluQiw4QkFBOEI7QUFFOUIsNkJBQTZCOzs7QUMzRzdCLDhDQUE4Qzs7O0FBRTlDLGdDQUFpQztBQUNqQyxtREFBZ0Q7QUFFaEQsdUJBQXVCO0FBQ3ZCLE1BQU0sUUFBUSxHQUFHLElBQUksNkJBQWEsQ0FBQztBQUNuQyxJQUFJLGNBQWMsR0FBTyxFQUFFLENBQUM7QUFFNUIsUUFBUSxDQUFDLFVBQVUsRUFBRTtLQUNwQixJQUFJLENBQUMsVUFBVSxNQUFNO0lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsY0FBYyxHQUFHLE1BQU0sQ0FBQztJQUN4QixTQUFTLEVBQUUsQ0FBQztBQUNkLENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxVQUFVLEdBQUc7SUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0QsQ0FBQyxDQUFDLENBQUM7QUFFSCxjQUFjO0FBQ2QsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLEtBQUs7SUFDL0Isa0JBQWtCLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUE7QUFDRCx1Q0FBdUM7QUFDdkMsSUFBSSxrQkFBa0IsR0FBRztJQUN2QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQzFCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDM0IsdURBQXVEO0lBQ3ZELHdDQUF3QztJQUN4Qyx5Q0FBeUM7SUFDekMsOEJBQThCO0lBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQTtBQUVELHFCQUFxQjtBQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFDLElBQUksRUFDOUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQ3hFLENBQUM7QUFFRixpQ0FBaUM7QUFDakMsSUFBSSxTQUFTLEdBQUc7SUFDZCxxQ0FBcUM7SUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpDLCtDQUErQztJQUMvQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVqQyxzQkFBc0I7SUFDdEIsUUFBUSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDeEQsNkNBQTZDO0lBQzdDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImludGVyZmFjZSBwYWxldHRlIHtcbiAgICBiYWNrZ3JvdW5kOiBudW1iZXIsXG4gICAgaGVhZGxpbmU6IG51bWJlcixcbiAgICBmb250OiBudW1iZXIsXG4gICAgc3F1YXJlZGFyazogbnVtYmVyLFxuICAgIHNxdWFyZWxpZ2h0OiBudW1iZXIsXG4gICAgYnV0dG9uc29saWQ6IG51bWJlcixcbiAgICBidXR0b25vdXRsaW5lOiBudW1iZXIsXG4gICAgYnV0dG9uYmFja2dyb3VuZDogbnVtYmVyLFxuICAgIGRvdDogbnVtYmVyLFxuICAgIGxpbmU6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgQ29sb3JQYWxldHRlcyB7XG4gICAgcHJpdmF0ZSBwYWxldHRlSW5kZXg6IDA7XG4gICAgcHVibGljIHBhbGV0dGVzOiBudWxsO1xuICAgIHByaXZhdGUgYWN0aXZlUGFsZXR0ZTogbnVsbDtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG4gICAgcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgICAgICAgLy8vR0VUIEpRVUVSWSEhISFcblxuICAgICAgICAgICAgLy94aHIucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xuICAgICAgICAgICAgLy94aHIuanNvbiA9IHRydWUsXG4gICAgICAgICAgICAvLyB4aHIuc2V0UmVxdWVzdEhlYWRlcignYXBwbGljYXRpb24vanNvbicsICdvZGF0YT12ZXJib3NlJyk7XG4gICAgICAgICAgICAvLyB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFdlIHJlYWNoZWQgb3VyIHRhcmdldCBzZXJ2ZXIsIGJ1dCBpdCByZXR1cm5lZCBhbiBlcnJvclxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJlc29sdmUoSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKTtcbiAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAvLyAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH07XG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIGxvYWRDb2xvcnMgPSBmdW5jdGlvbigpOmFueSB7XG4gICAgLy8gICAgIHZhciByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gICAgLy8gICAgIGxldCB1cmw6IHN0cmluZyA9ICdzcmMvY29sb3JzLmpzb24nO1xuICAgIC8vICAgICByZXEub3ZlcnJpZGVNaW1lVHlwZShcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgLy8gICAgIHJlcS5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgIC8vICAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICAvLyAgICAgcmVxLm9ubG9hZCA9IGZ1bmN0aW9uKCkgeyB0YXJnZXQucGFyc2VKU09OKHJlcSwgdXJsKSB9O1xuICAgIC8vICAgICByZXEuc2VuZChudWxsKTtcbiAgICAvLyB9XG4gICAgLy8gcGFyc2VKU09OID0gZnVuY3Rpb24ocmVxLCB1cmwpOiBvYmplY3Qge1xuICAgIC8vICAgICBpZiAocmVxLnN0YXR1cyA9PSAyMDApIHtcbiAgICAvLyAgICAgICAgIHRoaXMucGFsZXR0ZXMgPSBKU09OLnBhcnNlKHJlcS5yZXNwb25zZVRleHQpO1xuICAgIC8vICAgICAgICAgcmV0dXJuIHRoaXMucGFsZXR0ZXNbdGhpcy5hY3RpdmVQYWxldHRlXTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBjaGFuZ2VQYWxldHRlID0gZnVuY3Rpb24oaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImNoYW5nZVBhbGV0dGVcIik7XG4gICAgLy8gICAgIHRoaXMucGFsZXR0ZUluZGV4ID0gaW5kZXg7XG4gICAgLy8gICAgIHRoaXMuZ2V0UGFsZXR0ZSgpO1xuICAgIC8vIH1cbn1cblxuXG4gICAgICAgIC8vcmV0dXJuIHRoaXMuY29sb3JMaWJyYXJ5W3RoaXMucGFsZXR0ZUluZGV4XTtcblxuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdpbmRleDogJyArIGNvbG9ycyk7XG4gICAgICAgIC8vIGxldCBjb2xvcnM6IHBhbGV0dGUgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnY29sb3JzOiAnICsgY29sb3JzW2luZGV4XSk7XG4gICAgICAgIC8vIHJldHVybiBjb2xvcnNbaW5kZXhdO1xuXG4vLyA9IChmdW5jdGlvbiAoZSkge1xuLy8gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyAgY29uc29sZS5sb2coXCJqc29uIGxvYWRlZDE6IFwiICsgdGhpcy5jb2xvckxpYnJhcnkpO1xuICAgICAgICAgICAgLy8gIHRoaXMuY29sb3JMaWJyYXJ5ID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAvLyAgY29uc29sZS5sb2coXCJqc29uIGxvYWRlZDI6IFwiICsgdGhpcy5jb2xvckxpYnJhcnkpO1xuLy9cbi8vICAgICAgICAgICAgICB0aGlzLmNoYW5nZVBhbGV0dGUoMCk7XG4vLyAgICAgICAgICAgIH1cbi8vICAgICAgICB9KHRoaXMpKTtcblxuXG5cbi8vIGxldCBjb2xvcnM6IHBhbGV0dGVbXSA9IFtdO1xuXG4vLyBsZXQgY3VycmVudFNjaGVtZTogbnVtYmVyO1xuIiwiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbmltcG9ydCBQSVhJID0gcmVxdWlyZSgncGl4aS5qcycpO1xuaW1wb3J0IHsgQ29sb3JQYWxldHRlcyB9IGZyb20gXCIuL0NvbG9yUGFsZXR0ZXNcIjtcblxuLy9HZXQgY29sb3IgaW5mb3JtYXRpb25cbmNvbnN0IENPTE9STElCID0gbmV3IENvbG9yUGFsZXR0ZXM7XG5sZXQgY3VycmVudFBhbGV0dGU6YW55ID0ge307XG5cbkNPTE9STElCLmxvYWRDb2xvcnMoKVxuLnRoZW4oZnVuY3Rpb24gKGRhdHVtcykge1xuICBjb25zb2xlLmxvZyhkYXR1bXMpO1xuICBjdXJyZW50UGFsZXR0ZSA9IGRhdHVtcztcbiAgZHJhd1NjZW5lKCk7XG59KVxuLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVyci5zdGF0dXNUZXh0KTtcbn0pO1xuXG4vL3Jlc2l6ZSBldmVudFxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24gKGV2ZW50KTp2b2lke1xuICB1cGRhdGVSZW5kZXJlclNpemUoKTtcbn1cbi8vSGFuZGxlcyB1cGRhdGUgb2YgQ2FudmFzIGFuZCBFbGVtZW50c1xubGV0IHVwZGF0ZVJlbmRlcmVyU2l6ZSA9IGZ1bmN0aW9uKCk6dm9pZHtcbiAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gIC8vdGhpcyBwYXJ0IHJlc2l6ZXMgdGhlIGNhbnZhcyBidXQga2VlcHMgcmF0aW8gdGhlIHNhbWVcbiAgLy8gcmVuZGVyZXIudmlldy5zdHlsZS53aWR0aCA9IHcgKyBcInB4XCI7XG4gIC8vIHJlbmRlcmVyLnZpZXcuc3R5bGUuaGVpZ2h0ID0gaCArIFwicHhcIjtcbiAgLy90aGlzIHBhcnQgYWRqdXN0cyB0aGUgcmF0aW86XG4gIHJlbmRlcmVyLnJlc2l6ZSh3LGgpO1xufVxuXG4vL0NyZWF0ZSB0aGUgcmVuZGVyZXJcbmxldCByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKDE5MjAsMTA4MCxcbiAge2FudGlhbGlhczogZmFsc2UsIHRyYW5zcGFyZW50OiBmYWxzZSwgcmVzb2x1dGlvbjogMSwgYXV0b1Jlc2l6ZTogdHJ1ZX1cbik7XG5cbi8vRHJhdyBzY2VuZSB3aGVuIGNvbG9yIGlzIGxvYWRlZFxubGV0IGRyYXdTY2VuZSA9IGZ1bmN0aW9uKCl7XG4gIC8vQWRkIHRoZSBjYW52YXMgdG8gdGhlIEhUTUwgZG9jdW1lbnRcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChyZW5kZXJlci52aWV3KTtcblxuICAvL0NyZWF0ZSBhIGNvbnRyYWluZXIgb2JqZWN0IGNhbGxlZCB0aGUgJ3N0YWdlJ1xuICBsZXQgc3RhZ2UgPSBuZXcgUElYSS5Db250YWluZXIoKTtcblxuICAvL1NldCBiYWNrZ3JvdW5kIGNvbG9yXG4gIHJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IGN1cnJlbnRQYWxldHRlWydiYWNrZ3JvdW5kJ107XG4gIC8vVGVsbCB0aGUgJ3JlbmRlcmVyJyB0byAncmVuZGVyJyB0aGUgJ3N0YWdlJ1xuICByZW5kZXJlci5yZW5kZXIoc3RhZ2UpO1xufTtcbiJdfQ==
