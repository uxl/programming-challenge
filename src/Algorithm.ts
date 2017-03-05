export class Algorithm {

    //define size of checkerboard
    private _rows: number = 10;
    private _cols: number = 10;
    private _spacing: number = 50; //row vs col => row.width * rows; min:2px max: 50px;
    private grid: Object = {};

    constructor() {
    }


    //get and set for rows and columns
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

    //returns grid object with {x:n, y:n, visited:boolean}
    public reset = function() {
        //buildGrid
        var grid = this.buildGrid();
        return grid;
    }
    //generate grid object
    private buildGrid = function() {
        let amount = this._rows * this._cols;
        let grid: object[] = [];
        for (var i = 0; i < amount; i++) {
            let dir = Math.floor(Math.random() * 4);
            var cell = { x: (i % this._cols), y: Math.floor(i / this._rows), direction: dir, visited: false };
            grid.push(cell);
        }
        return grid;
    }
    
    //pick random start position - returns index
    public randomStart = function() {
        let amount = this._rows * this._cols;
        return Math.floor(Math.random() * amount);
    }
    //returns next grid position based on x and y. Returns {x:n,y:n}
    public getNext = function(current: any):any { //{x:,y:,direction}
        var result:any = {}
        if (current.direction == 1) { //right
            result = { x: current.x + 1, y: current.y };
        } else if (current.direction == 2) { //down
            result = { x: current.x, y: current.y + 1 };
        } else if (current.direction == 3) { //left
            result = { x: current.x - 1, y: current.y };
        } else if (current.direction == 0) { //up
            result = { x: current.x, y: current.y - 1};
        }
        // console.log(result);
        return result; //{x:n,y:n}
    }
    //Find loops O(1) constant space
    //source http://techieme.in/finding-loop-in-linked-list/
    private checkLoop = function(grid, pointer):any{
        var fast = grid[pointer]; //{x:0, y:0, direction:0-4}
        var slow = grid[pointer]; //head index //1 - 100

        var counter = 0;
        do {
            counter++;
            var index;
            slow = this.getNext(slow, slow.direction);
            index = this.findGridIndex(slow.x, slow.y, grid);
            if (index != -1) {
                slow.direction = grid[index].direction;
            }

            fast = this.getNext(fast, fast.direction);
            index = this.findGridIndex(fast.x, fast.y, grid);
            if (index != -1) {
                fast.direction = grid[index].direction;
            }

            fast = this.getNext(fast, fast.direction);
            index = this.findGridIndex(fast.x, fast.y, grid);
            if (index != -1) {
                fast.direction = grid[index].direction;
            }
            if (fast.x === undefined || fast.y === undefined || fast.x < 0 || fast.y < 0 || fast.x > this._cols || fast.y > this._rows) {
              return {message:"off grid detected ", steps:counter};
            } else if (fast.x == slow.x && fast.y == slow.y) {
              return {message:"loop detected ", steps:counter};
            }
        } while (counter < this._rows * this._cols);
    }

    //find object in gridarray
    private findGridIndex = function(posx: number, posy: number, arry: any) {
        var found = false;
        for (var i = 0; i < arry.length; i++) {
            if (arry[i].x == posx && arry[i].y == posy) {
                var found = true;
                return i;
            }
        }
        if (!found) {
            return -1;
        }
    }
}
