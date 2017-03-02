import { Howl } from "howler";

export class SoundEffects {
  public sndsprite:Howl;
    constructor() {
      //load sprite
      this.sndsprite = new Howl({
      src: ['src/audio/sprite.wav'],
      sprite: {
        keypress: [10, 54],
        start: [212, 1664],
        dot: [1664, 1700],
        line: [1700, 1800],
        error: [6000, 5000],
        move: [6000, 5000]
      }
    });
    }
    public play = function(snd:string):void{
      //console.log("snd", snd);
      this.sndsprite.play(snd);
    }
  }
