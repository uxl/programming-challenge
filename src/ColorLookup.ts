/* tslint:disable-next-line:no-var-requires */
import data from './colors.json';

export class ColorSchemes{
    private currentScheme: {};
    getColors = function(index:number):void{
      const colors = data["color"];
      console.log(colors);
      //return colors[index];
    }
}
// interface scheme {
//     background: number,
//     headline: number,
//     font: number,
//     squaredark: number,
//     squarelight: number,
//     buttonsolid: number,
//     buttonoutline: number,
//     buttonbackground: number,
//     dot: number,
//     line: number
// }
// let colors: scheme[] = [];

// let currentScheme: number;
