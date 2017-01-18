(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jiboProgrammingChallenge = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/// <reference path="../typings/index.d.ts" />
"use strict";
const PIXI = require('pixi.js');
const renderer = new PIXI.WebGLRenderer(1280, 720);
document.body.appendChild(renderer.view);
// You need to create a root container that will hold the scene you want to draw.
const stage = new PIXI.Container();
// Declare a global variable for our sprite so that the animate function can access it.
let bunny = null;
// load the texture we need
PIXI.loader.add('bunny', 'images/bunny.jpeg').load(function (loader, resources) {
    // This creates a texture from a 'bunny.png' image.
    bunny = new PIXI.Sprite(resources.bunny.texture);
    // Setup the position and scale of the bunny
    bunny.position.x = 400;
    bunny.position.y = 300;
    bunny.scale.x = 2;
    bunny.scale.y = 2;
    // Add the bunny to the scene we are building.
    stage.addChild(bunny);
    // kick off the animation loop (defined below)
    animate();
});
function animate() {
    // start the timer for the next animation loop
    requestAnimationFrame(animate);
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
    // this is the main render call that makes pixi draw your container and its children.
    renderer.render(stage);
}

},{"pixi.js":undefined}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSw4Q0FBOEM7O0FBRTlDLE1BQU8sSUFBSSxXQUFXLFNBQVMsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sUUFBUSxHQUFzQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV6QyxpRkFBaUY7QUFDakYsTUFBTSxLQUFLLEdBQWtCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBRWxELHVGQUF1RjtBQUN2RixJQUFJLEtBQUssR0FBZSxJQUFJLENBQUM7QUFFN0IsMkJBQTJCO0FBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQTBCLEVBQUUsU0FBYTtJQUNsRyxtREFBbUQ7SUFDbkQsS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWpELDRDQUE0QztJQUM1QyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDdkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBRXZCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNsQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFbEIsOENBQThDO0lBQzlDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdEIsOENBQThDO0lBQzlDLE9BQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFSDtJQUNJLDhDQUE4QztJQUM5QyxxQkFBcUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUvQiw0Q0FBNEM7SUFDNUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7SUFFdkIscUZBQXFGO0lBQ3JGLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0IsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vdHlwaW5ncy9pbmRleC5kLnRzXCIgLz5cblxuaW1wb3J0IFBJWEkgPSByZXF1aXJlKCdwaXhpLmpzJyk7XG5jb25zdCByZW5kZXJlcjpQSVhJLldlYkdMUmVuZGVyZXIgPSBuZXcgUElYSS5XZWJHTFJlbmRlcmVyKDEyODAsIDcyMCk7XG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJlbmRlcmVyLnZpZXcpO1xuXG4vLyBZb3UgbmVlZCB0byBjcmVhdGUgYSByb290IGNvbnRhaW5lciB0aGF0IHdpbGwgaG9sZCB0aGUgc2NlbmUgeW91IHdhbnQgdG8gZHJhdy5cbmNvbnN0IHN0YWdlOlBJWEkuQ29udGFpbmVyID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XG5cbi8vIERlY2xhcmUgYSBnbG9iYWwgdmFyaWFibGUgZm9yIG91ciBzcHJpdGUgc28gdGhhdCB0aGUgYW5pbWF0ZSBmdW5jdGlvbiBjYW4gYWNjZXNzIGl0LlxubGV0IGJ1bm55OlBJWEkuU3ByaXRlID0gbnVsbDtcblxuLy8gbG9hZCB0aGUgdGV4dHVyZSB3ZSBuZWVkXG5QSVhJLmxvYWRlci5hZGQoJ2J1bm55JywgJ2ltYWdlcy9idW5ueS5qcGVnJykubG9hZChmdW5jdGlvbiAobG9hZGVyOlBJWEkubG9hZGVycy5Mb2FkZXIsIHJlc291cmNlczphbnkpIHtcbiAgICAvLyBUaGlzIGNyZWF0ZXMgYSB0ZXh0dXJlIGZyb20gYSAnYnVubnkucG5nJyBpbWFnZS5cbiAgICBidW5ueSA9IG5ldyBQSVhJLlNwcml0ZShyZXNvdXJjZXMuYnVubnkudGV4dHVyZSk7XG5cbiAgICAvLyBTZXR1cCB0aGUgcG9zaXRpb24gYW5kIHNjYWxlIG9mIHRoZSBidW5ueVxuICAgIGJ1bm55LnBvc2l0aW9uLnggPSA0MDA7XG4gICAgYnVubnkucG9zaXRpb24ueSA9IDMwMDtcblxuICAgIGJ1bm55LnNjYWxlLnggPSAyO1xuICAgIGJ1bm55LnNjYWxlLnkgPSAyO1xuXG4gICAgLy8gQWRkIHRoZSBidW5ueSB0byB0aGUgc2NlbmUgd2UgYXJlIGJ1aWxkaW5nLlxuICAgIHN0YWdlLmFkZENoaWxkKGJ1bm55KTtcblxuICAgIC8vIGtpY2sgb2ZmIHRoZSBhbmltYXRpb24gbG9vcCAoZGVmaW5lZCBiZWxvdylcbiAgICBhbmltYXRlKCk7XG59KTtcblxuZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAvLyBzdGFydCB0aGUgdGltZXIgZm9yIHRoZSBuZXh0IGFuaW1hdGlvbiBsb29wXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuXG4gICAgLy8gZWFjaCBmcmFtZSB3ZSBzcGluIHRoZSBidW5ueSBhcm91bmQgYSBiaXRcbiAgICBidW5ueS5yb3RhdGlvbiArPSAwLjAxO1xuXG4gICAgLy8gdGhpcyBpcyB0aGUgbWFpbiByZW5kZXIgY2FsbCB0aGF0IG1ha2VzIHBpeGkgZHJhdyB5b3VyIGNvbnRhaW5lciBhbmQgaXRzIGNoaWxkcmVuLlxuICAgIHJlbmRlcmVyLnJlbmRlcihzdGFnZSk7XG59XG4iXX0=
