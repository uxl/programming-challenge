function Floor() {
    PIXI.DisplayObjectContainer.call(this);
    this.init = function() {
        this.createGraphics();
    }
    this.createGraphics = function() {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.drawCircle(0, 0, 50);
        graphics.endFill();
        this.addChild(graphics);
    }
    this.init();
}
Floor.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);
Floor.prototype.constructor = Floor;
