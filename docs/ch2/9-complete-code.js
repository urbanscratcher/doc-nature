let mover;
let attractor;
const G = 1.0;

function setup() {
  createCanvas(500, 300);
  mover = new Mover(300, 50, 120);
  attractor = new Attractor();
}

function draw() {
  background(255);

  // gravity
  const gravity = new createVector(0, 1);
  mover.applyForce(gravity);

  // Attractor
  const attractForce = attractor.attract(mover);
  mover.applyForce(attractForce);

  // wind
  if (mouseIsPressed) {
    const wind = new createVector(0.5, 0);
    mover.applyForce(wind);
  }

  // friction
  if (mover.contactEdges()) {
    const c = 0.1;
    const friction = mover.velocity.copy();
    friction.mult(-1);
    friction.setMag(c);

    mover.applyForce(friction);
  }

  // inelastic collision
  mover.bounceEdges();
  mover.update();
  mover.display();
  attractor.display();
}

class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.mass = 100;
  }

  attract(mover) {
    const force = p5.Vector.sub(this.position, mover.position);
    let d = force.mag();
    d = constrain(d, 5, 25);
    force.normalize();
    const strength = (G * this.mass * mover.mass) / (d * d);
    force.setMag(strength);

    return force;
  }

  display() {
    stroke(0);
    fill(175, 200);
    circle(this.position.x, this.position.y, sqrt(this.mass) * 2);
  }
}

class Mover {
  constructor(x, y, m) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = m;
    this.radius = sqrt(this.mass) * 2;
  }

  applyForce(force) {
    const f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // initiate acceleration
    this.acceleration.mult(0);
  }

  display() {
    circle(this.position.x, this.position.y, this.radius);
  }

  contactEdges() {
    return this.position.y > height - this.radius - 1;
  }

  bounceEdges() {
    let bounce = -0.9;
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= bounce;
    }

    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= bounce;
    }

    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }
  }
}
