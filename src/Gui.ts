import * as PIXI from "pixi.js";

export class Gui {
    private stage: PIXI.Container;
    private colors: any;
    private sounds: any;
    private status: PIXI.Text;
    private line: PIXI.Graphics;
    private loader = new PIXI.loaders.Loader();
    private sprites: any = {};

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
        //load images
        this.loader = PIXI.loader
            .add('arrowblue', 'src/graphics/arrow_blue.png')
            .add('mark', 'src/graphics/mark_bracket.png')
            .load(function(loader, resources) {
                newSprites.mark = new PIXI.Sprite(resources.mark.texture);
                newSprites.arrow = new PIXI.Sprite(resources.arrowblue.texture);

                newStage.addChild(newSprites.arrow);
                newSprites.arrow.position.x = 200;
                newSprites.arrow.position.y = 200;

                drawGrid(newStage, resources, 10, 10, 65);
            });
    }
    private drawArrow = function() {
        // //single object test

        this.stage.addChild(this.sprites.arrow);
        this.sprites.arrow.position.x = 200;
        this.sprites.arrow.position.y = 200;
    }
    private drawGrid = function(newStage:any, resources:any, rows:number, cols:number, spacing:number): void {
      var container = new PIXI.Container();
      newStage.addChild(container);
        let totalmarks = rows * cols;
        for (let i = 0; i < totalmarks; i++) {
            let mark = new PIXI.Sprite(resources.mark.texture);
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
    /*
    private createButton = function(): void {
        // create some textures from an image path
        var textureButton = this.graphics.loader.resources["src/graphics/arrow_wait.png"].texture;
        var textureButtonDown = this.graphics.loader.resources["src/graphics/arrow_press.png"].texture;
        var textureButtonOver = this.graphics.loader.resources["src/graphics/arrow_error.png"].texture;

        var button = new PIXI.Sprite(textureButton);
        button.buttonMode = true;

        button.anchor.set(0.5);
        button.x = 200;
        button.y = 200;

        // make the button interactive...
        button.interactive = true;
        button.buttonMode = true;

        button
            // Mouse & touch events are normalized into
            // the pointer* events for handling different
            // button events.
            .on('pointerdown', onButtonDown)
            .on('pointerup', onButtonUp)
            .on('pointerupoutside', onButtonUp)
            .on('pointerover', onButtonOver)
            .on('pointerout', onButtonOut);

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
        this.stage.addChild(button);


        function onButtonDown() {
            this.isdown = true;
            this.texture = textureButtonDown;
            this.alpha = 1;
        }

        function onButtonUp() {
            this.isdown = false;
            if (this.isOver) {
                this.texture = textureButtonOver;
            }
            else {
                this.texture = textureButton;
            }
        }

        function onButtonOver() {
            this.isOver = true;
            if (this.isdown) {
                return;
            }
            this.texture = textureButtonOver;
        }

        function onButtonOut() {
            this.isOver = false;
            if (this.isdown) {
                return;
            }
            this.texture = textureButton;
        }

    }
    */

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
        this.status.x = 110;
        this.status.y = window.innerHeight - 50;

        this.stage.addChild(this.status);
        this.typeMe(this.status, "Initializing...", 0);
    }
    // public updateText = function(message: string): PIXI.Text {
    //     this.status.text = message;
    //     return this.status;
    // }
    private typeMe = function(textObj: PIXI.Text, message: string, messageLength: number): void {
        // console.log(message + ' | ' + messageLength);
        if (messageLength === undefined) {
            // console.log("starting type");
            // textObj.text = '';
            messageLength = 0;
        } else {
            //increment length of message
            messageLength++;
        }

        //loop through typing
        let newString: string = message.substring(0, messageLength);
        textObj.text = newString;
        this.sounds.play("keypress");
        // console.log(newString);

        if (messageLength < message.length + 1) {
            setTimeout(this.typeMe.bind(this, textObj, message, messageLength), 50);
            // setTimeout(this.declare.bind(this), 1000);
        }else{
          //Play startup sound
          this.sounds.play("start");
        }
    }
}
