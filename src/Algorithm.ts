import { SinglyLinkedList } from "./SinglyLinkedList";


export class Algorithm {

    //define size of checkerboard
    private _rows: number = 10;
    private _cols: number = 10;
    private _spacing: number = 50; //row vs col => row.width * rows; min:2px max: 50px;
    private linkedlist: SinglyLinkedList = new SinglyLinkedList();
    private grid: Object = {};

    constructor() {

    }
    private findObject = function(posx: number, posy: number, arry: any) {
        var found = false;
        for (var i = 0; i < arry.length; i++) {
            // console.log(arry[i].data.x);
            if (arry[i].data.x == posx && arry[i].data.y == posy) {
              var found = true;
                return i;
            }
        }
        if(!found){
          return null; //TEST FILLED OFF BOARD
        }
    }


    private createLinkedList = function(grid, head, player) {
        var nodes = [];
        //create all nodes so that we can nest them
        for (var i = 0; i < grid.length; i++) {
            let newnode = new this.linkedlist.node(grid[i]);
            nodes.push(newnode);
        }
        // console.log("direction in node from algo: " + nodes[head].data.direction);
        //now start with head and nest all nodes for our list
        var theList = [];
        // get direction of current node

        //get head direction
        var direction = this.findDirection(nodes, head); //{x:n,y:n}

        var pointer = head;
        var i = 0;
        while(pointer != null){
          theList.push(nodes[pointer]); //pointer is head index then defined at end of loop
          var direction = this.findDirection(nodes, pointer); //{x:n,y:n}
          theList[i].next = this.nextNode(nodes, direction); //returns object
          //need to update pointer
          pointer = this.findObject(theList[i].next.data.x, theList[i].next.data.y, nodes);

          console.log("pointer", pointer);
          i++;
        }
        console.log(theList);
    }

    //takes array of nodes and vector returns next node
    private nextNode = function(arry:any, vector:any):any{
      var nextnode = this.findObject(vector.x, vector.y, arry); //returns an index
      //check for null then nest node
      if(nextnode === null){
        return null;
      }else{
        return arry[nextnode]; //nest node
      }
    }
private findDirection = function(arr:any, pointer:number){
  var next: any = {}; //temporary bucket for x:y next values
  switch (arr[pointer].data.direction) {
      case 0:
          //up
          next.x = arr[pointer].data.x;
          next.y = arr[pointer].data.y - 1;
          break;
      case 1:
          //right
          next.x = arr[pointer].data.x + 1;
          next.y = arr[pointer].data.y;
          break;
      case 2:
          //down
          next.x = arr[pointer].data.x;
          next.y = arr[pointer].data.y + 1;
          break;
      case 3:
          //left
          next.x = arr[pointer].data.x - 1;
          next.y = arr[pointer].data.y;
          break;
  }
  return next;
}



    private hasCycle = function(head) {
        var fast = head;
        var slow = head;
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
            //if fast and slow pointers are meeting then LinkedList is cyclic
            if (fast == slow) {
                return true;
            }
        }
        return false;
    }

    get rows(): number {
        return this._rows;
    }
    set rows(newval: number) {
        this._rows = newval;
        this._rows = newval;
    }
    get cols(): number {
        return this._cols;
    }
    set cols(newval: number) {
        this._cols = newval;
        this._rows = newval;
    }
    get spacing(): number {
        return this._spacing;
    }
    set spacing(newval: number) {
        this._spacing = newval;
    }

    public reset = function() {
        //buildGrid
        var grid = this.buildGrid();
        //pick random starting position
        var randomStart = this.randomStart();
        //build linked list
        var head = grid[randomStart];

        return grid;

    }

    private buildGrid = function() {
        let amount = this._rows * this._cols;
        let grid: object[] = [];
        for (var i = 0; i < amount; i++) {
            let dir = Math.floor(Math.random() * 4);
            var cell = { x: (i % this._cols), y: Math.floor(i / this._rows), direction: dir };
            grid.push(cell);
        }
        return grid;
    }
    public randomStart = function() {
        let amount = this._rows * this._cols;
        return Math.floor(Math.random() * amount);
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

    //returns object
    private getNext = function(current:any){ //pointer, ""
    console.log('me: ' + current.direction);
    var result = {};
        if (current.direction == 1){ //right
            result = {x:current.x+1 , y:current.y};
          }else if(current.direction == 2){ //down
            result = {x:current.x , y:current.y + 1};
        }else if (current.direction == 3){ //left
            result = {x:current.x - 1 , y:current.y};
        }else if (current.direction == 0){ //up
            result = { x:current.x , y:current.y-1};
          }
          return result;
    }
    private checkLoop = function(grid, pointer){
      console.log('pointer',pointer);
      console.log('grid',grid);

      var fast = grid[pointer]; //{x:0, y:0, direction:0-4}
      var slow = grid[pointer]; //head index //1 - 100
      console.log("initial: " + fast.x + " | " + fast.y + " | " + slow.x + " | " + slow.y);


      var counter = 0;
      do{
          counter++;
          var index;
          slow = this.getNext(slow, slow.direction);
          index = this.findObj(slow.x,slow.y, grid);
          if(index != -1){
            slow.direction = grid[index].direction;
          }

          fast = this.getNext(fast, fast.direction);
          index = this.findObj(fast.x,fast.y, grid);
          if(index != -1){
            fast.direction = grid[index].direction;
          }

          fast = this.getNext(fast, fast.direction);
          index = this.findObj(fast.x,fast.y, grid);
          if(index != -1){
            fast.direction = grid[index].direction;
          }
          console.log(fast.x + " | " + fast.y+ " | " + slow.x + " | " + slow.y);

          if(fast.x < 0 || fast.y < 0 || fast.x > grid.length || fast.y > grid.y){
              console.log("off the grid");
              break;
          }else if(fast.x == slow.x && fast.y == slow.y){

              console.log("cycle in the path");
              break;
          }

      }while(counter < this._rows * this._cols);
    }



    private findObj = function(posx: number, posy: number, arry: any) {
        var found = false;
        for (var i = 0; i < arry.length; i++) {
            // console.log(arry[i].data.x);
            if (arry[i].x == posx && arry[i].y == posy) {
              var found = true;
                return i;
            }
        }
        if(!found){
          return -1; //TEST FILLED OFF BOARD
        }
    }
  }
