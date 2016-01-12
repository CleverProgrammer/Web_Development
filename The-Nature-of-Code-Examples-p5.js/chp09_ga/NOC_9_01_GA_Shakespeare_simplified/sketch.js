// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population 
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection 
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function, 
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it 
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//  
//   # Rinse and repeat


var mutationRate = 0.01;    // Mutation rate
var totalPopulation = 150;      // Total Population

var population;             // Array to hold the current population
var matingPool;    // ArrayList which we will use for our "mating pool"
var target;                // Target phrase

var display = "";

function setup() {
  display = createP("STARTING");
  display.class("results");
  display.position(10,10);

  //createCanvas(800, 200);
  target = 'to be or not to be';

  population = [];

  for (var i = 0; i < totalPopulation; i++) {
    population[i] = new DNA(target.length);
  }
}

function draw() {
  for (var i = 0; i < population.length; i++) {
    population[i].calcFitness(target);
  }

  var matingPool = [];  // ArrayList which we will use for our "mating pool"

  for (var i = 0; i < population.length; i++) {
    var nnnn = floor(population[i].fitness * 100);  // Arbitrary multiplier, we can also use monte carlo method
    for (var j = 0; j <nnnn; j++) {              // and pick two random numbers
      matingPool.push(population[i]);
    }
  }

  for (var i = 0; i < population.length; i++) {
    var a = floor(random(matingPool.length));
    var b = floor(random(matingPool.length));
    var partnerA = matingPool[a];
    var partnerB = matingPool[b];
    var child = partnerA.crossover(partnerB);
    child.mutate(mutationRate);
    population[i] = child;
  }
  
  var everything = "";
  for (var i = 0; i < population.length; i++) {
    if (i % 4 == 0) everything += "<br>";
    everything += population[i].getPhrase() + "    ";
  }
  textFont("Courier");
  display.html(everything);
  //noLoop();
}
