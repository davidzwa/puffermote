import p5Types from "p5";
import p5 from "p5";

let x = 50;
let y = 50;
let octahedron: p5.Geometry;

export function setupPufferFish(p: p5Types) {
  p.loadModel("/puffer.obj");
}

export function renderPufferFish(p: p5Types) {
  p.ellipse(x, y, 70, 70);
  p.translate(0, 0, 320);
  p.rotate(r / 100.0, [1, 1, 0]);
  p.scale(3);
  p.normalMaterial();
  p.model(octahedron);
  p.rotate(r / 100.0, [1, 1, 0]);
  p.model(octahedron);
  p.rotate(r / 100.0, [1, 1, 0]);
  p.model(octahedron);
  p.rotate(r / 100.0, [1, 1, 0]);
  p.model(octahedron);
  p.translate(0, 1, 10);
  p.rotate(r / 100.0, [1, 1, 0]);
  p.model(octahedron);
  x++;
  r++;
}
