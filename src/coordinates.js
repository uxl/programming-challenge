//add coordinate object to array of coordinate objects if it doesn't already exist

var coordinate = function(x, y){
  this.x = x;
  this.y = y;
}

var arr = new Array();
arr.push(new coordinate(10, 0));
arr.push(new coordinate(0, 11));

function checkAndAdd(x,y) {
  var test = new coordinate(x,y);

  var found = arr.some(function (el) {
      return JSON.stringify(el) === JSON.stringify(test);
  });
  if (!found) {
    console.log("not found");
    arr.push(test);
  }else{
    console.log("found");
  }
}

//tests
checkAndAdd(0,11);
console.log(arr);

checkAndAdd(200,11);
console.log(arr);

checkAndAdd(500,500);
console.log(arr);

checkAndAdd(500,500);
console.log(arr);
