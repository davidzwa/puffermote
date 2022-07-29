import React from "react";
import p5Types, { Vector } from "p5";

class Boid {
  p: p5Types;
  acceleration: Vector;
  velocity: Vector;
  position: Vector;
  r: number;
  maxSpeed: number;
  maxForce: number;

  flockBoids: Boid[];

  constructor(
    p: p5Types,
    flockBoids: Boid[],
    { x, y }: { x: number; y: number }
  ) {
    this.p = p;
    this.acceleration = p.createVector(0, 0);
    this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
    this.position = p.createVector(x, y);
    this.r = 3.0;
    this.maxSpeed = 3; // Maximum speed
    this.maxForce = 0.05; // Maximum steering force

    // Circular ref to whole flock
    this.flockBoids = flockBoids;
  }

  run() {
    this.flock();
    this.update();
    this.borders();
    this.render();
  }

  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  render() {
    const p = this.p;

    // Draw a triangle rotated in the direction of velocity
    let theta = this.velocity.heading() + p.radians(90);
    p.fill(50);
    p.stroke(100);
    p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate(theta);
    p.beginShape();
    p.vertex(0, -this.r * 0.5);
    p.vertex(-this.r, this.r * 0.5);
    p.vertex(this.r, this.r * 0.5);
    p.endShape(p.CLOSE);
    p.pop();
  }

  flock() {
    const boids = this.flockBoids;

    let sep = this.separate(); // Separation
    let ali = this.align(); // Alignment
    let coh = this.cohesion(); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(1.5);
    ali.mult(1.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  applyForce(force: Vector) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  seek(target: Vector) {
    let desired = Vector.sub(target, this.position); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxSpeed);
    // Steering = Desired minus Velocity
    let steer = Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce); // Limit to maximum steering force
    return steer;
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = this.p.width + this.r;
    if (this.position.y < -this.r) this.position.y = this.p.height + this.r;
    if (this.position.x > this.p.width + this.r) this.position.x = -this.r;
    if (this.position.y > this.p.height + this.r) this.position.y = -this.r;
  }

  separate() {
    const boids = this.flockBoids;

    let desiredseparation = 25.0;
    let steer = this.p.createVector(0, 0);
    let count = 0;
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      let d = Vector.dist(this.position, boids[i].position);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if (d > 0 && d < desiredseparation) {
        // Calculate vector pointing away from neighbor
        let diff = Vector.sub(this.position, boids[i].position);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align() {
    const boids = this.flockBoids;

    let neighbordist = 50;
    let sum = this.p.createVector(0, 0);
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      let steer = Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return this.p.createVector(0, 0);
    }
  }

  cohesion() {
    const boids = this.flockBoids;

    let neighbordist = 50;
    let sum = this.p.createVector(0, 0); // Start with empty vector to accumulate all locations
    let count = 0;
    for (let i = 0; i < boids.length; i++) {
      let d = Vector.dist(this.position, boids[i].position);
      if (d > 0 && d < neighbordist) {
        sum.add(boids[i].position); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return this.p.createVector(0, 0);
    }
  }
}

export default Boid;
