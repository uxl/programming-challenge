export class Player {

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
}
