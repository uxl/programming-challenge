import * as PIXI from "pixi.js";

export class Btn {
    private buttonObject: Object = {};
    private name: String;
    private callback:Function;
    private stage:PIXI.Container;

    private outTexture:PIXI.Texture;
    private overTexture:PIXI.Texture;
    private downTexture:PIXI.Texture;

    private textureButton:PIXI.Sprite;
    private _isActive:boolean = false;

    constructor(mainStage:any, resources:any, name:string, xpos: number, ypos: number, callbk:Function) {
        // create some textures from an image path
        this.stage = mainStage;
        this.callback = callbk;

        this.overTexture = resources[name + "_over"].texture;
        this.outTexture = resources[name + "_out"].texture;
        this.downTexture = resources[name + "_down"].texture;

        this.textureButton = new PIXI.Sprite(this.outTexture);
        this.textureButton.anchor.set(0.5);
        this.textureButton.x = xpos;
        this.textureButton.y = ypos;

        // make the button interactive...
        this.textureButton.interactive = true;
        this.textureButton.buttonMode = true;

        // Mouse & touch events are normalized into
        // the pointer* events for handling different
        this.textureButton
            .on('pointerdown', this.onButtonDown.bind(this, this.callback))
            .on('pointerup', this.onButtonUp.bind(this))
            .on('pointerupoutside', this.onButtonUp.bind(this))
            .on('pointerover', this.onButtonOver.bind(this))
            .on('pointerout', this.onButtonOut.bind(this));
        // add it to the stage
        this.stage.addChild(this.textureButton);
    }
    //get and set for rows and columns
    get active(): boolean {
        return this._isActive;
    }
    set active(newval: boolean) {
        this._isActive = newval;
    }
    private onButtonOver = function(): void {
      // console.log("onButtonOver");
      // console.log(btn);
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.textureButton.texture = this.overTexture;
    }
    private onButtonDown = function(callback): void {
        // console.log("onButtonDown");
        this.isdown = true;
        this.textureButton.texture = this.downTexture;
        // btn.alpha = 1;
        callback();
    }
    private onButtonUp = function(): void {
        // console.log("onButtonUp");
        this.isdown = false;
        if (this.isOver) {
            this.textureButton.texture = this.overTexture;
        }
        else {
            this.textureButton.texture = this.outTexture;
        }
    }

    private onButtonOut = function(this, name): void {
        // console.log("onButtonOut");
        this.isOver = false;
        if (this.isdown || this._isActive) {
            return;
        }
        this.textureButton.texture = this.outTexture;
    }
}
