import React from "react";
import p5Types from "p5";
import p5 from "p5";
import P5 from "./ReactP5";
import Flock from "./Boids/Flock";

interface ComponentProps {
  //Your component props
  scrollSize: number;
}

let x = 50;
const y = 50;
let r = 0;

const Game: React.FC<ComponentProps> = (props: ComponentProps) => {
  let octahedron: p5.Geometry;
  let flock: Flock;

  function preload(p: p5Types) {
    octahedron = p.loadModel("/puffer.obj");
  }

  const spawnCookie = (p: p5Types) => {
    p.ellipse(x, y, 70, 70);
  };

  const setup = (p: p5Types, canvasParentRef: Element) => {
    p.createCanvas(p.windowWidth, 400, p.WEBGL).parent(canvasParentRef);
    p.describe("Fish and food");
    flock = new Flock(p);

    flock.setup();
    p.mouseDragged = () => {
      // flock.addBoid(p.mouseX, p.mouseY);
      spawnCookie(p);
    };
  };

  const draw = (p: p5Types) => {
    p.clear(0, 0, 0, 0);
    p.background(10);
    flock.run();

    // p.ellipse(x, y, 70, 70);
    // p.translate(0, 0, 320);
    // p.rotate(r / 100.0, [1, 1, 0]);
    // p.scale(3);
    // p.normalMaterial();
    // p.model(octahedron);
    // p.rotate(r / 100.0, [1, 1, 0]);
    // p.model(octahedron);
    // p.rotate(r / 100.0, [1, 1, 0]);
    // p.model(octahedron);
    // p.rotate(r / 100.0, [1, 1, 0]);
    // p.model(octahedron);
    // p.translate(0, 1, 10);
    // p.rotate(r / 100.0, [1, 1, 0]);
    // p.model(octahedron);
    // x++;
    // r++;

    console.log(props.scrollSize);
  };

  return (
    <P5 style={{ width: "100%" }} setup={setup} draw={draw} preload={preload} />
  );
};

export default Game;
