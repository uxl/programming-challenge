import * as PIXI from "pixi.js";

export class Playbtn {
  public btnwait:any;
  public btnpress:any;
  public btnerror:any;
  public btn:any;
  public textureButton:any;
  public brtButton:any;
  public brt:any;
  public rt:any;
  constructor() {
    //load textures
    // this.btnwait = PIXI.Texture.fromImage('src/graphics/arrow_wait.svg', false,  PIXI.SCALE_MODES.LINEAR, 1.0);
    // // this.btnpress = PIXI.Texture.fromImage('src/graphics/arrow_press.svg', false,  PIXI.SCALE_MODES.LINEAR, 1.0);
    // // this.btnerror = PIXI.Texture.fromImage('src/graphics/arrow_error.svg', false,  PIXI.SCALE_MODES.LINEAR, 1.0);
    //
    // this.brt = new PIXI.BaseRenderTexture(28, 44, PIXI.SCALE_MODES.LINEAR, 1);
    // this.rt = new PIXI.RenderTexture(this.brt);
    //
    // this.btn = new PIXI.Sprite(this.btnwait);
  }
}

    // this.btn.buttonMode = true;
    // this.btn.anchor.set(0.5);
    // this.btn.x = 0;
    // this.btn.y = 0;

    // make the button interactive
  //   this.btn.interactive = true;
  //   this.btn.buttonMode = true;
  //
  //   this.btn
  //         // Mouse & touch events are normalized into
  //         // the pointer* events for handling different
  //         // button events.
  //         .on('pointerdown', this.onButtonDown)
  //         .on('pointerup', this.onButtonUp)
  //         .on('pointerupoutside', this.onButtonUp)
  //         .on('pointerover', this.onButtonOver)
  //         .on('pointerout', this.onButtonOut);
  // }
  //   public appear = function(snd:string):void{
  //
  //   }
  //   private onButtonDown = function() {
  //       this.isdown = true;
  //       this.texture = this.textureButtonDown;
  //       this.alpha = 1;
  //   }
  //
  //   private onButtonUp = function() {
  //   this.isdown = false;
  //     if (this.isOver) {
  //       this.texture = this.textureButtonOver;
  //     }
  //     else {
  //       this.texture = this.textureButton;
  //     }
  //   }
  //
  //   private onButtonOver = function() {
  //     this.isOver = true;
  //     if (this.isdown) {
  //         return;
  //     }
  //     this.texture = this.textureButtonOver;
  //   }
  //
  //   private onButtonOut = function() {
  //       this.isOver = false;
  //       if (this.isdown) {
  //           return;
  //       }
  //       this.texture = this.textureButton;
  //   }
  // }
