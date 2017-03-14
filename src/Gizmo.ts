import * as PIXI from "pixi.js";
import gsap = require('gsap');

export class Gizmo {

    private axis: string = "x"; //x or y
    private gizmoSprite: PIXI.Sprite;
    private gizmoText: PIXI.Text;
    private gizmoLine: PIXI.Graphics;

    private gizmoContainer: PIXI.Container;
    private orientation: string;
    private target: PIXI.Sprite;
    private context;

    constructor(that) { //gizsprite, linecolor, fillcolor, axis, target
      var self = that;
      var colors = self.colors;
      var player = self.player;
      var mark_dot = self.sprites.mark_dot;


        let data = new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fill: colors.font,
            dropShadow: false,
            wordWrap: true,
            wordWrapWidth: 440
        });

        this.gizmoSprite = self.sprites.mark_dot;
        this.gizmoSprite.x = -2;
        this.gizmoSprite.y = 4;

        this.gizmoText = new PIXI.Text('00:00', data);
        this.gizmoText.x = 10;
        this.gizmoText.y = 0;

        this.gizmoLine = new PIXI.Graphics();
        this.gizmoLine.lineStyle(0.5, colors.line, 0.5);
        this.gizmoLine.moveTo(-25, 8);
        this.gizmoLine.lineTo(-5, 8);

        //add gizmoContainer
        this.gizmoContainer = new PIXI.Container();
        this.gizmoContainer.addChild(this.gizmoSprite, this.gizmoText, this.gizmoLine);
        self.stage.addChild(this.gizmoContainer);
        this.gizmoContainer.x = 100;
        this.gizmoContainer.y = 400;

    }
    public updatePosition(){
      if(this.orientation == "x"){
        gsap.TweenLite.to(this, 0.82, {x:this.target.x});
      }else{
        gsap.TweenLite.to(this, 0.82, {x:this.target.y});
      }
    }
    private renderGizmo = function():void{
      //loop 60 frames per second
      requestAnimationFrame(this.renderGizmo);

      this.updatePosition();
    }
    //get and set for rows and columns
    // get active(): boolean {
    //
    // }
    // set active(newval: boolean) {
    //
    // }

}
