/// <reference path="../typings/index.d.ts" />

import PIXI = require('pixi.js');
import { ColorPalettes } from "./ColorPalettes";
import { SoundEffects } from "./SoundEffects";
import { Gui } from "./Gui";

//Get sound effects
const SOUNDLIB = new SoundEffects;

//Get color information
const COLORLIB = new ColorPalettes;
let colors:any;

// Load Gui after colors
let OVERLAY:any;

//load color palette
let changeColors = function(pindex:number){
  COLORLIB.loadColors(pindex)
  .then(function (data) {
    console.log(data.type);
    colors = data;
    setupPixi();
  })
  .catch(function (err) {
    console.error('Augh, there was an error!', err);
  });
}
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

let setupPixi = function():void{

  renderer = PIXI.autoDetectRenderer(960,540,
    {antialias: true, transparent: false, resolution: 1, autoResize: true}
  );
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

  drawScene();
}

//Draw scene
let drawScene = function(){



    //init Gui pass in colors
    OVERLAY = new Gui( stage, colors, SOUNDLIB);
    //start rendering engine
    gameLoop();
};
let gameLoop = function():void{
  //loop 60 frames per second
  requestAnimationFrame(gameLoop);

  renderer.render(stage);
}
