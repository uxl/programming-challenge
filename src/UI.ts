//load pixi webgl rendering engine
import * as PIXI from "pixi.js";

//load animation library
import gsap = require("gsap");

//load graphic assets {sprites, resources(textures)}
import { Loader } from "./Loader"

//load sounds
import { SoundEffects } from "./SoundEffects";

//load graphical element
import { Gizmo } from "./Gizmo";

//load color palettes
import { ColorPalettes } from "./ColorPalettes";

//load btn class
import { Btn } from "./Btn";


export class UI {

    private controller: Controller;
    private colors: any;
    private sounds: any;

    private stage: PIXI.Container;

    //algorithm option
    private isBigO1: boolean = true;

    //text elements
    private bigO1: PIXI.Text;
    private bigOn: PIXI.Text;
    private rowsTitle: PIXI.Text;
    private rowsValue: PIXI.Text;
    private colsTitle: PIXI.Text;
    private colsValue: PIXI.Text;

    //graphic elements
    private line: PIXI.Graphics;
    private marks: any = [];
    private player: PIXI.Sprite;
    private playeroffsets: any;
    private grid: any = {};
    private arrows: any = [];
    private tl: gsap.TimelineLite;
    private squareArr: any = [];
    private ran: number = -1;
    private steps: number = 0;

    //container obects
    private squaresContainer: PIXI.Container;
    private arrowContainer: PIXI.Container;

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

    //gizmo
    private gizmoX: Gizmo;
    private gizmoY: Gizmo;

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
        this.assets = new Loader();

        //run dependencies
        this.changeColors(0); //arg: color index
        this.loadGraphics();
    }

    //load color palletes - delivered by promise - run dependency
    private changeColors = function(pindex:number){
      this.ColorPalettes.loadColors(pindex)
      .then(function (data) {
        this.colors = data;
        this.checkLoad();
        //setupPixi();
      })
      .catch(function (err) {
        console.error('Augh, there was an error!', err);
      });
    }

    //load graphical assets - run dependency
    private loadGraphics = function(){
      this.gfx.loadGraphics()
      .then(function (data) {
        this.gfx = data; //replace loader instance with returned product //bad?
        this.checkLoad();
        //setupPixi();
      })
      .catch(function (err) {
        console.error('Augh, there was an error!', err);
      });
    }

    private checkLoad = function(){
      //check load condition
      //on success -> setupPixi()
    }
    //resize event to handle console window opening
    public windowResize = function() {
        //fix textpos
        console.log("resizeWindow");
        if (this.squaresContainer) {
            this.squaresContainer.x = (window.innerWidth - this.squaresContainer.width) / 2;
            this.squaresContainer.y = (window.innerHeight - this.squaresContainer.height) / 2;
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
                    this.sounds.play("beep");
                    this.isPlaying = true;
                    this.createPlayer();
                    this.playButton.active = true;
                    this.pauseButton.active = false;

                    // this.playButton.alpha = 0.5;
                } else {
                    if (this.isPlaying && !this.isPaused) {
                        //do nothing
                    } else {
                        //if paused unpause
                        this.playToggle('pause');
                    }
                }
                break;
            case 'reset':
                this.sounds.play("beep");
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
                this.playButton.active = false;
                this.pauseButton.active = false;
                break;
            case 'pause':
                if (!this.isPaused && this.isPlaying) {
                    this.sounds.play("beep");
                    this.tl.pause();
                    this.isPlaying = false;
                    this.isPaused = true;
                    this.playButton.active = false;
                    this.pauseButton.active = true;
                } else {
                    this.tl.play();
                    this.isPlaying = true;
                    this.isPaused = false;
                    this.playButton.active = true;
                    this.pauseButton.active = false;
                }
                break;
        }
    }

    //build ui after load completion
    private onLoadCompleted = function() {
        //containers
        this.arrowContainer = new PIXI.Container();
        this.stage.addChild(this.arrowContainer);

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
        this.resetButton = new Btn(this.stage, this.loader.resources, "reset", 1000, window.innerHeight - 35, function() {
            this.playToggle('reset');
        }.bind(this));
        this.pauseButton = new Btn(this.stage, this.loader.resources, "pause", 950, window.innerHeight - 35, function() {
            this.playToggle('pause');
        }.bind(this));
        this.playButton = new Btn(this.stage, this.loader.resources, "play", 900, window.innerHeight - 35, function() {
            this.playToggle('play');
        }.bind(this));
        this.rowsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", 405, window.innerHeight - 45, function() {
            this.increaseGrid();
            this.playToggle('reset');

        }.bind(this));
        this.rowsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", 400, window.innerHeight - 30, function() {
            //update board/matrix
            this.reduceGrid();
            this.playToggle('reset');
        }.bind(this));
        this.colsButtonUp = new Btn(this.stage, this.loader.resources, "arrowup", 605, window.innerHeight - 45, function() {
            //update board/matrix
            this.increaseGrid();
            this.playToggle('reset');
        }.bind(this));
        this.colsButtonDown = new Btn(this.stage, this.loader.resources, "arrowdown", 600, window.innerHeight - 30, function() {
            //update board/matrix
            this.reduceGrid();
            this.playToggle('reset');
        }.bind(this));
    }

    //get position {x:n, y:n, angle:radians} based on index
    private getPosition = function(padx, pady, gridIndex: number) {
        var pos: any = {};
        //graphic offset
        var padx = this.squaresContainer.x + padx;
        var pady = this.squaresContainer.y + pady;
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
        this.arrowContainer.x = (this.squaresContainer.width);
        this.arrowContainer.y = (this.squaresContainer.height);
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
        var padx = this.squaresContainer.x + this.playeroffsets.x;
        var pady = this.squaresContainer.y + this.playeroffsets.y;
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
        this.sounds.play("result");

        if (this.squareArr.length > 0) {
            for (var i = 0; i < this.squareArr.length; i++) {
                this.squareArr[i].destroy();
            }
            this.squareArr = [];
        }
        this.grid = this.algorithm.reset();
        if (this.squaresContainer) {
            this.squaresContainer.destroy();
        }
        this.squaresContainer = new PIXI.Container();
        this.stage.addChild(this.squaresContainer);

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
            this.squaresContainer.addChild(this.squareArr[i]);
            gsap.TweenLite.to(this.squareArr[i], 0.1, { alpha: 1, delay: Math.random() * 0.4 });
        }

        // Center on the screen
        this.squaresContainer.x = (window.innerWidth - this.squaresContainer.width) / 2;
        this.squaresContainer.y = (window.innerHeight - this.squaresContainer.height) / 2;
        this.drawArrows();
        setTimeout(function() {
            if (this.isPlaying) {
                this.createPlayer();
            }
        }.bind(this), 2000);

        //gizmo
        this.gizmoX = new Gizmo(this);
        //this.gizmoY = new Gizmo(this));
    }

    //gui element drawn
    private createLine = function(): void {
        this.line = new PIXI.Graphics();

        // set a fill and line style
        this.line.lineStyle(0.5, this.colors.line, 0.5);

        // draw a shape
        this.line.moveTo(100, window.innerHeight - 70);
        this.line.lineTo(window.innerWidth - 100, window.innerHeight - 70);

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




    //Create the app
    let renderer: any;
    let stage: PIXI.Container;


    let setupPixi = function():void{

      renderer = PIXI.autoDetectRenderer(960,540,
        {antialias: true, transparent: false, resolution: 1, autoResize: true}
      );
      renderer.view.style.position = "absolute";
      renderer.view.style.display = "block";
      renderer.autoResize = true;
      renderer.resize(window.innerWidth, window.innerHeight);

      //Create a container object called the `stage`
      stage = new PIXI.Container();
      stage.interactive = true;

      //Add the canvas to the HTML document
      document.body.appendChild(renderer.view);

      //Update background color
      renderer.backgroundColor = colors['background'];

      drawScene();
    }

    //Draw scene
    let drawScene = function(){
        //init Gui pass in colors
        maingui = new Gui( stage, colors, SOUNDLIB);
        //start rendering engine
        renderLoop();
        console.log("started renderLoop");
    };


    let renderLoop = function():void{
      //loop 60 frames per second
      requestAnimationFrame(renderLoop);

      renderer.render(stage);
    }
    // var reqestAniFrame = new requestAnimationFrame(fps, callback);

    //Resize electron window
    window.onresize = function (event):void{
      maingui.windowResize();
    };
}
