// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// The "Vehicle" class

function Vehicle(x,y,ms,mf) {
  this.position = createVector(x,y);
  this.acceleration = createVector(0,0);
  this.velocity = createVector(2,0);
  this.r = 4;
  this.maxspeed = ms || 4;
    this.maxforce = mf || 0.1;

  this.run = function() {
    this.update();
    this.display();
  }

  // This function implements Craig Reynolds' path following algorithm
  // http://www.red3d.com/cwr/steer/PathFollow.html
  this.follow = function(p) {


    // Predict location 50 (arbitrary choice) frames ahead
    // This could be based on speed 
    var predict = this.velocity.get();
    predict.normalize();
    predict.mult(50);
    var predictLoc = p5.Vector.add(this.position, predict);
   
    // Now we must find the normal to the path from the predicted location
    // We look at the normal for each line segment and pick out the closest one

    var normal = null;
    var target = null;
    var worldRecord = 1000000;  // Start with a very high record distance that can easily be beaten

    // Loop through all points of the path
    for (var i = 0; i < p.points.length-1; i++) {

      // Look at a line segment
      var a = p.points[i];
      var b = p.points[i+1];
      //println(b);

      // Get the normal point to that line
      var normalPoint = getNormalPoint(predictLoc, a, b);
      // This only works because we know our path goes from left to right
      // We could have a more sophisticated test to tell if the point is in the line segment or not
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        // This is something of a hacky solution, but if it's not within the line segment
        // consider the normal to just be the end of the line segment (point b)
        normalPoint = b.get();
      }

      // How far away are we from the path?
      var distance = p5.Vector.dist(predictLoc, normalPoint);
      // Did we beat the record and find the closest line segment?
      if (distance < worldRecord) {
        worldRecord = distance;
        // If so the target we want to steer towards is the normal
        normal = normalPoint;

        // Look at the direction of the line segment so we can seek a little bit ahead of the normal
        var dir = p5.Vector.sub(b, a);
        dir.normalize();
        // This is an oversimplification
        // Should be based on distance to path & velocity
        dir.mult(10);
        target = normalPoint.get();
        target.add(dir);
      }
    }

    // Only if the distance is greater than the path's radius do we bother to steer
    if (worldRecord > p.radius && target != null) {
      this.seek(target);
    }

    // Draw the debugging stuff
    if (debug) {
      // Draw predicted future location
      stroke(255);
      fill(200);
      line(this.position.x, this.position.y, predictLoc.x, predictLoc.y);
      ellipse(predictLoc.x, predictLoc.y, 4, 4);

      // Draw normal location
      stroke(255);
      fill(200);
      ellipse(normal.x, normal.y, 4, 4);
      // Draw actual target (red if steering towards it)
      line(predictLoc.x, predictLoc.y, normal.x, normal.y);
      if (worldRecord > p.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8, 8);
    }
  }


  this.applyForce = function(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates and applies a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.position);  // A vector pointing from the position to the target

    // If the magnitude of desired equals 0, skip out of here
    // (We could optimize this to check if x and y are 0 to avoid mag() square root
    if (desired.mag() == 0) return;

    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);  // Limit to maximum steering force

    this.applyForce(steer);
  }

    // Method to update position
  this.update = function() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  // Wraparound
  this.borders = function(p) {
    if (this.position.x > p.getEnd().x + this.r) {
      this.position.x = p.getStart().x - this.r;
      this.position.y = p.getStart().y + (this.position.y-p.getEnd().y);
    }
  }
      
  this.display = function() {
    // Draw a triangle rotated in the direction of velocity
    var theta = this.velocity.heading() + PI/2;
    fill(127);
    stroke(255);
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

  // A function to get the normal point from a point (p) to a line segment (a-b)
  // This function could be optimized to make fewer new Vector objects
  var getNormalPoint = function(p, a, b) {
    // Vector from a to p
    var ap = p5.Vector.sub(p, a);
    // Vector from a to b
    var ab = p5.Vector.sub(b, a);
    ab.normalize(); // Normalize the line
    // Project vector "diff" onto line by using the dot product
    ab.mult(ap.dot(ab));
    var normalPoint = p5.Vector.add(a, ab);
    return normalPoint;
  }
}



