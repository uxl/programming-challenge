import * as PIXI from "pixi.js";
import { Btn } from "./Btn";
import { Algorithm } from "./Algorithm";

export class Gui {
    private stage: PIXI.Container;
    private algorithm: Algorithm = new Algorithm;
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


    private spacing: number = 50;
    private resources: any;
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
            .add('arrowdown_up', 'src/graphics/arrowdown_up.png')
            .add('arrowdown_over', 'src/graphics/arrowdown_over.png')
            .add('arrowdown_hit', 'src/graphics/arrowdown_hit.png')
            .on('complete', function(loader, resources) {
                this.sprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                this.sprites.mark_bracket = new PIXI.Sprite(resources.mark_bracket.texture);
                this.sprites.colsup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.colsup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.colsup_hit = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.colsdown_up = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.sprites.colsdown_over = new PIXI.Sprite(resources.arrowdown_over.texture);
                this.sprites.colsdown_hit = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.sprites.rowsup_up = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.rowsup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.rowsup_hit = new PIXI.Sprite(resources.arrowup_up.texture);
                this.sprites.rowsdown_up = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.sprites.rowsdown_over = new PIXI.Sprite(resources.arrowdown_over.texture);
                this.sprites.rowsdown_hit = new PIXI.Sprite(resources.arrowdown_up.texture);
                this.onLoadCompleted();
            }.bind(this));
        this.loader.load();
    }
    private coordinates = function(){

    }

    private onLoadCompleted = function() {
        this.createGrid( this.algorithm.cols, this.algorithm.rows);
        this.createLine();
        this.createText();
        this.createButtons();
    }
    private createButtons = function(){
      var rowsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", "rowsup", 405, window.innerHeight - 45, function(){
        this.algorithm.rows++;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(),0,0)
        //update board/matrix

      }.bind(this));
      var rowsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", "rowdown",400, window.innerHeight - 30, function(){
        this.algorithm.rows--;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(),0,0)
        //update board/matrix

      }.bind(this));
      var colsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", "colsup", 605, window.innerHeight - 45, function(){
        this.algorithm.cols++;
        this.typeMe(this.colsValue, this.algorithm.cols.toString(),0,0)
        //update board/matrix

      }.bind(this));
      var colsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", "colsdown", 600, window.innerHeight - 30, function(){
        this.algorithm.cols--;
        this.typeMe(this.colsValue, this.cols.toString(),0,0)
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
    private createGrid = function(rows,cols) {
        this.algorithm.createGrid();
        var container = new PIXI.Container();
        this.stage.addChild(container);

        let totalmarks = this.algorithm.rows * this.algorithm.cols;
        console.log(totalmarks);
        for (var i = 0; i < totalmarks; i++) {
          // console.log(;
          // console.log("x: " + Math.floor(i * this.rows) * this.spacing + "y: " + (i % this.cols) * this.spacing););
            var mark = new PIXI.Sprite(this.loader.resources.mark_bracket.texture);
            container.addChild(mark);

            mark.anchor.set(0.5);
            mark.x = (i % this.algorithm.cols) * this.spacing;//(i % this.cols) * this.spacing;
            mark.y = Math.floor(i / this.algorithm.rows) * this.spacing; //(i % this.cols) * this.spacing;
            // bunny.x = (i % 5) * 40;
            // bunny.y = Math.floor(i / 5) * 40;            mark.y = Math.floor(i / this.rows) * this.spacing;
            mark.scale.x = 1;
            mark.scale.y = 1;
        }

        // Center on the screen
        container.x = (window.innerWidth - container.width) / 2;
        container.y = (window.innerHeight - container.height) / 2;
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

        //rows value
        this.rowsValue = new PIXI.Text('...', headline);
        this.rowsValue.x = 350;
        this.rowsValue.y = window.innerHeight - 50;

        this.stage.addChild(this.rowsValue);
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 4000);

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
        this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 5000);
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
        if (messageLength >= 1) {
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
