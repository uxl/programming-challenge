import * as PIXI from "pixi.js";

export class Gui {
    private stage: PIXI.Container;
    private colors: any;
    private sounds: any;

    //text elements
    private status: PIXI.Text;
    private rowsTitle: PIXI.Text;
    private rowsValue: PIXI.Text;
    private colsTitle: PIXI.Text;
    private colsValue: PIXI.Text;

    private line: PIXI.Graphics;
    private loader = new PIXI.loaders.Loader();
    private sprites: any = {};

    private rows:number = 10;
    private cols:number = 10;

    constructor(mainStage: PIXI.Container, mainColors: any, mainSounds: any) {
        this.stage = mainStage;
        this.colors = mainColors;
        this.sounds = mainSounds;
        this.loadImages();
        this.createLine();
        this.createText();
    }
    private loadImages = function(): void {
        var newSprites: any = {};
        var newStage: PIXI.Container = this.stage;
        var drawGrid = this.drawGrid;
        var rows:number = this.rows;
        var cols:number = this.cols;
        //load images
        this.loader = PIXI.loader
            .add('player_blue', 'src/graphics/player_blue.png')
            .add('mark_bracket', 'src/graphics/mark_bracket.png')

            .load(function(loader, resources) {
              newSprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
              newSprites.mark_bracket = new PIXI.Sprite(resources.mark_bracket.texture);

                //player
                newStage.addChild(newSprites.player_blue);
                newSprites.player_blue.position.x = 500;
                newSprites.player_blue.position.y = 500;

                drawGrid(newStage, resources, rows, cols, 65);
            });
    }
    private drawGrid = function(newStage:any, resources:any, rows:number, cols:number, spacing:number): void {
      var container = new PIXI.Container();
      newStage.addChild(container);
        let totalmarks = rows * cols;
        for (let i = 0; i < totalmarks; i++) {
            let mark = new PIXI.Sprite(resources.mark_bracket.texture);
            mark.anchor.set(0.5);
            mark.x = (i % cols) * spacing;
            mark.y = Math.floor(i / rows) * spacing;
            mark.scale.x = 1;
            mark.scale.y = 1;
            container.addChild(mark);
        }

        // Center on the screen
      container.x = (newStage.width - container.width) / 2;
      container.y = (newStage.height - container.height) / 2;
    }

    private createLine = function(): void {
        this.line = new PIXI.Graphics();

        // set a fill and line style
        this.line.lineStyle(0.5, this.colors.line, 0.5);

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
        let headline = new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fill: this.colors.headline,
            // stroke: '#4a1850',
            // strokeThickness: 5,
            dropShadow: false,
            // dropShadowColor: '#000000',
            // dropShadowBlur: 4,
            // dropShadowAngle: Math.PI / 6,
            // dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440
        });
        //status
        this.status = new PIXI.Text('...', headline);
        this.status.x = 110;
        this.status.y = window.innerHeight - 50;

        this.stage.addChild(this.status);
        this.typeMe(this.status, "Initializing...", 0, 2000);

        //rows title
        this.rowsTitle = new PIXI.Text('...', style);
        this.rowsTitle.x = 300;
        this.rowsTitle.y = window.innerHeight - 50;

        this.stage.addChild(this.rowsTitle);
        this.typeMe(this.rowsTitle, "rows:", 0, 3500);

        console.log(this.cols);
        console.log(typeof this.cols);

        //rows value
        this.rowsValue = new PIXI.Text('...', headline);
        this.rowsValue.x = 350;
        this.rowsValue.y = window.innerHeight - 50;

        this.stage.addChild(this.rowsValue);
        this.typeMe(this.rowsValue, this.rows.toString(), 0, 4000);

        //cols title
        this.colsTitle = new PIXI.Text('...:', style);
        this.colsTitle.x = 500;
        this.colsTitle.y = window.innerHeight - 50;

        this.stage.addChild(this.colsTitle);
        this.typeMe(this.colsTitle, 'cols:', 0, 4500);

        // //cols value
        this.colsValue = new PIXI.Text('...', headline);
        this.colsValue.x = 550;
        this.colsValue.y = window.innerHeight - 50;

        this.stage.addChild(this.colsValue);
        this.typeMe(this.colsValue, this.cols.toString(), 0, 5000);
        this.typeMe(this.status, "Ready", 0, 6000);

    }
    private typeMe = function(textObj: PIXI.Text, message: string, messageLength: number, delay: number): void {
        // console.log(message + ' | ' + messageLength);
        if (messageLength === undefined) {
            // console.log("starting type");
            textObj.text = "";
            messageLength = 0;
        }

        //loop through typing
        let newString: string = message.substring(0, messageLength);
        textObj.text = newString;
        this.sounds.play("keypress");
        // console.log(newString);
        //increment length of message
        messageLength++;

        if (messageLength < message.length + 1) {
            setTimeout(this.typeMe.bind(this, textObj, message, messageLength, 50), delay);
            // setTimeout(this.declare.bind(this), 1000);
        }else{
          //Play startup sound

        }
    }
}
