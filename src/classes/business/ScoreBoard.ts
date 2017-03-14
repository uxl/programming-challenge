export class ScoreBoard {
  constructor(){

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
}
