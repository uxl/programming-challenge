import * as PIXI from "pixi.js";

export class Btn {
    private buttonObject: Object = {};
    private name: String;
    constructor(newStage: any, resources: any, btnkind: string, xpos: number, ypos: number) {
        // create some textures from an image path
        this.name = btnkind;
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
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);

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
    private onButtonDown = function(): void {
        console.log("onButtonDown");
        this.buttonObject['textureButton'].isdown = true;
        this.buttonObject['textureButton'].texture = this.buttonObject[this.name + "_hit"];
        this.buttonObject['textureButton'].alpha = 1;
    }
    private onButtonUp = function(): void {
        console.log("onButtonUp");
        this.buttonObject['textureButton'].isdown = false;
        if (this.buttonObject['textureButton'].isOver) {
            this.buttonObject['textureButton'].texture = this.buttonObject[this.name + "_over"];
        }
        else {
            this.buttonObject['textureButton'].texture = this.buttonObject[this.name + "_up"];
        }
    }
    private onButtonOver = function(): void {
        console.log("onButtonOver");
        this.buttonObject['textureButton'].isOver = true;
        if (this.buttonObject['textureButton'].isdown) {
            return;
        }
        this.buttonObject['textureButton'].texture = this.buttonObject[this.name + "_over"];
    }
    private onButtonOut = function(): void {
        console.log("onButtonOut");
        this.buttonObject['textureButton'].isOver = false;
        if (this.buttonObject['textureButton'].isdown) {
            return;
        }
        this.buttonObject['textureButton'].texture = this.buttonObject[this.name + "_up"];
    }
}
