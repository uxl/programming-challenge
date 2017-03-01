export class Algorithm {

  //define size of checkerboard
  private _rows:number = 10; //<ui defined>;
  private _cols:number = 10; //<ui defined>;
  private _spacing:number = 10; //row vs col => row.width * rows; min:2px max: 50px;

  constructor(){

  }
  get rows():number {
      return this._rows;
  }
  set rows(newval:number) {
      this._rows = newval;
  }
  get cols():number {
      return this._cols;
  }
  set cols(newval:number) {
      this._cols = newval;
  }

  private Node = function(data, next) {
    this.data = data;
    this.next = next;
  }
  private SinglyList = function() {
    this._length = 0;
    this.head = null;
  }

  //A Singly-Linked List
  //In computer science, a singly-linked list is a data structure
  //that holds a sequence of linked nodes. Each node, in turn, contains data and a pointer, which can point to another node.
  private SinglyLinkedList = function(){

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
