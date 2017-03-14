export class RenderLoop {
    //Start render loop - make RenderLoop Class?
    private startRender = function() {
        //init Gui pass in colors
        //this.maingui = new Gui( stage, colors, SOUNDLIB);
        //start rendering engine
        this.renderLoop();
        console.log("started renderLoop");
    };

    private renderLoop = function(): void {
        //loop 60 frames per second
        requestAnimationFrame(this.renderLoop);

        this.renderer.render(this.stage);
    }
}
