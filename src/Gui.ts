import * as PIXI from "pixi.js";
import { Btn } from "./Btn";

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

    private rows: number = 10;
    private cols: number = 10;
    private spacing: number = 50;
    private resources: any;
    private gridcontainer: any;
    private marks: any = [];
    private player: PIXI.Sprite;

    constructor(mainStage: PIXI.Container, mainColors: any, mainSounds: any) {
        this.stage = mainStage;
        this.colors = mainColors;
        this.sounds = mainSounds;
        this.loadImages();
    }
    private loadImages = function(): void {
        //load images'
        this.loader = PIXI.loader
            .add('player_blue', 'src/graphics/player_blue.png')
            .add('mark_bracket', 'src/graphics/mark_bracket.png')
            .add('arrowup_up', 'src/graphics/arrowup_up.png')
            .add('arrowup_over', 'src/graphics/arrowup_over.png')
            .add('arrowup_hit', 'src/graphics/arrowup_hit.png')
            .on('complete', function(loader, resources) {
                this.sprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                this.sprites.mark_bracket = new PIXI.Sprite(resources.mark_bracket.texture);
                this.sprites.arrowup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.arrowup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.arrowup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.onLoadCompleted();
            }.bind(this));
        this.loader.load();
    }


    private onLoadCompleted = function() {
        this.createGrid();
        this.createLine();
        this.createText();
        this.createButtons();
    }
    private createButtons = function(){
      var rowsButton = new Btn(this.stage, this.sprites, "arrowup", 100, 100, function(){
        this.rows++;
        this.typeMe(this.rowsValue, this.rows.toString(),0,0)
        //update board/matrix

      }.bind(this));
    }
    private createPlayer = function(): void {
        //player
        this.player = this.sprites.player_blue;
        this.stage.addChild(this.player);
        this.player.position.x = 500;
        this.player.position.y = 500;
        this.sounds.play("start");

    }
    private createGrid = function() {
        var container = new PIXI.Container();
        this.stage.addChild(container);

        let totalmarks = this.rows * this.cols;
        console.log(totalmarks);
        for (var i = 0; i < totalmarks; i++) {
          // console.log(;
          // console.log("x: " + Math.floor(i * this.rows) * this.spacing + "y: " + (i % this.cols) * this.spacing););
            var mark = this.sprites.mark_bracket;
            container.addChild(mark);

            mark.anchor.set(0.5);
            mark.x = (i % this.cols) * this.spacing;//(i % this.cols) * this.spacing;
            mark.y = Math.floor(i / this.rows) * this.spacing; //(i % this.cols) * this.spacing;
            // bunny.x = (i % 5) * 40;
            // bunny.y = Math.floor(i / 5) * 40;            mark.y = Math.floor(i / this.rows) * this.spacing;
            mark.scale.x = 1;
            mark.scale.y = 1;
        }

        // Center on the screen
        container.x = (this.stage.width - container.width) / 2;
        container.y = (this.stage.height - container.height) / 2;
        this.createPlayer();
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
        if (messageLength > 1) {
            this.sounds.play("keypress");
        }
        // console.log(newString);
        //increment length of message
        messageLength++;

        if (messageLength < message.length + 1) {
            setTimeout(this.typeMe.bind(this, textObj, message, messageLength, 50), delay);
            // setTimeout(this.declare.bind(this), 1000);
        }

    }
}
