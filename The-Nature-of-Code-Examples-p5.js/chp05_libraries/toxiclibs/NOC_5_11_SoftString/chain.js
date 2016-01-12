// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// A soft pendulum (series of connected springs)

function Chain(l,n,r,s) {
  // This list is redundant since we can ask for physics.particles, but in case we have many of these
  // it's a convenient to keep track of our own list	
  this.particles = [];

  // Chain properties
  this.totalLength = l;  // How long
  this.numPoints = n;    // How many points
  this.radius = r;       // Strength of springs
  this.strength = s;     // Radius of ball at tail

  var len = this.totalLength / this.numPoints;

  // Here is the real work, go through and add particles to the chain itself
  for(var i=0; i < this.numPoints; i++) {
    // Make a new particle with an initial starting location
    var particle=new Particle(width/2,i*len);

    // Redundancy, we put the particles both in physics and in our own ArrayList
    physics.addParticle(particle);
    this.particles.push(particle);

    // Connect the particles with a Spring (except for the head)
    if (i != 0) {
      var previous = this.particles[i-1];
      var spring = new VerletSpring2D(particle,previous,len,this.strength);
      // Add the spring to the physics world
      physics.addSpring(spring);
    }
  }

  // Keep the top fixed
  var head=this.particles[0];
  head.lock();

  // Let's keep an extra reference to the tail particle
  // This is just the last particle in the ArrayList
  this.tail = this.particles[this.numPoints-1];
  this.tail.radius = this.radius;

  // Some variables for mouse dragging
  this.offset = createVector();
    this.dragged = false;  

  // Check if a point is within the ball at the end of the chain
  // If so, set dragged = true;
  this.contains = function(x, y) {
    var d = dist(x,y,this.tail.x,this.tail.y);
    if (d < this.radius) {
      this.offset.x = this.tail.x - x;
      this.offset.y = this.tail.y - y;
      this.tail.lock();
      this.dragged = true;
    }
  }

  // Release the ball
  this.release = function() {
    this.tail.unlock();
    this.dragged = false;
  }

  // Update tail location if being dragged
  this.updateTail = function(x, y) {
    if (this.dragged) {
      this.tail.set(x+this.offset.x,y+this.offset.y);
    }
  }

  // Draw the chain
  this.display = function() {
    // Draw line connecting all points
    beginShape();
    stroke(200);
    strokeWeight(2);
    noFill();
    for (var i = 0; i < this.particles.length; i++) {
      vertex(this.particles[i].x,this.particles[i].y);
    }
    endShape();
    this.tail.display();
  }
}
