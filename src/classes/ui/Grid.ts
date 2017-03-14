export class Grid {

    private squaresContainer: PIXI.Container;
    private arrowContainer: PIXI.Container;

    constructor(){

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
        this.grid = this.business.reset();
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
            if (this.isEven(Math.floor(i / this.business.rows))) { // if even row
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
            var x = (i % this.business.cols) * this._spacing;
            var y = Math.floor(i / this.business.rows) * this._spacing;
            square.drawRect(x, y, this._spacing, this._spacing);
            square.drawRect(x, y, this._spacing, this._spacing);
            squareContainer.addChild(square);
            squareContainer.alpha = 0;
            this.squareArr.push(squareContainer);
            this.squaresContainer.addChild(this.squareArr[i]);
            gsap.TweenLite.to(this.squareArr[i], 0.1, { alpha: 1, delay: Math.random() * 0.4 });
        }

        // Center on the screen
        this.center();

        this.drawArrows();

        setTimeout(function() {
            if (this.isPlaying) {
                //this.createPlayer();
            }
        }.bind(this), 2000);

        //gizmo
        //this.gizmoX = new Gizmo(this);
        //this.gizmoY = new Gizmo(this));
    }
    public center = function(){
      this.squaresContainer.x = (window.innerWidth - this.squaresContainer.width) / 2;
      this.squaresContainer.y = (window.innerHeight - this.squaresContainer.height) / 2;
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
}
