import { SinglyLinkedList } from "./SinglyLinkedList";


export class Algorithm {

  //define size of checkerboard
  private singlylist = new SinglyLinkedList();
  private _rows:number = 10;
  private _cols:number = 10;
  private _spacing:number = 10; //row vs col => row.width * rows; min:2px max: 50px;

  private grid:Object = {};

  constructor(){

  }

  get rows():number {
      return this._rows;
  }
  set rows(newval:number) {
      this._rows = newval;
      console.log("row updated: " + this._rows);
  }
  get cols():number {
      return this._cols;
  }
  set cols(newval:number) {
      this._cols = newval;
      console.log("cols updated: " + this._cols);
  }

  public reset = function(){
    //createGrid
    var grid = this.createGrid();
    //pick random starting position
    var randomStart = this.randomStart();
    //build linked list
    var head = grid[randomStart];

    return grid;

  }


  private createGrid = function(){
    let amount = this._rows * this._cols;
    let direction = Math.floor(Math.random()*4);
    let grid: object[] = [];
    for (var i = 0; i < amount; i++) {
      var cell = {x:(i % this._cols), y: Math.floor(i / this._rows), direction:direction};
      grid.push(cell);
    }
    return grid;
  }
  public randomStart = function(){
    let amount = this._rows * this._cols;
    return Math.floor(Math.random()*amount);
  }
  // private ranVector = function(-1, 1) {
  //   let x = Math.floor(Math.random() * (max - min + 1)) + min;
  //   let y = Math.floor(Math.random() * (max - min + 1)) + min;
  //   return {x,y}; (0,1)
  // }
  private Node = function(data, next) {
    this.data = data;
    this.next = next;
  }
  private SinglyList = function() {
    this._length = 0;
    this.head = null;
  }





//move to gui
// //draw squares
// private drawSquares = function(stage, loader){
// let totalSquares:number = cols*rows;
//   for (let i = 0; i < totalSquares; i++) {
//     //create instance of square
//     //calculate x, y
//     let x = (i % cols) * spacing;
//     let y = Math.floor(i / rows) * spacing;
//     //<squarescontainer => squareclass new instance and position(x:number, y:number)>
//   }
// }

//randomize direction on squares
// //start checker at random insertion square
// let startx = Math.random()*rows;
// let starty = Math.random()*cols;
//<squarescontainer => playerclass - position player>

//move 1 turn
//getDirection from current square
//animate to new square

//check bounds (condition1)
// if(x < 0 && x > cols && y < 0 && y > rows){
//   console.log("you are outside bounds");
// }

//check cycle (condition2)

//history array
// let history = new Array();
//
// //coordinate object (interface?)
// let coordinate = function(x, y){
//   this.x = x;
//   this.y = y;
// }

//check for repeat
// function checkAndAdd(x,y) {
//   var test = new coordinate(x,y);
//
//   var found = history.some(function (el) {
//       return JSON.stringify(el) === JSON.stringify(test);
//   });
//   if (!found) {
//     console.log("not found");
//     history.push(test);
//   }else{
//     console.log("found");
//     // condition 2 met end //
//     <squarescontainer = playerclass destroy>
//     <squarescontainer = square turn red>
//   }
// }

//square class
//possible directions

// private options:strings;
// constructor = {
//   options = ['up','right','down','left'];
// }
//
// let setRandomDirection = function(){
//   //set random 4 values
//   Math.random()*options.length;
// }
// let changeDisplay = function(option:number){
//   switch(option){
//     case 0:
//       //swap texture
//     break;
//     case 1:
//       //swap texture
//     break;
//     case 2:
//       //swap texture
//     break;
//     case 3:
//       //swap texture
//     break;
//     default:
//       console.log("no valid case");
//     break;
//   }
// }
}
