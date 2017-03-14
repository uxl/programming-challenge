import * as PIXI from "pixi.js";

export class Loader {
  private loader:any;
  private sprites: any = {};
    constructor() {
      //load images and create sprites for buttons, player
          //load images'
          this.loader = PIXI.loader
              .add('player_blue', 'src/graphics/player_blue.png')
              .add('arrow_direction', 'src/graphics/arrow_direction.png')
              .add('mark_dot', 'src/graphics/mark_dot.png')
              .add('mark_bracket', 'src/graphics/mark_bracket.png')
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
                  this.sprites.mark_bracket = new PIXI.Sprite(resources.mark_bracket.texture);
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
    private onLoadCompleted = function(){
      return {sprites: this.sprites, resources: this.loader.resources};
    }
}
