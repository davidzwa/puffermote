import p5Types from "p5";
import Boid from "./Boid";

class Flock {
  p: p5Types;
  boids: Boid[];
  constructor(p5: p5Types) {
    this.p = p5;
    this.boids = [];
  }

  setup() {
    // Add an initial set of boids into the system
    for (let i = 0; i < 20; i++) {
      this.addBoid(50, this.p.height / 2);
    }
  }

  run() {
    this.boids.forEach((b) => b.run());
  }

  addBoid(x: number, y: number) {
    let b = new Boid(this.p, this.boids, {
      x,
      y,
    });
    this.boids.push(b);
  }
}

export default Flock;
