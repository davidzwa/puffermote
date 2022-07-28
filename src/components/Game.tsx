import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import p5 from "p5";

interface ComponentProps {
  //Your component props
}

let x = 50;
const y = 50;
let r = 0;

const Game: React.FC<ComponentProps> = (props: ComponentProps) => {
  let octahedron: p5.Geometry;

  function preload(p5: p5Types) {
    octahedron = p5.loadModel("/puffer.obj");
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(p5.windowWidth, 500, p5.WEBGL).parent(canvasParentRef);
    p5.describe("Fish and food");
  };

  const draw = (p5: p5Types) => {
    p5.background("rgba(0,255,0, 0.25)");
    p5.ellipse(x, y, 70, 70);
    // p5.translate(-p5.width, -p5.height, 0);
    p5.translate(0, 0, 320);
    p5.rotate(r / 100.0, [1, 0, 0]);
    p5.normalMaterial();
    p5.model(octahedron);
    x++;
    r++;
  };

  return (
    <Sketch
      style={{ width: "100%" }}
      setup={setup}
      draw={draw}
      preload={preload}
    />
  );
};

export default Game;
