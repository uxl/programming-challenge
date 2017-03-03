import { Howl } from "howler";

export class SoundEffects {
    public sndsprite: Howl;
    constructor() {
        //load sprite
        this.sndsprite = new Howl({
            src: ['src/audio/sprite.wav'],
            sprite: {
                keypress: [10, 54],
                start: [249, 1650],
                klaxon: [1980, 2620]
            }
        });
    }
    public play = function(snd: string): void {
        //console.log("snd", snd);
        this.sndsprite.play(snd);
    }
}
