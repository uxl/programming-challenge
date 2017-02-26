/// <reference path="../typings/index.d.ts" />

import PIXI = require('pixi.js');
import { ColorSchemes } from "./ColorLookup";

let COLORS = new ColorSchemes;
console.log("woo " + COLORS);

//Create the renderer
var renderer = PIXI.autoDetectRenderer(1920,1080,
  {antialias: false, transparent: false, resolution: 1, autoResize: true}
);


//resize event
window.onresize = function (event):void{
  updateRendererSize();
}
//Handles update of Canvas and Elements
var updateRendererSize = function():void{
  var w = window.innerWidth;
  var h = window.innerHeight;
  //this part resizes the canvas but keeps ratio the same
  // renderer.view.style.width = w + "px";
  // renderer.view.style.height = h + "px";
  //this part adjusts the ratio:
  renderer.resize(w,h);
}

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a contrainer object called the 'stage'
var stage = new PIXI.Container();




/*
var currentColorScheme:number = 0;
//Color schemes
interface ColorScheme {
  background: number,
  headline: number,
  font: number,
  squaredark: number,
  squarelight: number,
  buttonsolid: number,
  buttonoutline: number,
  buttonbackground: number,
  dot: number,
  line: number
}

var colors: ColorScheme[] = [];

colors.push({
  background: 0x0c0c0c,
  headline: 0xa0a788,
  font: 0x638f91,
  squaredark: 0x161a1d,
  squarelight: 0x152022,
  buttonsolid: 0x161a1b,
  buttonoutline: 0xc3dae5,
  buttonbackground: 0x55b4c2,
  dot: 0xcbdee4,
  line: 0x425a54
});
*/

renderer.backgroundColor = 0xffffff;
//Tell the 'renderer' to 'render' the 'stage'
renderer.render(stage);
