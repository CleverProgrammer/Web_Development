// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Pathfinding w/ Genetic Algorithms

// Rocket class -- this is just like our Boid / Particle class
// the only difference is that it has DNA & fitness

//constructor
function Rocket(l, dna_) {
  // All of our physics stuff
  this.acceleration = createVector();
  this.velocity = createVector();
  this.location = l.get();
  // Size
  this.r = 4;
  // Fitness and DNA
  this.fitness = 0;
  this.dna = dna_;
  // To count which force we're on in the genes
  this.geneCounter = 0;

    this.hitTarget = false;   // Did I reach the target

  // Fitness function
  // fitness = one divided by distance squared
  this.calcFitness = function() {
    var d = dist(this.location.x, this.location.y, target.x, target.y);
    this.fitness = pow(1/d, 2);
  };

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  this.run = function() {
    this.checkTarget(); // Check to see if we've reached the target
    if (!this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
    }
    this.display();
  };

  // Did I make it to the target?
  this.checkTarget = function() {
    var d = dist(this.location.x, this.location.y, target.x, target.y);
    if (d < 12) {
      this.hitTarget = true;
    }
  };

  this.applyForce = function(f) {
    this.acceleration.add(f);
  };

  this.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  };

  this.display = function() {
    var theta = this.velocity.heading() + PI/2;
    var r = this.r;
    stroke(0);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);

    // Thrusters
    rectMode(CENTER);
    fill(0);
    rect(-r/2, r*2, r/2, r);
    rect(r/2, r*2, r/2, r);

    // Rocket body
    fill(255);
    beginShape(TRIANGLES);
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape(CLOSE);

    pop();
  };

  this.getFitness = function() {
    return this.fitness;
  };

  this.getDNA = function() {
    return this.dna;
  };
}
