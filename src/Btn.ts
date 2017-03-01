import * as PIXI from "pixi.js";

export class Btn {
    private buttonObject: Object = {};
    private btnkind: String;
    private callback:Function;
    private stage:PIXI.Container;

    constructor(mainStage:any, resources:any, btnkind: string, name:string, xpos: number, ypos: number, callbk:Function) {
        // create some textures from an image path
        this.stage = mainStage;
        this.btnkind = btnkind;
        this.callback = callbk;

        console.log("btnkind: " + this.btnkind);
        console.log(name);
        // var textureButton = PIXI.Texture.fromImage('required/assets/button.png');

        this.buttonObject[name + "up"] = resources[btnkind + '_up'].texture;
        this.buttonObject[name + "over"] = resources[btnkind + "_over"].texture;
        this.buttonObject[name + "hit"] = resources[btnkind + "_hit"].texture;
        this.buttonObject[name + "base"] = new PIXI.Sprite(resources[btnkind + "_up"].texture);
        this.buttonObject[name + "base"].anchor.set(0.5);
        this.buttonObject[name + "base"].x = xpos;
        this.buttonObject[name + "base"].y = ypos;

        // make the button interactive...
        this.buttonObject[name + "base"].interactive = true;
        this.buttonObject[name + "base"].buttonMode = true;

        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        this.buttonObject[name + "base"]
            .on('pointerdown', this.onButtonDown.bind(this, "textureButton", this.callback))
            .on('pointerup', this.onButtonUp.bind(this, "textureButton"))
            .on('pointerupoutside', this.onButtonUp.bind(this, "textureButton"))
            .on('pointerover', this.onButtonOver.bind(this, "textureButton"))
            .on('pointerout', this.onButtonOut.bind(this, "textureButton"));

        // Use mouse-only events
        // .on('mousedown', onButtonDown)
        // .on('mouseup', onButtonUp)
        // .on('mouseupoutside', onButtonUp)
        // .on('mouseover', onButtonOver)
        // .on('mouseout', onButtonOut)

        // Use touch-only events
        // .on('touchstart', onButtonDown)
        // .on('touchend', onButtonUp)
        // .on('touchendoutside', onButtonUp)

        // add it to the stage
        this.stage.addChild(this.buttonObject[name + "base"]);
    }
    private onButtonDown = function(me,callback): void {
        console.log("onButtonDown");
        this.isdown = true;
        this.texture = this.buttonObject[me + "_hit"];
        this.alpha = 1;
        callback();
    }
    private onButtonUp = function(me): void {
        console.log("onButtonUp");
        this.isdown = false;
        if (this.isOver) {
            this.texture = this.buttonObject[me + "_over"];
        }
        else {
            this.texture = this.buttonObject[me + "_up"];
        }
    }
    private onButtonOver = function(me): void {
        console.log("onButtonOver");
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonObject[me + "_over"];
    }
    private onButtonOut = function(me): void {
        console.log("onButtonOut");
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonObject[me + "_up"];
    }
}
