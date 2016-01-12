

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function Mover() {
  this.position = createVector(width/2,height/2);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.topspeed = 5;  

  this.update = function() {
    // Compute a vector that points from position to mouse
    var mouse = createVector(mouseX,mouseY);
    this.acceleration = p5.Vector.sub(mouse,this.position);
    // Set magnitude of acceleration
    this.acceleration.setMag(0.2);

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);  
  }

  this.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 48, 48);
  }


}



