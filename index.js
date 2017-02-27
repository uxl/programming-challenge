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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL0NvbG9yUGFsZXR0ZXMudHMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0VBO0lBSUk7UUFFTyxlQUFVLEdBQUcsVUFBUyxNQUFhO1lBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFTLE9BQU8sRUFBRSxNQUFNO2dCQUN2QyxJQUFJLEdBQUcsR0FBVyxpQkFBaUIsQ0FBQztnQkFDcEMsSUFBSSxHQUFHLEdBQVEsSUFBSSxjQUFjLEVBQUUsQ0FBQztnQkFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ3JCLElBQUksSUFBUyxDQUFDO2dCQUNkLEdBQUcsQ0FBQyxNQUFNO29CQUNWO3dCQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsV0FBVzs0QkFDWCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBQ3BDLElBQUksYUFBYSxHQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQ2pELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDekIsQ0FBQzt3QkFBQyxJQUFJLENBQUMsQ0FBQzs0QkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUE7d0JBQ3ZFLENBQUM7b0JBQ0gsQ0FBQyxDQUFDO2dCQUVGLEdBQUcsQ0FBQyxPQUFPLEdBQUc7b0JBQ1YsTUFBTSxDQUFDO3dCQUNILE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTt3QkFDbkIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO3FCQUM3QixDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO0lBNUJELENBQUM7Q0E2Qko7QUFsQ0Qsc0NBa0NDOzs7QUNwQ0QsOENBQThDOzs7QUFFOUMsZ0NBQWlDO0FBQ2pDLG1EQUFnRDtBQUVoRCx1QkFBdUI7QUFDdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSw2QkFBYSxDQUFDO0FBQ25DLElBQUksTUFBVSxDQUFDO0FBRWYsb0JBQW9CO0FBQ3BCLElBQUksWUFBWSxHQUFHLFVBQVMsTUFBYTtJQUN2QyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztTQUMxQixJQUFJLENBQUMsVUFBVSxJQUFJO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDZCxTQUFTLEVBQUUsQ0FBQztJQUNkLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxVQUFVLEdBQUc7UUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQTtBQUNELFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVoQix3QkFBd0I7QUFDeEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLEtBQUs7SUFDL0Isa0JBQWtCLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUE7QUFDRCx1Q0FBdUM7QUFDdkMsSUFBSSxrQkFBa0IsR0FBRztJQUN2QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQzFCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDM0IsdURBQXVEO0lBQ3ZELHdDQUF3QztJQUN4Qyx5Q0FBeUM7SUFDekMsOEJBQThCO0lBQzlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQTtBQUVELHFCQUFxQjtBQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFDLElBQUksRUFDOUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQ3hFLENBQUM7QUFFRixZQUFZO0FBQ1osSUFBSSxTQUFTLEdBQUc7SUFDZCxxQ0FBcUM7SUFDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpDLCtDQUErQztJQUMvQyxJQUFJLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVqQyxzQkFBc0I7SUFDdEIsUUFBUSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsNkNBQTZDO0lBQzdDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7SVBhbGV0dGV9IGZyb20gJy4vaW50ZXJmYWNlcy9JUGFsZXR0ZSc7XG5cbmV4cG9ydCBjbGFzcyBDb2xvclBhbGV0dGVzIHtcbiAgICBwcml2YXRlIHBhbGV0dGVJbmRleDogMDtcbiAgICBwdWJsaWMgcGFsZXR0ZXM6IG51bGw7XG4gICAgcHJpdmF0ZSBhY3RpdmVQYWxldHRlOiBudWxsO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbiAgICBwdWJsaWMgbG9hZENvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpOlByb21pc2U8YW55PiB7XG4gICAgICB0aGlzLnBhbGV0dGVJbmRleCA9IHBpbmRleDtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgbGV0IHVybDogc3RyaW5nID0gJ3NyYy9jb2xvcnMuanNvbic7XG4gICAgICAgICAgICBsZXQgeGhyOiBhbnkgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgICAgIHhoci5vcGVuKCdHRVQnLCB1cmwpO1xuICAgICAgICAgICAgdmFyIGRhdGE6IGFueTtcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPVxuICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAvLyBTdWNjZXNzIVxuICAgICAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgICAgIGxldCBhY3RpdmVQYWxldHRlOklQYWxldHRlID0gZGF0YS5jb2xvcnNbcGluZGV4XTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFjdGl2ZVBhbGV0dGUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2UgcmVhY2hlZCBvdXIgdGFyZ2V0IHNlcnZlciwgYnV0IGl0IHJldHVybmVkIGFuIGVycm9yXCIpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IFBJWEkgPSByZXF1aXJlKCdwaXhpLmpzJyk7XG5pbXBvcnQgeyBDb2xvclBhbGV0dGVzIH0gZnJvbSBcIi4vQ29sb3JQYWxldHRlc1wiO1xuXG4vL0dldCBjb2xvciBpbmZvcm1hdGlvblxuY29uc3QgQ09MT1JMSUIgPSBuZXcgQ29sb3JQYWxldHRlcztcbmxldCBjb2xvcnM6YW55O1xuXG4vL2xvYWQgY29sb3IgcGFsZXR0ZVxubGV0IGNoYW5nZUNvbG9ycyA9IGZ1bmN0aW9uKHBpbmRleDpudW1iZXIpe1xuICBDT0xPUkxJQi5sb2FkQ29sb3JzKHBpbmRleClcbiAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhkYXRhLnR5cGUpO1xuICAgIGNvbG9ycyA9IGRhdGE7XG4gICAgZHJhd1NjZW5lKCk7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgY29uc29sZS5lcnJvcignQXVnaCwgdGhlcmUgd2FzIGFuIGVycm9yIScsIGVycik7XG4gIH0pO1xufVxuY2hhbmdlQ29sb3JzKDApO1xuXG4vL1Jlc2l6ZSBlbGVjdHJvbiB3aW5kb3dcbndpbmRvdy5vbnJlc2l6ZSA9IGZ1bmN0aW9uIChldmVudCk6dm9pZHtcbiAgdXBkYXRlUmVuZGVyZXJTaXplKCk7XG59XG4vL0hhbmRsZXMgdXBkYXRlIG9mIENhbnZhcyBhbmQgRWxlbWVudHNcbmxldCB1cGRhdGVSZW5kZXJlclNpemUgPSBmdW5jdGlvbigpOnZvaWR7XG4gIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGg7XG4gIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAvL3RoaXMgcGFydCByZXNpemVzIHRoZSBjYW52YXMgYnV0IGtlZXBzIHJhdGlvIHRoZSBzYW1lXG4gIC8vIHJlbmRlcmVyLnZpZXcuc3R5bGUud2lkdGggPSB3ICsgXCJweFwiO1xuICAvLyByZW5kZXJlci52aWV3LnN0eWxlLmhlaWdodCA9IGggKyBcInB4XCI7XG4gIC8vdGhpcyBwYXJ0IGFkanVzdHMgdGhlIHJhdGlvOlxuICByZW5kZXJlci5yZXNpemUodyxoKTtcbn1cblxuLy9DcmVhdGUgdGhlIHJlbmRlcmVyXG5sZXQgcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcigxOTIwLDEwODAsXG4gIHthbnRpYWxpYXM6IGZhbHNlLCB0cmFuc3BhcmVudDogZmFsc2UsIHJlc29sdXRpb246IDEsIGF1dG9SZXNpemU6IHRydWV9XG4pO1xuXG4vL0RyYXcgc2NlbmVcbmxldCBkcmF3U2NlbmUgPSBmdW5jdGlvbigpe1xuICAvL0FkZCB0aGUgY2FudmFzIHRvIHRoZSBIVE1MIGRvY3VtZW50XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocmVuZGVyZXIudmlldyk7XG5cbiAgLy9DcmVhdGUgYSBjb250cmFpbmVyIG9iamVjdCBjYWxsZWQgdGhlICdzdGFnZSdcbiAgbGV0IHN0YWdlID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG5cbiAgLy9TZXQgYmFja2dyb3VuZCBjb2xvclxuICByZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcnNbJ2JhY2tncm91bmQnXTtcbiAgLy9UZWxsIHRoZSAncmVuZGVyZXInIHRvICdyZW5kZXInIHRoZSAnc3RhZ2UnXG4gIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG59O1xuIl19
