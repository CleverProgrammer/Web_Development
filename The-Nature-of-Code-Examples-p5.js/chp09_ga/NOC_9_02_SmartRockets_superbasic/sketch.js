// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smart Rockets w/ Genetic Algorithms

// Each Rocket's DNA is an array of p5.Vectors
// Each p5.Vector acts as a force for each frame of animation
// Imagine an booster on the end of the rocket that can point in any direction
// and fire at any strength every frame

// The Rocket's fitness is a function of how close it gets to the target as well as how fast it gets there

// This example is inspired by Jer Thorp's Smart Rockets
// http://www.blprnt.com/smartrockets/

var lifetime;  // How long should each generation live

var population;  // Population

var lifeCounter;   // Timer for cycle of generation

var target;        // Target location

var info;

function setup() {
  createCanvas(640, 360);
  // The number of cycles we will allow a generation to live
  lifetime = height;

  // Initialize variables
  lifeCounter = 0;
  
  target = createVector(width/2, 24);

  // Create a population with a mutation rate, and population max
  var mutationRate = 0.01;
  population = new Population(mutationRate, 50);

  info = createP("");
  info.position(10,380);

}

function draw() {
  background(101);

  // Draw the start and target locations
  fill(0);
  stroke(0);
  ellipse(target.x,target.y,24,24);


  // If the generation hasn't ended yet
  if (lifeCounter < lifetime) {
    population.live();
    lifeCounter++;
    // Otherwise a new generation
  }
  else {
    lifeCounter = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

  // Display some info
  fill(0);

  info.html("Generation #: " + population.getGenerations() + "<br>" + "Cycles left: " + (lifetime-lifeCounter));
}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
  target.x = mouseX;
  target.y = mouseY;
}
