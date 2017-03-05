import * as PIXI from "pixi.js";
import { Btn } from "./Btn";
import { Algorithm } from "./Algorithm";

import gsap = require('gsap');
// import TweenLite = require('gsap/src/uncompressed/TweenLite.js');

export class Gui {
    private isBigO1: boolean = true;

    private stage: PIXI.Container;
    private algorithm: Algorithm;
    private colors: any;
    private sounds: any;

    //text elements
    private bigO1: PIXI.Text;
    private bigOn: PIXI.Text;
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
    private squareArr: any = [];
    private ran: number = -1;
    private steps: number = 0;

    private score: any = { off: 0, loop: 0 };
    private cycles: number = 0;
    private stepsAverage: number = 0;
    private steps_average: PIXI.Text;
    private score_off: PIXI.Text;
    private score_looped: PIXI.Text;

    private playButton: Btn;
    private pauseButton: Btn;
    private resetButton: Btn;

    private isPlaying: boolean = false;
    private isPaused: boolean = false;

    //grab objects from main context
    //create timeline
    //player offset based on size of squares

    constructor(mainStage: PIXI.Container, mainColors: any, mainSounds: any) {
        this.stage = mainStage;
        this.colors = mainColors;
        this.sounds = mainSounds;
        this.algorithm = new Algorithm();
        this.playeroffsets = { x: this.algorithm.spacing / 2, y: this.algorithm.spacing / 2 };
        this.tl = new gsap.TimelineLite({ paused: true, onComplete: this.drawGrid, onCompleteScope: this });
        this.loadImages();
    }

    //resize event to handle console window opening
    public windowResize = function() {
        //fix textpos
        console.log("resizeWindow");
        if (this.squarescontainer) {
            this.squarescontainer.x = (window.innerWidth - this.squarescontainer.width) / 2;
            this.squarescontainer.y = (window.innerHeight - this.squarescontainer.height) / 2;
            this.drawArrows();
        }
    }

    // manage play, pause and restart states
    private playToggle = function(stat: string) {
        // console.log("playToggle: " + stat + " isPlaying: " + this.isPlaying + " | isPaused: " + this.isPaused);
        switch (stat) {
            case 'play':
                // is play false is paused false - first run or reset
                if (!this.isPlaying && !this.isPaused) {
                    this.isPlaying = true;
                    this.createPlayer();
                    // this.playButton.alpha = 0.5;
                } else {
                    if (this.isPlaying && !this.isPaused) {
                    } else {
                        //if paused unpause
                        this.playToggle('pause');
                    }
                }
                break;
            case 'reset':
                this.isPaused = false;
                this.isPlaying = false;
                //scores
                this.score = { off: 0, loop: 0 };
                this.stepsAverage = 0;
                this.steps = 0;
                this.updateScore({ reset: true });
                this.tl.clear();
                this.drawGrid();
                this.removePlayer();
                break;
            case 'pause':
                if (!this.isPaused && this.isPlaying) {
                    this.tl.pause();
                    this.isPlaying = false;
                    this.isPaused = true;
                } else {
                    this.tl.play();
                    this.isPlaying = true;
                    this.isPaused = false;
                }
                break;
        }
    }
    //load images and create sprites for buttons, player
    private loadImages = function(): void {
        //load images'
        this.loader = PIXI.loader
            .add('player_blue', 'src/graphics/player_blue.png')
            .add('arrow_direction', 'src/graphics/arrow_direction.png')
            .add('mark_dot', 'src/graphics/mark_dot.png')
            .add('arrowup_out', 'src/graphics/arrowup_out.png')
            .add('arrowup_over', 'src/graphics/arrowup_over.png')
            .add('arrowup_down', 'src/graphics/arrowup_down.png')
            .add('arrowdown_out', 'src/graphics/arrowdown_out.png')
            .add('arrowdown_over', 'src/graphics/arrowdown_over.png')
            .add('arrowdown_down', 'src/graphics/arrowdown_down.png')

            .add('pause_out', 'src/graphics/pause_out.png')
            .add('pause_over', 'src/graphics/pause_over.png')
            .add('pause_down', 'src/graphics/pause_down.png')

            .add('play_out', 'src/graphics/play_out.png')
            .add('play_over', 'src/graphics/play_over.png')
            .add('play_down', 'src/graphics/play_down.png')

            .add('reset_out', 'src/graphics/reset_out.png')
            .add('reset_over', 'src/graphics/reset_over.png')
            .add('reset_down', 'src/graphics/reset_down.png')

            .on('complete', function(loader, resources) {
                this.sprites.player_blue = new PIXI.Sprite(resources.player_blue.texture);
                this.sprites.arrow_direction = new PIXI.Sprite(resources.arrow_direction.texture);
                this.sprites.mark_dot = new PIXI.Sprite(resources.mark_dot.texture);
                this.sprites.colsup_out = new PIXI.Sprite(resources.arrowup_out.texture);
                this.sprites.colsup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.colsup_down = new PIXI.Sprite(resources.arrowup_out.texture);
                this.sprites.colsdown_out = new PIXI.Sprite(resources.arrowdown_out.texture);
                this.sprites.colsdown_over = new PIXI.Sprite(resources.arrowdown_over.texture);
                this.sprites.colsdown_down = new PIXI.Sprite(resources.arrowdown_out.texture);
                this.sprites.rowsup_out = new PIXI.Sprite(resources.arrowup_out.texture);
                this.sprites.rowsup_over = new PIXI.Sprite(resources.arrowup_over.texture);
                this.sprites.rowsup_down = new PIXI.Sprite(resources.arrowup_out.texture);
                this.sprites.rowsdown_out = new PIXI.Sprite(resources.arrowdown_out.texture);
                this.sprites.rowsdown_over = new PIXI.Sprite(resources.arrowdown_over.texture);
                this.sprites.rowsdown_down = new PIXI.Sprite(resources.arrowdown_out.texture);

                this.sprites.pause_out = new PIXI.Sprite(resources.pause_out.texture);
                this.sprites.pause_over = new PIXI.Sprite(resources.pause_over.texture);
                this.sprites.pause_down = new PIXI.Sprite(resources.pause_down.texture);

                this.sprites.play_out = new PIXI.Sprite(resources.play_out.texture);
                this.sprites.play_over = new PIXI.Sprite(resources.play_over.texture);
                this.sprites.play_down = new PIXI.Sprite(resources.play_down.texture);

                this.sprites.reset_out = new PIXI.Sprite(resources.reset_out.texture);
                this.sprites.reset_over = new PIXI.Sprite(resources.reset_over.texture);
                this.sprites.reset_down = new PIXI.Sprite(resources.reset_down.texture);

                this.onLoadCompleted();
            }.bind(this));
        this.loader.load();
    }

    //build ui after load completion
    private onLoadCompleted = function() {
        //containers
        this.arrowcontainer = new PIXI.Container();
        this.stage.addChild(this.arrowcontainer);

        this.createLine();
        this.createText();
        this.createButtons();
    }

    // add rows/cols button handler
    private increaseGrid() {
        this.algorithm.rows++;
        this.algorithm.cols++;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
        this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
    }

    // remove rows/cols button handler
    private reduceGrid() {
        this.algorithm.rows--;
        this.algorithm.cols--;
        this.typeMe(this.rowsValue, this.algorithm.rows.toString(), 0, 0);
        this.typeMe(this.colsValue, this.algorithm.cols.toString(), 0, 0);
    }

    //instantiate buttons
    private createButtons = function() {
        this.resetButton = new Btn(this.stage, this.loader.resources, "reset", "reset", 1000, window.innerHeight - 35, function() {
            this.playToggle('reset');

        }.bind(this));
        this.pauseButton = new Btn(this.stage, this.loader.resources, "pause", "pause", 950, window.innerHeight - 35, function() {
            this.playToggle('pause');
        }.bind(this));
        this.playButton = new Btn(this.stage, this.loader.resources, "play", "play", 900, window.innerHeight - 35, function() {
            this.playToggle('play');
        }.bind(this));
        this.rowsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", "rowsup", 405, window.innerHeight - 45, function() {
            this.increaseGrid();
            this.playToggle('reset');
        }.bind(this));
        this.rowsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", "rowdown", 400, window.innerHeight - 30, function() {
            //update board/matrix
            this.reduceGrid();
            this.playToggle('reset');
        }.bind(this));
        this.colsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", "colsup", 605, window.innerHeight - 45, function() {
            //update board/matrix
            this.increaseGrid();
            this.playToggle('reset');
        }.bind(this));
        this.colsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", "colsdown", 600, window.innerHeight - 30, function() {
            //update board/matrix
            this.reduceGrid();
            this.playToggle('reset');
        }.bind(this));
    }

    //get position {x:n, y:n, angle:radians} based on index
    private getPosition = function(padx, pady, gridIndex: number) {
        var pos: any = {};
        //graphic offset
        var padx = this.squarescontainer.x + padx;
        var pady = this.squarescontainer.y + pady;
        //calculate position
        pos.x = this.grid[gridIndex].x * this.algorithm.spacing + padx;
        pos.y = this.grid[gridIndex].y * this.algorithm.spacing + pady;
        pos.angle = ((this.grid[gridIndex].direction * 90) * Math.PI / 180);
        return pos;
    }
    //make arrows
    private drawArrows = function(): void {
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
        this.arrowcontainer.x = (this.squarescontainer.width);
        this.arrowcontainer.y = (this.squarescontainer.height);
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
        if (queue) {
            this.tl.add(gsap.TweenLite.to(this.player.position, nduration, { x: pos.x, y: pos.y, delay: ndelay }));
            this.tl.add(gsap.TweenLite.to(this.player, nduration, { directionalRotation: { rotation: (pos.angle + '_short'), useRadians: true }, delay: ndelay }));
            this.tl.add(gsap.TweenLite.to(visitedFilter, 0.3, { blur: 10, ease: gsap.quadIn, delay: 0 }));
        } else {
            gsap.TweenLite.to(this.player.position, nduration, { x: pos.x, y: pos.y, delay: ndelay });
            gsap.TweenLite.to(this.player, nduration, { directionalRotation: { rotation: (pos.angle + '_short'), useRadians: true }, delay: ndelay }, 0);
            gsap.TweenLite.to(visitedFilter, nduration, { blur: 10, ease: gsap.quadIn, delay: ndelay });
        }
    }
    //remove player - play yelp
    private removePlayer = function(): void {
        this.stage.removeChild(this.player);
        this.sounds.play("yelp");
    }
    //utility to convert radians
    private radians = function(degrees: number) {
        var radians = degrees * (Math.PI / 180)
        return radians % (Math.PI / 180);
    }
    //utility to convert degrees
    private degrees = function(radians: number) {
        var degrees = radians * (180 / Math.PI);
        return degrees;
    }

    //create player, position
    private createPlayer = function(): void {
        //get random position
        this.ran = this.algorithm.randomStart();

        //graphic offset
        var padx = this.squarescontainer.x + this.playeroffsets.x;
        var pady = this.squarescontainer.y + this.playeroffsets.y;
        //calculate position
        var posx = this.grid[this.ran].x * this.algorithm.spacing + padx;
        var posy = this.grid[this.ran].y * this.algorithm.spacing + pady;

        //player
        this.player = this.sprites.player_blue;
        this.stage.addChild(this.player);
        this.player.anchor.set(0.5, 0.4);

        this.movePlayer(this.ran, 0, 0);
        this.sounds.play("start");

        //check outcome
        if (this.isBigO1) {
            var result = this.algorithm.checkLoop(this.grid, this.ran);
            this.bigO1.text = result.message;
        }
        //run simulation
        if (this.isPlaying) {
            this.runSolution(this.ran);
        }
    }

    //animates and solves using visited flag in grid object
    private runSolution = function(gridIndex: number) {
        //flag ran so that we don't call animate without picking a new random
        this.ran = -1;

        var newIndex = gridIndex;
        var next: any;
        var runTest = true;

        var next = this.algorithm.getNext(this.grid[newIndex]);
        newIndex = this.findIndex(next.x, next.y);

        var count = 0;
        do {
            this.steps++;
            if (newIndex) {
                // this.typeMe(this.bigOn, "O(n): loop", 0, 0);
                this.bigOn.text = "O(n): loop";
                console.log("loop detected during animation");
                //loop detected
                if (this.grid[newIndex].visited) {
                    this.updateScore({ team: "loop", steps: this.steps });
                    runTest = false;
                    this.tl.add(gsap.TweenLite.to(this, 2, {}));
                    this.tl.play();
                } else {
                    this.movePlayer(newIndex, 0.3, 0, true);
                    next = this.algorithm.getNext(this.grid[newIndex]);
                    newIndex = this.findIndex(next.x, next.y);
                }
            } else {
                this.bigOn.text = "O(n): off grid";
                // this.typeMe(this.bigOn, "O(n): off grid", 0, 0);

                console.log("out of bounds detected during animation");
                this.updateScore({ team: "off", steps: this.steps });
                this.tl.add(gsap.TweenLite.to(this, 2, {}));
                this.tl.play();
                runTest = false;
            }
        } while (runTest)
    }
    //takes row and column number and returns index
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

    //redraws squares
    private drawGrid = function() {
        if (this.squareArr.length > 0) {
            for (var i = 0; i < this.squareArr.length; i++) {
                this.squareArr[i].destroy();
            }
            this.squareArr = [];
        }
        this.grid = this.algorithm.reset();
        if (this.squarescontainer) {
            this.squarescontainer.destroy();
        }
        this.squarescontainer = new PIXI.Container();
        this.stage.addChild(this.squarescontainer);

        //using graphics for squares
        //animates squares on
        var squarecolor: number;
        this.squareArr = [];
        for (var i = 0; i < this.grid.length; i++) {
            // set a fill and line style
            if (this.isEven(Math.floor(i / this.algorithm.rows))) { // if even row
                if (this.isEven(i)) { //if even
                    squarecolor = this.colors.squaredark;
                } else { //if odd
                    squarecolor = this.colors.squarelight;
                }
            } else { //if odd row
                if (this.isEven(i)) { //if even
                    squarecolor = this.colors.squarelight;
                } else { //if odd
                    squarecolor = this.colors.squaredark;
                }
            }
            var squareContainer = new PIXI.Container();
            var square = new PIXI.Graphics();
            square.beginFill(squarecolor, 1);
            square.lineStyle(1, this.colors.lines, 1);
            var x = (i % this.algorithm.cols) * this.algorithm.spacing;
            var y = Math.floor(i / this.algorithm.rows) * this.algorithm.spacing;
            square.drawRect(x, y, this.algorithm.spacing, this.algorithm.spacing);
            square.drawRect(x, y, this.algorithm.spacing, this.algorithm.spacing);
            squareContainer.addChild(square);
            squareContainer.alpha = 0;
            this.squareArr.push(squareContainer);
            this.squarescontainer.addChild(this.squareArr[i]);
            gsap.TweenLite.to(this.squareArr[i], 0.1, { alpha: 1, delay: Math.random() * 0.4 });
        }

        // Center on the screen
        this.squarescontainer.x = (window.innerWidth - this.squarescontainer.width) / 2;
        this.squarescontainer.y = (window.innerHeight - this.squarescontainer.height) / 2;
        this.drawArrows();
        setTimeout(function() {
            if (this.isPlaying) {
                this.createPlayer();
            }
        }.bind(this), 2000);
    }

    //gui element drawn
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

    //gui text elements created
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
        this.steps_average = new PIXI.Text('...', headline);
        this.steps_average.x = 110;
        this.steps_average.y = 240;

        this.stage.addChild(this.steps_average);
        this.typeMe(this.steps_average, "average steps: 0", 0, 2000);

        this.score_off = new PIXI.Text('...', headline);
        this.score_off.x = 110;
        this.score_off.y = 200;

        this.stage.addChild(this.score_off);
        this.typeMe(this.score_off, "offgrid: 0", 0, 2000);

        this.score_looped = new PIXI.Text('...', headline);
        this.score_looped.x = 110;
        this.score_looped.y = 160;

        this.stage.addChild(this.score_looped);
        this.typeMe(this.score_looped, "looped: 0", 0, 2000);

        //status
        this.bigOn = new PIXI.Text('...', headline);
        this.bigOn.x = 110;
        this.bigOn.y = 50;

        this.stage.addChild(this.bigOn);
        this.typeMe(this.bigOn, "O(n): ready", 0, 2000);

        this.bigO1 = new PIXI.Text('...', headline);
        this.bigO1.x = 110;
        this.bigO1.y = 90;

        this.stage.addChild(this.bigO1);
        this.typeMe(this.bigO1, "O(1): ready", 0, 2000);

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

        setTimeout(this.drawGrid.bind(this), 6000);
    }

    //updates the tally on outcomses
    //average forumula doesn't store array of sums to get average. Fixed(2) for display purposes
    private updateScore = function(data: any) {
        this.steps = 0;
        if (data.reset === true) {
            this.typeMe(this.score_off, "offgrid: 0", 8, 200);
            this.typeMe(this.score_looped, "looped: 0", 8, 200);
            this.typeMe(this.steps_average, "average steps: 0", 15, 200);
        }
        if (data.team == 'off') {
            this.score.off++;
            this.typeMe(this.score_off, "offgrid: " + this.score.off.toString(), 8, 200);
        }
        if (data.team == 'loop') {
            this.score.loop++;
            this.typeMe(this.score_looped, "looped: " + this.score.loop.toString(), 8, 200);
        }
        if (data.steps) {
            this.cycles++;
            this.stepsAverage = (((this.stepsAverage * this.cycles) + data.steps) / (this.cycles + 1));
            this.typeMe(this.steps_average, "average steps: " + this.stepsAverage.toFixed(2).toString(), 15, 200);
        }
    }

    //typing animation
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
