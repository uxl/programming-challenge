import { SinglyLinkedList } from "./SinglyLinkedList";


export class Algorithm {

  //define size of checkerboard
  private singlylist = new SinglyLinkedList();
  private _rows:number = 10;
  private _cols:number = 10;
  private _spacing:number = 50; //row vs col => row.width * rows; min:2px max: 50px;
  private linkedlist: SinglyLinkedList;
  private grid:Object = {};

  constructor(){

  }
  private findObject = function(posx:number,posy:number, arry:any){
      // var grid = [{x:1,y:1,joe:1},{x:3,y:4,joe:"w"},{x:6,y:1,joe:"z"}];
      var findSquare:Function = function(element) {
        return element.x == posx && element.y == posy;
      }

      arry.find(findSquare);
      arry.findIndex(findSquare);
  }


  // 5,5 -> right x + 1, left x -1, up y + 1, down y - 1

  private createLinkedList = function(grid, head){
    var nodes = [];
    //create all nodes so that we can nest them
    for (var i = 0; i < grid.length; i++) {
      let newnode = new this.linkedlist.node(grid[i]);
      nodes.push(newnode);
    }
    alert(nodes[head].data.direction);
    //now start with head and nest all nodes for our list
    var theList = [];
    //get direction of current node
    var next;
    switch(nodes[head].data.direction){
      case 0:
        next.x = nodes[head].data.x;
        next.y = nodes[head].data.y - 1;
        break;
      case 1:
        next.x = nodes[head].data.x + 1;
        next.y = nodes[head].data.y;
        break;
      case 2:
        next.x = nodes[head].data.x;
        next.y = nodes[head].data.y + 1;
        break;
      case 3:
        next.x = nodes[head].data.x - 1;
        next.y = nodes[head].data.y;
        break;
    }
    //
    // nodes[head].next = ;
    // var bnode =
    // while(next != null){
    //
    }




    // grid[head].x grid[head].y

  //   this.findObject()
  //   var h = new this.SinglyList.node()
  //     while(head != null){
  //       ll
  //     }
  //         // Node h = new Node(0,0);
  //         // Node k = h;
  //         // //find the arrow at (0,0)
  //         // if(arrow is left or up){
  //         //     k.next = null;
  //         // }
  //         // else{
  //         //
  //         //     while(k != null){
  //         //         if the arrow is right
  //         //             Node next = new Node(h.x , h.y+1)
  //         //             k.next = next;
  //         //             k = k.next;
  //         //         else if the arrow is down
  //         //             Node next = new Node(h.x+1, h.y);
  //         //             k.next = next;
  //         //             k = k.next;
  //         //         else if the arrow is left
  //         //             Node next = new Node(h.x, h.y-1);
  //         //             k.next = next;
  //         //             k = k.next;
  //         //         else if the arrow is up
  //         //             Node next = new Node(h.x - 1, h.y);
  //         //             k.next = next;
  //         //             k = k.next;
  //         //     }
  //         // }
  // }
  // private linkedList = SinglyList;
  private hasCycle = function(head){
      var fast = head;
      var slow = head;
      while(fast!= null && fast.next != null){
        fast = fast.next.next;
        slow = slow.next;
        //if fast and slow pointers are meeting then LinkedList is cyclic
        if(fast == slow ){
          return true;
        }
      }
      return false;
    }

  get rows():number {
      return this._rows;
  }
  set rows(newval:number) {
      this._rows = newval;
      this._rows = newval;
  }
  get cols():number {
      return this._cols;
  }
  set cols(newval:number) {
      this._cols = newval;
      this._rows = newval;
  }
  get spacing():number {
      return this._spacing;
  }
  set spacing(newval:number) {
      this._spacing = newval;
  }

  public reset = function(){
    //buildGrid
    var grid = this.buildGrid();
    //pick random starting position
    var randomStart = this.randomStart();
    //build linked list
    var head = grid[randomStart];

    return grid;

  }

  private buildGrid = function(){
    let amount = this._rows * this._cols;
    let grid: object[] = [];
    for (var i = 0; i < amount; i++) {
      let dir = Math.floor(Math.random()*4);
      var cell = {x:(i % this._cols), y: Math.floor(i / this._rows), direction:dir};
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
