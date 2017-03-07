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

    constructor(mainStage:any, mainColors:any, sprites:any, axis:string, target:PIXI.Sprite, pos: number) {

      this.target = target;
        let data = new PIXI.TextStyle({
            fontFamily: 'Helvetica',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 'normal',
            fill: mainColors.gizmo,
            dropShadow: false,
            wordWrap: true,
            wordWrapWidth: 440
        });

        this.gizmoSprite = sprites.mark_dot;
        this.gizmoSprite.x = 0;
        this.gizmoSprite.y = 0;

        this.gizmoText = new PIXI.Text('00:00', data);
        this.gizmoText.x = 0;
        this.gizmoText.y = 0;

        this.gizmoLine = new PIXI.Graphics();
        this.gizmoLine.lineStyle(0.5, mainColors.line, 0.5);
        this.gizmoLine.moveTo(-25, 8);
        this.gizmoLine.lineTo(-5, 8);

        this.gizmoContainer = new PIXI.Container();
        mainStage.addChild(this.gizmoContainer);
        this.gizmoContainer.addChild(this.gizmoSprite, this.gizmoText, this.gizmoLine);

        this.orientation = axis;
        //this.gizmoContainer.x = mainStage.getChildIndex('squaresContainer');

        if(this.orientation == "x"){
          this.gizmoContainer.x = pos + 40;
          //this.gizmoContainer.rotation = 90 * (Math.PI / 180);
        }else{
          //this.gizmoContainer.rotation = 90 * (Math.PI / 180);
        }
    }
    public updatePosition(){
      if(this.orientation == "x"){
        gsap.TweenLite.to(this, 0.82, {x:this.target.x});
      }else{
        gsap.TweenLite.to(this, 0.82, {x:this.target.y});
      }
    }
    // private renderLoop = function():void{
    //   //loop 60 frames per second
    //   requestAnimationFrame(this.renderLoop);
    //
    //   this.updatePosition();
    // }
    //get and set for rows and columns
    // get active(): boolean {
    //
    // }
    // set active(newval: boolean) {
    //
    // }

}
