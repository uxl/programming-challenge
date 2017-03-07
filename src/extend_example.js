function Floor()

{

    PIXI.DisplayObjectContainer.call(this);

    this.init();

}

Floor.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Floor.prototype.constructor = Floor;

Floor.prototype.init = function() {

    this.createGraphics();

}

Floor.prototype.createGraphics = function() {

    var graphics = new PIXI.Graphics();

    graphics.beginFill(0xFFFF00);

    graphics.drawCircle(0, 0, 50);

    graphics.endFill();

    this.addChild(graphics);

}
