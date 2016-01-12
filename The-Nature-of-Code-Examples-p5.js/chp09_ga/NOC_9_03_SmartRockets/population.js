// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// A class to describe a population of "creatures"

 // Initialize the population
 function Population(m, num) {
  this.mutationRate = m;              // Mutation rate
  this.population = [];               // Array to hold the current population
  this.matingPool = [];               // ArrayList which we will use for our "mating pool"
  this.generations = 0;               // Number of generations
  //make a new set of creatures
  for (var i = 0; i < num; i++) {
    var location = createVector(width/2,height+20);
    this.population[i] = new Rocket(location, new DNA());
  }

  this.live = function(os) {
    // Run every rocket
    // For every creature
    for (var i = 0; i < this.population.length; i++) {
      // If it finishes, mark it down as done!
      this.population[i].checkTarget();
      this.population[i].run(os);
    }
  };

  // Calculate fitness for each creature
  this.fitness = function() {
    for (var i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness();
    }
  };

  // Did anything finish?
  this.targetReached = function() {
    for (var i = 0; i < population.length; i++) {
      if (population[i].hitTarget) return true;
    }
    return false;
  }

  // Generate a mating pool
  this.selection = function() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    var maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.population.length; i++) {
      var fitnessNormal = map(this.population[i].getFitness(),0,maxFitness,0,1);
      var n = floor(fitnessNormal * 100);  // Arbitrary multiplier
      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  };

  // Making the next generation
  this.reproduction = function() {
    // Refill the population with children from the mating pool
    for (var i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      var m = floor(random(this.matingPool.length));
      var d = floor(random(this.matingPool.length));
      // Pick two parents
      var mom = this.matingPool[m];
      var dad = this.matingPool[d];
      // Get their genes
      var momgenes = mom.getDNA();
      var dadgenes = dad.getDNA();
      // Mate their genes
      var child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      var location = createVector(width/2,height+20);
      this.population[i] = new Rocket(location, child);
    }
    this.generations++;
  };

  this.getGenerations = function() {
    return this.generations;
  };

  // Find highest fintess for the population
  this.getMaxFitness = function() {
    var record = 0;
    for (var i = 0; i < this.population.length; i++) {
      if(this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
      }
    }
    return record;
  };
}