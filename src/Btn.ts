import * as PIXI from "pixi.js";

export class Btn {
    private buttonObject: Object = {};
    private name: String;
    private callback:Function;
    private stage:PIXI.Container;

    constructor(mainStage:any, resources:any, name:string, xpos: number, ypos: number, callbk:Function) {
        // create some textures from an image path
        this.stage = mainStage;
        this.callback = callbk;

        this.buttonObject[name + "up"] = resources[name + '_out'].texture;
        this.buttonObject[name + "over"] = resources[name + "_over"].texture;
        this.buttonObject[name + "down"] = resources[name + "_down"].texture;
        this.buttonObject[name + "base"] = new PIXI.Sprite(resources[name + "_out"].texture);
        this.buttonObject[name + "base"].anchor.set(0.5);
        this.buttonObject[name + "base"].x = xpos;
        this.buttonObject[name + "base"].y = ypos;

        // make the button interactive...
        this.buttonObject[name + "base"].interactive = true;
        this.buttonObject[name + "base"].buttonMode = true;

        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        this.buttonObject[name + "base"]
            .on('pointerdown', this.onButtonDown.bind(this, name, this.callback))
            .on('pointerup', this.onButtonUp.bind(this, name))
            .on('pointerupoutside', this.onButtonUp.bind(this, name))
            .on('pointerover', this.onButtonOver.bind(this, name))
            .on('pointerout', this.onButtonOut.bind(this, name));

        // add it to the stage
        this.stage.addChild(this.buttonObject[name + "base"]);
    }
    private onButtonDown = function(me,callback): void {
        // console.log("onButtonDown");
        this.isdown = true;
        this.texture = this.buttonObject[me + "_down"];
        this.alpha = 1;
        callback();
    }
    private onButtonUp = function(me): void {
        // console.log("onButtonUp");
        this.isdown = false;
        if (this.isOver) {
            this.texture = this.buttonObject[me + "_over"];
        }
        else {
            this.texture = this.buttonObject[me + "_out"];
        }
    }
    private onButtonOver = function(me): void {
        // console.log("onButtonOver");
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonObject[me + "_over"];
    }
    private onButtonOut = function(me): void {
        // console.log("onButtonOut");
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonObject[me + "_out"];
    }
}
