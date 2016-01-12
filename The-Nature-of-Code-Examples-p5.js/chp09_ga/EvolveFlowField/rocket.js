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
  this.pos = l.get();
  this.r = 2;
  this.dna = dna_;
  this.stopped = false;   // Am I stuck?
  this.dead = false; // Did I hit an obstacle?
  // What was my finish? (first, second, etc. . . )
  this.finish = 100000;  // Some high number to begin with

  this.recordDist = width;
  this.fitness = 0;
  // Could make this part of DNA??)
  this.maxspeed = 6.0;
  this.maxforce = 1.0;


  // FITNESS FUNCTION 
  // distance = distance from target
  // finish = what order did i finish (first, second, etc. . .)
  // f(distance,finish) =   (1.0f / finish^1.5) * (1.0f / distance^6);
  // a lower finish is rewarded (exponentially) and/or shorter distance to target (exponetially)
  this.calcFitness = function() {
    var d = this.recordDist;
    if (d < diam/2) {
      d = 1.0;
    }
    // Reward finishing faster and getting closer
    this.fitness = (1 / pow(this.finish,1.5)) * (1 / (pow(d,6)));
    
    //if (dead) fitness = 0;
  }

  this.setFinish = function(f) {
    this.finish = f;
  }

  // Run in relation to all the obstacles
  // If I'm stuck, don't bother updating or checking for intersection
  this.run = function(obs) {
    if (!this.stopped) {
      this.update();
      // If I hit an edge or an obstacle
      if ((this.borders()) || (this.checkObstacles(obs))) {
        this.stopped = true;
        this.dead = true;
      }
    }
    // Draw me!
    this.display();
  }

   // Did I hit an edge?
  this.borders = function() {
    if ((this.pos.x < 0) || (this.pos.y < 0) || (this.pos.x > width) || (this.pos.y > height)) {
      return true;
    } else {
      return false;
    }
  }

  // Did I make it to the target?
  this.finished = function() {
    var d = p5.Vector.dist(this.pos, target.position);
    if (d < this.recordDist) {
      this.recordDist = d;
    }
    if (target.contains(this.pos)) {
      this.stopped = true;
      return true;
    }
    return false;
  }

  // Did I hit an obstacle?
  this.checkObstacles = function(obs) {
    for (var i = 0; i < obs.length; i++) {
      if (obs[i].contains(this.pos)) {
        return true;
      }
    }
    return false;
  }

  this.update = function() {
    if (!this.finished()) {
      // Where are we?  Our pos will tell us what steering vector to look up in our DNA;
      var x = floor(this.pos.x/gridscale);
      var y = floor(this.pos.y/gridscale);
      x = constrain(x,0,width/gridscale-1);  // Make sure we are not off the edge
      y = constrain(y,0,height/gridscale-1); // Make sure we are not off the edge

      // Get the steering vector out of our genes in the right spot
      // A little Reynolds steering here
      var desired = this.dna.genes[x+y*(width/gridscale)].get();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired,this.velocity);
      this.acceleration.add(steer);
      this.acceleration.limit(this.maxforce);
      
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.pos.add(this.velocity);
      this.acceleration.mult(0);
    }
  }

  this.display = function() {
    //fill(0,150);
    //stroke(0);
    //ellipse(pos.x,pos.y,r,r);
    //var theta = this.velocity.heading() + PI/2;
    fill(200,100);
    if (!this.velocity.x) fill(255,0,0);
    stroke(0);
    strokeWeight(0.5);

    ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
    // push();
    // translate(this.pos.x,this.pos.y);
    // rotate(theta);
    // beginShape(TRIANGLES);
    // vertex(0, -this.r*2);
    // vertex(-this.r, this.r*2);
    // vertex(this.r, this.r*2);
    // endShape(CLOSE);
    // pop();
  }
  
  this.highlight = function() {
    stroke(0);
    line(this.pos.x,this.pos.y,target.position.x,target.position.y);
    fill(255,0,0,100);
    ellipse(this.pos.x,this.pos.y,16,16);
  }

  this.getFitness = function() {
    return this.fitness;
  }

  this.getDNA = function() {
    return this.dna;
  }

  this.isStopped = function() {
    return stopped;
  }
}
