import * as PIXI from "pixi.js";

export class Btn {
    private buttonObject: Object = {};
    private name: String;
    private callback:Function;
    constructor(newStage: any, resources: any, btnkind: string, xpos: number, ypos: number, callbk:Function) {
        // create some textures from an image path
        this.name = btnkind;
        this.callback = callbk;
        console.log("btnname: " + this.name);
        this.buttonObject[this.name + "_up"] = new PIXI.Sprite(resources[this.name + "_up"].texture);
        this.buttonObject[this.name + "_over"] = new PIXI.Sprite(resources[this.name + "_over"].texture);
        this.buttonObject[this.name + "_hit"] = new PIXI.Sprite(resources[this.name + "_hit"].texture);

        this.buttonObject['textureButton'] = new PIXI.Sprite(resources[this.name + "_up"].texture);
        this.buttonObject['textureButton'].anchor.set(0.5);
        this.buttonObject['textureButton'].x = xpos;
        this.buttonObject['textureButton'].y = ypos;

        // make the button interactive...
        this.buttonObject['textureButton'].interactive = true;
        this.buttonObject['textureButton'].buttonMode = true;

        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        this.buttonObject['textureButton']
            .on('pointerdown', this.onButtonDown.bind(this, this.name, this.callback))
            .on('pointerup', this.onButtonUp.bind(this, this.name))
            .on('pointerupoutside', this.onButtonUp.bind(this, this.name))
            .on('pointerover', this.onButtonOver.bind(this, this.name))
            .on('pointerout', this.onButtonOut.bind(this, this.name));

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
        newStage.addChild(this.buttonObject['textureButton']);
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
