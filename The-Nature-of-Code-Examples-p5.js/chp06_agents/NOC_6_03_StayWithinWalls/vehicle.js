// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

function Vehicle(x,y) {
  this.acceleration = createVector(0,0);
  this.velocity = createVector(5,4);
  this.position = createVector(x,y);
  this.r = 6;
  this.maxspeed = 3;
    this.maxforce = 0.15;

    // Method to update location
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  this.boundaries = function() {

    var desired = null;

    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } 
    else if (this.position.x > width -d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    } 

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } 
    else if (this.position.y > height-d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    } 

    if (desired != null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }  
      
  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x,this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r*2);
    vertex(-this.r, this.r*2);
    vertex(this.r, this.r*2);
    endShape(CLOSE);
    pop();
  }
}



