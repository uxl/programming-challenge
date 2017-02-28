import * as PIXI from "pixi.js";

export class Gui {
    private stage: PIXI.Container;
    private colors: any;
    private sounds: any;
    private status: PIXI.Text;
    private line: PIXI.Graphics;

    constructor(mainStage: PIXI.Container, mainColors:any, mainSounds:any) {
        this.stage = mainStage;
        this.colors = mainColors;
        this.sounds = mainSounds;
        this.loadImages();
    }
    private loadImages = function(): void{
      //load images
      PIXI.loader
        .add([
          "src/graphics/arrow_blue.png",
          "src/graphics/arrow_yellow.png",
          "src/graphics/arrow_orange.png",
          "src/graphics/mark_bracket.png",
          "src/graphics/mark_dot.png",
          "src/graphics/mark_both.png",
          "src/graphics/arrow_wait.png",
          "src/graphics/arrow_press.png",
          "src/graphics/arrow_error.png"

        ])
        .load(this.drawGui);
    }
    private drawGui = function(){
      this.createLine();
      this.createText();
      this.drawGrid();
      this.createButton();
    }
    private createButton = function(): void{

    }
    private drawGrid = function():void{
        //grid test
        // // Create a 5x5 grid
        for (var i = 0; i < 100; i++) {
            var mark = new PIXI.Sprite(PIXI.loader.resources["src/graphics/mark_bracket.png"].texture);
            mark.anchor.set(0.5);
            mark.x = (i % 10) * 100;
            mark.y = Math.floor(i / 10) * 100;
            mark.scale.x = 1;
            mark.scale.y = 1;
            this.stage.addChild(mark);
          }
    }
    private createLine = function(): void {
        this.line = new PIXI.Graphics();

        // set a fill and line style
        this.line.lineStyle(1, this.colors.line, 1);

        // draw a shape
        this.line.moveTo(100, window.innerHeight - 70);
        this.line.lineTo(window.innerWidth - 100, window.innerHeight - 70);

        this.stage.addChild(this.line);
    }
    private createText = function(): void {
      //text test
      let style = new PIXI.TextStyle({
          fontFamily: 'Helvetica',
          fontSize: 18,
          fontStyle: 'normal',
          fontWeight: 'normal',
          // fill: ['#ffffff', '#00ff99'], // gradient
          fill: this.colors.font,
          // stroke: '#4a1850',
          // strokeThickness: 5,
          dropShadow: true,
          // dropShadowColor: '#000000',
          // dropShadowBlur: 4,
          // dropShadowAngle: Math.PI / 6,
          // dropShadowDistance: 6,
          wordWrap: true,
          wordWrapWidth: 440
      });

      this.status = new PIXI.Text('...', style);
      this.status.x = 20;
      this.status.y = window.innerHeight - 60;

      this.stage.addChild(this.status);
      this.typeMe(this.status, "Initializing...", 0);
    }
    // public updateText = function(message: string): PIXI.Text {
    //     this.status.text = message;
    //     return this.status;
    // }
    private typeMe = function(textObj:PIXI.Text, message:string, messageLength:number):void{
      console.log(message + ' | ' + messageLength);
      if(messageLength === undefined){
        console.log("starting type");
        // textObj.text = '';
        messageLength = 0;
      }else{
        //increment length of message
        messageLength++;
      }

      //loop through typing
      let newString:string = message.substring(0, messageLength);
      textObj.text = newString;
      this.sounds.play("keypress");
      console.log(newString);

      if(messageLength < message.length+1) {
          setTimeout(this.typeMe.bind(this, textObj, message, messageLength), 100);
          // setTimeout(this.declare.bind(this), 1000);
      }
    }
}
