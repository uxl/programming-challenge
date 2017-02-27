import PIXI = require('pixi.js');

export class SoundEffects {
  public sndsprite:Howl;
    constructor() {
      //load sprite
      this.sndsprite = new Howl({
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
    public play = function(snd:string):void{
      console.log("snd", snd);
      this.sndsprite.play(snd);
    }
  }
