/// <reference path="../typings/index.d.ts" />

import PIXI = require('pixi.js');
import { ColorPalettes } from "./ColorPalettes";
import { SoundEffects } from "./SoundEffects";
import { Playbtn } from "./graphics/playbtn";

//Get color information
const COLORLIB = new ColorPalettes;
let colors:any;

//Get sound effects
const SOUNDLIB = new SoundEffects;

const play_button = new Playbtn;


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

}

//Draw scene
let drawScene = function(){

  //single object test
  var bluearrow = new PIXI.Sprite(
      PIXI.loader.resources["src/graphics/arrow_blue.png"].texture
    );
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
       // Mouse & touch events are normalized into
       // the pointer* events for handling different
       // button events.
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
