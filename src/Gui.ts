import * as PIXI from "pixi.js";
import { Btn } from "./Btn";
import { Algorithm } from "./Algorithm";

import gsap = require('gsap');
// import TweenLite = require('gsap/src/uncompressed/TweenLite.js');

export class Gui {
    private stage: PIXI.Container;
    private algorithm: Algorithm;
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
    private resources: any;
    private marks: any = [];
    private player: PIXI.Sprite;
    private playeroffsets: any;
    private squarecontainer: PIXI.Container;
    private arrowcontainer: PIXI.Container;
    private grid: any = {};
    private arrows: any = [];
    private tl: gsap.TimelineLite;
    private squareArr: PIXI.Graphics[];

    constructor(mainStage: PIXI.Container, mainColors: any, mainSounds: any) {
        this.stage = mainStage;
        this.colors = mainColors;
        this.sounds = mainSounds;
        this.algorithm = new Algorithm();
        this.playeroffsets = { x: this.algorithm.spacing / 2, y: this.algorithm.spacing / 2 };
        this.tl = new gsap.TimelineLite({paused:true});
        this.loadImages();
    }
    private loadImages = function(): void {
        //load images'
        this.loader = PIXI.loader
            .add('player_blue', 'src/graphics/player_blue.png')
            .add('arrow_direction', 'src/graphics/arrow_direction.png')
            .add('mark_dot', 'src/graphics/mark_dot.png')
            .add('arrowup_up', 'src/graphics/arrowup_up.png')
            .add('arrowup_over', 'src/graphics/arrowup_over.png')
            .add('arrowup_hit', 'src/graphics/arrowup_hit.png')
            .add('arrowdown_up', 'src/graphics/arrowdown_up.png')
            .add('arrowdown_over', 'src/graphics/arrowdown_over.png')
            .add('arrowdown_hit', 'src/graphics/arrowdown_hit.png')

            .add('stop_up', 'src/graphics/stop_up.png')
            .add('stop_over', 'src/graphics/stop_over.png')
            .add('stop_hit', 'src/graphics/stop_hit.png')

            .add('arrow_up', 'src/graphics/arrow_up.png')
            .add('arrow_over', 'src/graphics/arrow_over.png')
            .add('arrow_hit', 'src/graphics/arrow_hit.png')
            .on('complete', function(loader, resources) {
                this.sprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                this.sprites.arrow_direction = new PIXI.Sprite(resources.arrow_direction.texture);
                this.sprites.mark_dot = new PIXI.Sprite(resources.mark_dot.texture);
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

                this.sprites.stop_up = new PIXI.Sprite(resources.stop_up.texture);
                this.sprites.stop_over = new PIXI.Sprite(resources.stop_over.texture);
                this.sprites.stop_hit = new PIXI.Sprite(resources.stop_up.texture);

                this.sprites.arrow_up = new PIXI.Sprite(resources.arrow_up.texture);
                this.sprites.arrow_over = new PIXI.Sprite(resources.arrow_over.texture);
                this.sprites.arrow_hit = new PIXI.Sprite(resources.arrow_up.texture);
                this.onLoadCompleted();
            }.bind(this));
        this.loader.load();
    }
    private coordinates = function() {

    }

    private onLoadCompleted = function() {
        //containers
        this.arrowcontainer = new PIXI.Container();
        this.stage.addChild(this.arrowcontainer);

        this.createLine();
        this.createText();
        this.createButtons();
    }
    private increaseGrid() {
        this.algorithm.rows++;
        this.algorithm.cols++;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
        this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
    }
    private reduceGrid() {
        this.algorithm.rows--;
        this.algorithm.cols--;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
        this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
    }
    private createButtons = function() {
        var stopButton = new Btn(this.stage, this.loader.resources, "stop", "stop_up", window.innerWidth - 250, window.innerHeight - 30, function() {
            //update board/matrix
            //toggle playback
        }.bind(this));
        var resetButton = new Btn(this.stage, this.loader.resources, "arrow", "arrow_up", window.innerWidth - 200, window.innerHeight - 30, function() {
            //update board/matrix
            this.stage.destory(true);

        }.bind(this));
        var rowsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", "rowsup", 405, window.innerHeight - 45, function() {
            //update board/matrix
            this.increaseGrid();
            this.drawGrid();

        }.bind(this));
        var rowsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", "rowdown", 400, window.innerHeight - 30, function() {
            //update board/matrix
            this.reduceGrid();
            this.drawGrid();

        }.bind(this));
        var colsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", "colsup", 605, window.innerHeight - 45, function() {
            //update board/matrix
            this.increaseGrid();
            this.drawGrid();

        }.bind(this));
        var colsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", "colsdown", 600, window.innerHeight - 30, function() {
            //update board/matrix
            this.reduceGrid();
            this.drawGrid();
        }.bind(this));

    }
    private getPosition = function(padx, pady, gridIndex: number) {
        var pos: any = {};
        //graphic offset
        var padx = this.squaresContainer.x + padx;
        var pady = this.squaresContainer.y + pady;

        //calculate position
        pos.x = this.grid[gridIndex].x * this.algorithm.spacing + padx;
        pos.y = this.grid[gridIndex].y * this.algorithm.spacing + pady;
        pos.angle = ((this.grid[gridIndex].direction * 90) * Math.PI / 180);
        // console.log(this.degrees(pos.angle));
        return pos;
    }
    //make arrows
    private createArrows = function(): void {
        if (this.arrows.length > 0) {
            for (var i = 0; i < this.arrows.length; i++) {
                this.arrows[i].destroy();
            }
        }
        this.arrows = [];
        for (var i = 0; i < this.grid.length; i++) {
            this.arrows.push(new PIXI.Sprite(this.loader.resources.arrow_direction.texture));
            this.stage.addChild(this.arrows[i]);
            this.arrows[i].anchor.set(0.5, 0.5);
            var padx = 25;
            var pady = 25;
            var pos = this.getPosition(padx, pady, i);
            gsap.TweenLite.to(this.arrows[i].position, 0, { x: pos.x, y: pos.y });
            gsap.TweenLite.to(this.arrows[i], 0, { directionalRotation: { rotation: (pos.angle + '_short'), useRadians: true } });
        }
        // this.arrowcontainer.x = (this.squaresContainer.width);
        // this.arrowcontainer.y = (this.squaresContainer.height);
        this.arrowcontainer.x = (this.squaresContainer.width);
        this.arrowcontainer.y = (this.squaresContainer.height);
    }
    //takes index, duration, delay and if you want to queue multiple events onto timeline
    private movePlayer = function(gridIndex: number, nduration: number, ndelay: number, queue: boolean): void {
        //calculate position
        var pos = this.getPosition(this.playeroffsets.x, this.playeroffsets.y, gridIndex);

        //set visited
        this.grid[gridIndex].visited = true;

        var visitedFilter = new PIXI.filters.BlurFilter();
        this.squareArr[gridIndex].filters = [visitedFilter];
        visitedFilter.blur = 0;


        //set up transition
        if (queue) {
            // console.log("queueing:" + gridIndex);
            this.tl.add(gsap.TweenLite.to(this.player.position, nduration, { x: pos.x, y: pos.y, delay: ndelay }));
            this.tl.add(gsap.TweenLite.to(this.player, nduration, { directionalRotation: { rotation: (pos.angle + '_short'), useRadians: true } , delay: ndelay }));
            this.tl.add(gsap.TweenLite.to(visitedFilter, nduration, { blur:10, ease:gsap.quadIn , delay: ndelay }));
        } else {
            // console.log("immediate");
            // console.log("this.player", this.player);
            gsap.TweenLite.to(this.player.position, nduration, { x: pos.x, y: pos.y, delay: ndelay });
            gsap.TweenLite.to(this.player, nduration, { directionalRotation: { rotation: (pos.angle + '_short'), useRadians: true }, delay: ndelay },0);
            gsap.TweenLite.to(visitedFilter, nduration, { blur:10, ease:gsap.quadIn , delay: ndelay });
        }
    }
    private removePlayer = function(): void {
        console.log("removePlayer");
        //gsap.TweenLite.to(this.player, 10,{scale: 2, alpha: 0.5});
        this.sounds.play("yelp");
    }
    private radians = function(degrees: number) {
        var radians = degrees * (Math.PI / 180)
        return radians % (Math.PI / 180);
    }
    private degrees = function(radians: number) {
        var degrees = radians * (180 / Math.PI);
        return degrees;
    }
    //not working
    private deltaAngle = function(source, target) {
        var target = this.degrees(target);
        var source = this.degrees(source);

        var d = target - source;
        var result = (d + 180) % 360 - 180;
        result = this.radians(result);
        return result;
    }
    //returns radians now
    private createPlayer = function(): void {

        //get random position
        var ran = this.algorithm.randomStart();

        //graphic offset
        var padx = this.squaresContainer.x + this.playeroffsets.x;
        var pady = this.squaresContainer.y + this.playeroffsets.y;
        //calculate position
        var posx = this.grid[ran].x * this.algorithm.spacing + padx;
        var posy = this.grid[ran].y * this.algorithm.spacing + pady;
        // console.log(this.grid[ran]);

        //player
        this.player = this.sprites.player_blue;
        this.stage.addChild(this.player);
        this.player.anchor.set(0.5, 0.4);

        //clear timeline
        this.tl.clear();

        this.movePlayer(ran, 0, 0);
        this.sounds.play("start");

        //check outcome
        var result = this.algorithm.checkLoop(this.grid, ran);

        this.typeMe(this.status, result.message, 0, 0);

        //run simulation
        this.animateSolution(ran);
    }
    private animateSolution = function(gridIndex: number) {
        var newIndex = gridIndex;
        // console.log("====gridIndex", gridIndex);
        var next: any;
        var runTest = true;
        //check set visited
        //while(!testComplete){
        var next = this.algorithm.getNext(this.grid[newIndex]);
        newIndex = this.findIndex(next.x, next.y);
        console.log("1newIndex", newIndex);
        var count = 0;
       do{
         console.log("runTest");
            if(newIndex) {
                if (this.grid[newIndex].visited) {
                    runTest = false;
                    console.log("testComplete");
                    this.tl.play();
                    //this.removePlayer();
                } else {
                    this.movePlayer(newIndex, 0.2, 0, true);
                }
                //update next
                next = this.algorithm.getNext(this.grid[newIndex]);
                newIndex = this.findIndex(next.x, next.y);
            }else{
              runTest = false;
            }
       }while(runTest)

    }
    private findIndex = function(x: number, y: number) {
        for (var i = 0; i < this.grid.length; i++) {
            if (this.grid[i].x == x && this.grid[i].y == y) {
                return i;
            }
        }
    }
    private isEven = function(n) {
        return n % 2 == 0;
    }
    private drawGrid = function() {
        this.grid = this.algorithm.reset();
        if (this.squaresContainer) {
            this.squaresContainer.destroy(true);
        }
        this.squaresContainer = new PIXI.Container();
        this.stage.addChild(this.squaresContainer);

        //using graphics for squares
        let squarecolor: number;
        this.squareArr = [];
        for (var i = 0; i < this.grid.length; i++) {
            // set a fill and line style
            if (this.isEven(Math.floor(i / this.algorithm.rows))) {
                if (this.isEven(i)) {
                    squarecolor = this.colors.squaredark
                } else {
                    squarecolor = this.colors.squarelight
                }
            } else {
                if (this.isEven(i)) {
                    squarecolor = this.colors.squarelight
                } else {
                    squarecolor = this.colors.squaredark
                }
            }
            var squareContainer = new PIXI.Container();
            var square = new PIXI.Graphics();
            square.beginFill(squarecolor, 0.5);
            square.lineStyle(1, this.colors.lines, 1);
            var x = (i % this.algorithm.cols) * this.algorithm.spacing;
            var y = Math.floor(i / this.algorithm.rows) * this.algorithm.spacing;
            square.drawRect(x, y, this.algorithm.spacing, this.algorithm.spacing);
            square.drawRect(x, y, this.algorithm.spacing, this.algorithm.spacing);
            squareContainer.addChild(square);
            this.squareArr.push(squareContainer);
            this.squaresContainer.addChild(this.squareArr[i]);
        }

        // this.squaresContainer.addChild(squares);

        // Center on the screen
        this.squaresContainer.x = (window.innerWidth - this.squaresContainer.width) / 2;
        this.squaresContainer.y = (window.innerHeight - this.squaresContainer.height) / 2;
        this.createPlayer();
        this.createArrows();
    }

    private createLine = function(): void {
        this.line = new PIXI.Graphics();

        // set a fill and line style
        this.line.lineStyle(0.5, this.colors.line, 0.5);

        // draw a shape
        this.line.moveTo(100, window.innerHeight - 70);
        this.line.lineTo(window.innerWidth - 100, window.innerHeight - 70);
        this.sounds.play("move");

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
            dropShadow: true,
            wordWrap: true,
            wordWrapWidth: 440
        });
        let headline = new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontSize: 18,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fill: this.colors.headline,
            dropShadow: false,
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
        setTimeout(this.drawGrid.bind(this), 6000);
    }
    private typeMe = function(textObj: PIXI.Text, message: string, messageLength: number, delay: number): void {
        if (messageLength === undefined) {
            textObj.text = "";
            messageLength = 0;
        }

        //loop through typing
        let newString: string = message.substring(0, messageLength);
        textObj.text = newString;
        if (messageLength >= 1) {
            this.sounds.play("keypress");
        }

        //increment length of message
        messageLength++;

        if (messageLength < message.length + 1) {
            setTimeout(this.typeMe.bind(this, textObj, message, messageLength, 50), delay);
        }

    }
}
