// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flow Field Following
// Via Reynolds: http://www.red3d.com/cwr/steer/FlowFollow.html

// Using this variable to decide whether to draw all the stuff
var debug = true;

// Flowfield object
var flowfield;
// An ArrayList of vehicles
var vehicles = [];

function setup() {

  var text = createP("Hit space bar to toggle debugging lines.<br>Click the mouse to generate a new flow field (<a href=\"https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/issues/12\">not working yet</a>).");
  text.position(10,365);

  createCanvas(640, 360);
  // Make a new flow field with "resolution" of 16
  flowfield = new FlowField(20);
  // Make a whole bunch of vehicles with random maxspeed and maxforce values
  for (var i = 0; i < 120; i++) {
    vehicles.push(new Vehicle(random(width), random(height), random(2, 5), random(0.1, 0.5)));
  }
}

function draw() {
  background(51);
  // Display the flowfield in "debug" mode
  if (debug) flowfield.display();
  // Tell all the vehicles to follow the flow field
  for (var i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }

}


function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

// Make a new flowfield
function mousePressed() {
  flowfield.init();
}


