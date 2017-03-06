import { Howl } from "howler";

export class SoundEffects {
    // public sndsprite: Howl;
    private soundObj: any = {};
    constructor() {
        //load sounds
        var keypress = new Howl({
            src: ['src/audio/keypress.wav'],
            preload: true
        });

        var beep = new Howl({
            src: ['src/audio/beep.wav'],
            preload: true
        });

        var start = new Howl({
            src: ['src/audio/startup.wav'],
            preload: true
        });

        var result = new Howl({
            src: ['src/audio/nope.wav'],
            preload: true
        });

        var yelp = new Howl({
            src: ['src/audio/yelp.wav'],
            preload: true
        });

        this.soundObj['keypress'] = keypress;
        this.soundObj['beep'] = beep;
        this.soundObj['start'] = start;
        this.soundObj['result'] = result;
        this.soundObj['yelp'] = yelp;
        console.log(this.soundObj);
    }
    public play = function(snd: string): void {
        //console.log("snd", snd);
        // this.sndsprite.play(snd);
        //console.log("play: " + snd);
        this.soundObj[snd].play();
    }
}
