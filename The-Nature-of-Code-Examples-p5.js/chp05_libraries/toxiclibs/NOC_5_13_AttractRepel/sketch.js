// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Reference to physics world
var physics;

var particles = [];
var attractor;

function setup() {
  createCanvas(640,360);

  // Initialize the physics
  physics=new VerletPhysics2D();
  physics.setDrag (0.01);

  for (var i = 0; i < 50; i++) {
    particles.push(new Particle(new Vec2D(random(width),random(height)),4,16,-1));
  }
  attractor = new Particle(new Vec2D(width/2,height/2),24,width,0.1);


}

function draw() {

  // Update the physics world
  physics.update();

  background(51);

  attractor.display();
  for (var i = 0; i < particles.length; i++) {
    particles[i].display();
  }
  // Move the second one according to the mouse
  if (isMousePressed()) {
    attractor.lock();
    attractor.set(mouseX,mouseY);
  } else {
    attractor.unlock();
  }
}





