import { SinglyLinkedList } from "./SinglyLinkedList";


export class Algorithm {

  //define size of checkerboard
  private singlylist = new SinglyLinkedList();
  private _rows:number = 10;
  private _cols:number = 10;
  private _spacing:number = 50; //row vs col => row.width * rows; min:2px max: 50px;

  private grid:Object = {};

  constructor(){

  }

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

//get and setter for rows cols and spacer info
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
  //

  public reset = function(){
    //buildGrid
    var grid = this.buildGrid();
    //pick random starting position
    var randomStart = this.randomStart();
    //build linked list
    var head = grid[randomStart];

    return grid;

  }
  //return array of objects [{x:n, y:n, direction:0-3}]
  private buildGrid = function(){
    let amount = this._rows * this._cols;
    let direction = Math.floor(Math.random()*4);
    let grid: object[] = [];
    for (var i = 0; i < amount; i++) {
      var cell = {x:(i % this._cols), y: Math.floor(i / this._rows), direction:direction};
      grid.push(cell);
    }
    return grid;
  }

  //returns random index to start player at
  public randomStart = function(){
    let amount = this._rows * this._cols;
    return Math.floor(Math.random()*amount);
  }
}
