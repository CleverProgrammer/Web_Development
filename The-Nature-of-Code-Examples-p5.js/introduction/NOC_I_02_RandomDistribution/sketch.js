
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// An array to keep track of how often random numbers are picked

var randomCounts = [];
var total = 20;

function setup() {
  createCanvas(640,360);
  for (var i = 0; i < total; i++) {
    randomCounts[i] = 0;
  }
};

function draw() {
  background(127);
  var index = floor(random(total));
  randomCounts[index]++;

  // Draw a rectangle to graph results
  stroke(0);
  strokeWeight(2);
  fill(255);
  
  var w = width/randomCounts.length;
  
  for (var x = 0; x < randomCounts.length; x++) {
    rect(x*w,height-randomCounts[x],w-1,randomCounts[x]);
  } 
};
