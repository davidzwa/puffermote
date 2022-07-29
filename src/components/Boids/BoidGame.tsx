// function sketch(p) {
//   let flock: Flock;
//
//   p.setup = () => {
//     p.createCanvas(568, 320);
//     flock = new Flock();
//     // Add an initial set of boids into the system
//     for (let i = 0; i < 20; i++) {
//       let b = new Boid(p.width / 2, p.height / 2);
//       flock.addBoid(b);
//     }
//   };
//
//   p.draw = () => {
//     p.background(51);
//     flock.run();
//   };
//
//   // Add a new boid into the System
//   p.mouseDragged = () => {
//     flock.addBoid(new Boid(p.mouseX, p.mouseY));
//   };
//
//   // The Nature of Code
//   // Daniel Shiffman
//   // http://natureofcode.com
//
//   // Flock object
//   // Does very little, simply manages the array of all the boids
//
//   function Flock() {
//     // An array for all the boids
//     this.boids = []; // Initialize the array
//   }
//
//   Flock.prototype.run = function () {
//     for (let i = 0; i < this.boids.length; i++) {
//       this.boids[i].run(this.boids); // Passing the entire list of boids to each boid individually
//     }
//   };
//
//   Flock.prototype.addBoid = function (b) {
//     this.boids.push(b);
//   };
//
//   // The Nature of Code
//   // Daniel Shiffman
//   // http://natureofcode.com
//
//   // Boid class
//   // Methods for Separation, Cohesion, Alignment added
//
//   function Boid(x, y) {
//     this.acceleration = p.createVector(0, 0);
//     this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 1));
//     this.position = p.createVector(x, y);
//     this.r = 3.0;
//     this.maxspeed = 3; // Maximum speed
//     this.maxforce = 0.05; // Maximum steering force
//   }
//
//   Boid.prototype.run = function (boids) {
//     this.flock(boids);
//     this.update();
//     this.borders();
//     this.render();
//   };
//
//   Boid.prototype.applyForce = function (force) {
//     // We could add mass here if we want A = F / M
//     this.acceleration.add(force);
//   };
//
//   // We accumulate a new acceleration each time based on three rules
//   Boid.prototype.flock = function (boids) {
//     let sep = this.separate(boids); // Separation
//     let ali = this.align(boids); // Alignment
//     let coh = this.cohesion(boids); // Cohesion
//     // Arbitrarily weight these forces
//     sep.mult(1.5);
//     ali.mult(1.0);
//     coh.mult(1.0);
//     // Add the force vectors to acceleration
//     this.applyForce(sep);
//     this.applyForce(ali);
//     this.applyForce(coh);
//   };
//
//   // Method to update location
//   Boid.prototype.update = function () {
//     // Update velocity
//     this.velocity.add(this.acceleration);
//     // Limit speed
//     this.velocity.limit(this.maxspeed);
//     this.position.add(this.velocity);
//     // Reset accelertion to 0 each cycle
//     this.acceleration.mult(0);
//   };
//
//   // A method that calculates and applies a steering force towards a target
//   // STEER = DESIRED MINUS VELOCITY
//   Boid.prototype.seek = function (target) {
//     let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target
//     // Normalize desired and scale to maximum speed
//     desired.normalize();
//     desired.mult(this.maxspeed);
//     // Steering = Desired minus Velocity
//     let steer = p5.Vector.sub(desired, this.velocity);
//     steer.limit(this.maxforce); // Limit to maximum steering force
//     return steer;
//   };
//
//   Boid.prototype.render = function () {
//     // Draw a triangle rotated in the direction of velocity
//     let theta = this.velocity.heading() + p.radians(90);
//     p.fill(50);
//     p.stroke(100);
//     p.push();
//     p.translate(this.position.x, this.position.y);
//     p.rotate(theta);
//     p.beginShape();
//     p.vertex(0, -this.r * 0.5);
//     p.vertex(-this.r, this.r * 0.5);
//     p.vertex(this.r, this.r * 0.5);
//     p.endShape(p.CLOSE);
//     p.pop();
//   };
//
//   // Wraparound
//   Boid.prototype.borders = function () {
//     if (this.position.x < -this.r) this.position.x = p.width + this.r;
//     if (this.position.y < -this.r) this.position.y = p.height + this.r;
//     if (this.position.x > p.width + this.r) this.position.x = -this.r;
//     if (this.position.y > p.height + this.r) this.position.y = -this.r;
//   };
//
//   // Separation
//   // Method checks for nearby boids and steers away
//   Boid.prototype.separate = function (boids) {
//     let desiredseparation = 25.0;
//     let steer = p.createVector(0, 0);
//     let count = 0;
//     // For every boid in the system, check if it's too close
//     for (let i = 0; i < boids.length; i++) {
//       let d = p5.Vector.dist(this.position, boids[i].position);
//       // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
//       if (d > 0 && d < desiredseparation) {
//         // Calculate vector pointing away from neighbor
//         let diff = p5.Vector.sub(this.position, boids[i].position);
//         diff.normalize();
//         diff.div(d); // Weight by distance
//         steer.add(diff);
//         count++; // Keep track of how many
//       }
//     }
//     // Average -- divide by how many
//     if (count > 0) {
//       steer.div(count);
//     }
//
//     // As long as the vector is greater than 0
//     if (steer.mag() > 0) {
//       // Implement Reynolds: Steering = Desired - Velocity
//       steer.normalize();
//       steer.mult(this.maxspeed);
//       steer.sub(this.velocity);
//       steer.limit(this.maxforce);
//     }
//     return steer;
//   };
//
//   // Alignment
//   // For every nearby boid in the system, calculate the average velocity
//   Boid.prototype.align = function (boids) {
//     let neighbordist = 50;
//     let sum = p.createVector(0, 0);
//     let count = 0;
//     for (let i = 0; i < boids.length; i++) {
//       let d = p5.Vector.dist(this.position, boids[i].position);
//       if (d > 0 && d < neighbordist) {
//         sum.add(boids[i].velocity);
//         count++;
//       }
//     }
//     if (count > 0) {
//       sum.div(count);
//       sum.normalize();
//       sum.mult(this.maxspeed);
//       let steer = p5.Vector.sub(sum, this.velocity);
//       steer.limit(this.maxforce);
//       return steer;
//     } else {
//       return p.createVector(0, 0);
//     }
//   };
//
//   // Cohesion
//   // For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
//   Boid.prototype.cohesion = function (boids) {
//     let neighbordist = 50;
//     let sum = p.createVector(0, 0); // Start with empty vector to accumulate all locations
//     let count = 0;
//     for (let i = 0; i < boids.length; i++) {
//       let d = p5.Vector.dist(this.position, boids[i].position);
//       if (d > 0 && d < neighbordist) {
//         sum.add(boids[i].position); // Add location
//         count++;
//       }
//     }
//     if (count > 0) {
//       sum.div(count);
//       return this.seek(sum); // Steer towards the location
//     } else {
//       return p.createVector(0, 0);
//     }
//   };
// }
//
// // Inlined below
// // import { ReactP5Wrapper } from "react-p5-wrapper"
//
// function App() {
//   return (
//     <div>
//       <h2>Hellow World</h2>
//       <ReactP5Wrapper sketch={sketch} />
//     </div>
//   );
// }
//
// (function declareReactP5Wrapper(exports) {
//   /* Inlined react-p5-wrapper
//       Copyright 2016 James Robb
//
//       Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//       The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
//       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//       */
//   const { createRef, FC, memo, useState, useLayoutEffect } = React;
//
//   function createCanvas(sketch, wrapper) {
//     return new p5(sketch, wrapper);
//   }
//
//   const ReactP5WrapperComponent = ({ sketch, children, ...props }) => {
//     const wrapperRef = createRef();
//     const [instance, setInstance] = useState();
//
//     useLayoutEffect(() => {
//       if (wrapperRef.current === null) {
//         return;
//       }
//
//       if (instance) instance.remove();
//       const canvas = createCanvas(sketch, wrapperRef.current);
//       setInstance(canvas);
//     }, [sketch]);
//
//     useLayoutEffect(() => {
//       if (instance && instance.updateWithProps) instance.updateWithProps(props);
//     }, [props, instance]);
//
//     useLayoutEffect(() => () => instance && instance.remove(), []);
//
//     return <div ref={wrapperRef}>{children}</div>;
//   };
//
//   function propsAreEqual(previous, next) {
//     const differences = diff(previous, next);
//
//     return differences.length === 0;
//   }
//
//   /* microdiff inlined
//       MIT License
//
//       Copyright (c) 2021 AsyncBanana
//
//       Permission is hereby granted, free of charge, to any person obtaining a copy
//       of this software and associated documentation files (the "Software"), to deal
//       in the Software without restriction, including without limitation the rights
//       to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//       copies of the Software, and to permit persons to whom the Software is
//       furnished to do so, subject to the following conditions:
//
//       The above copyright notice and this permission notice shall be included in all
//       copies or substantial portions of the Software.
//
//       THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//       IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//       FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//       AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//       LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//       OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
//       SOFTWARE.
//     */
//   const richTypes = { Date: true, RegExp: true, String: true, Number: true };
//   function diff(obj, newObj, options = { cyclesFix: true }, _stack = []) {
//     let diffs = [];
//     const isObjArray = Array.isArray(obj);
//     for (const key in obj) {
//       const objKey = obj[key];
//       const path = isObjArray ? +key : key;
//       if (!(key in newObj)) {
//         diffs.push({
//           type: "REMOVE",
//           path: [path],
//           oldValue: obj[key],
//         });
//         continue;
//       }
//       const newObjKey = newObj[key];
//       const areObjects =
//         typeof objKey === "object" && typeof newObjKey === "object";
//       if (
//         objKey &&
//         newObjKey &&
//         areObjects &&
//         !richTypes[Object.getPrototypeOf(objKey).constructor.name] &&
//         (options.cyclesFix ? !_stack.includes(objKey) : true)
//       ) {
//         const nestedDiffs = diff(
//           objKey,
//           newObjKey,
//           options,
//           options.cyclesFix ? _stack.concat([objKey]) : []
//         );
//         diffs.push.apply(
//           diffs,
//           nestedDiffs.map((difference) => {
//             difference.path.unshift(path);
//             return difference;
//           })
//         );
//       } else if (
//         objKey !== newObjKey &&
//         !(
//           areObjects &&
//           (isNaN(objKey)
//             ? objKey + "" === newObjKey + ""
//             : +objKey === +newObjKey)
//         )
//       ) {
//         diffs.push({
//           path: [path],
//           type: "CHANGE",
//           value: newObjKey,
//           oldValue: objKey,
//         });
//       }
//     }
//     const isNewObjArray = Array.isArray(newObj);
//     for (const key in newObj) {
//       if (!(key in obj)) {
//         diffs.push({
//           type: "CREATE",
//           path: [isNewObjArray ? +key : key],
//           value: newObj[key],
//         });
//       }
//     }
//     return diffs;
//   }
//
//   exports.ReactP5Wrapper = memo(ReactP5WrapperComponent, propsAreEqual);
// })(window);
//
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
