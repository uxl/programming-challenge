/// <reference path="../typings/index.d.ts" />

import PIXI = require('pixi.js');
import { ColorPalettes } from "./ColorPalettes";

//Get color information
const COLORLIB = new ColorPalettes;
let currentPalette:any = {};

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
window.onresize = function (event):void{
  updateRendererSize();
}
//Handles update of Canvas and Elements
let updateRendererSize = function():void{
  let w = window.innerWidth;
  let h = window.innerHeight;
  //this part resizes the canvas but keeps ratio the same
  // renderer.view.style.width = w + "px";
  // renderer.view.style.height = h + "px";
  //this part adjusts the ratio:
  renderer.resize(w,h);
}

//Create the renderer
let renderer = PIXI.autoDetectRenderer(1920,1080,
  {antialias: false, transparent: false, resolution: 1, autoResize: true}
);

//Draw scene when color is loaded
let drawScene = function(){
  //Add the canvas to the HTML document
  document.body.appendChild(renderer.view);

  //Create a contrainer object called the 'stage'
  let stage = new PIXI.Container();

  //Set background color
  renderer.backgroundColor = currentPalette['background'];
  //Tell the 'renderer' to 'render' the 'stage'
  renderer.render(stage);
};
