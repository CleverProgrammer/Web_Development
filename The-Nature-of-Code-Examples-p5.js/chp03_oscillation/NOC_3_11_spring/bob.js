// Bob object, just like our regular Mover (location, velocity, acceleration, mass)

var Bob = function(x, y) {
  this.position = createVector(x,y);
  this.velocity = createVector();
  this.acceleration = createVector();
  this.mass = 24;
  // Arbitrary damping to simulate friction / drag
  this.damping = 0.98;
  // For user interaction
  this.dragOffset = createVector();
  this.dragging = false;

  // Standard Euler integration
  this.update = function() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  };

  // Newton's law: F = M * A
  this.applyForce = function(force) {
    var f = force.get();
    f.div(this.mass);
    this.acceleration.add(f);
  };

  // Draw the bob
  this.display = function() {
    stroke(255);
    strokeWeight(2);
    fill(127);
    if (this.dragging) {
      fill(200);
    }
    ellipse(this.position.x, this.position.y, this.mass*2, this.mass*2);
  };

  this.handleClick = function(mx, my) {
    var d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.mass) {
      this.dragging = true;
      this.dragOffset.x = this.position.x-mx;
      this.dragOffset.y = this.position.y-my;
    }
  };

  this.stopDragging = function() {
    this.dragging = false;
  };

  this.handleDrag = function(mx, my) {
    if (this.dragging) {
      this.position.x = mx + this.dragOffset.x;
      this.position.y = my + this.dragOffset.y;
    }
  };
};
