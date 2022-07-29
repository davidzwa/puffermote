import React from "react";
import p5Types from "p5";
import p5 from "p5";
import P5 from "./ReactP5";
import Flock from "./Boids/Flock";
import 'p5/lib/addons/p5.sound';
// import 'p5/lib/addons/p5.dom';

interface ComponentProps {
  //Your component props
  scrollSize: number;
}

let x = 0;
const y = 0;
let r = 0;
let song;

const Game: React.FC<ComponentProps> = (props: ComponentProps) => {
  let octahedron: p5.Geometry;
  let octahedron2: p5.Geometry;
  let flock: Flock;
  
  function preload(p: p5Types) {
    song = p.loadSound("/stressul.mp3");
    octahedron = p.loadModel("/bubbly.obj");
    octahedron2 = p.loadModel("/spiky.obj");
  }

  const setup = (p: p5Types, canvasParentRef: Element) => {
    p.createCanvas(p.windowWidth, 400, p.WEBGL).parent(canvasParentRef);
    p.createCanvas(p.windowWidth, 500, p.WEBGL).parent(canvasParentRef);
    flock = new Flock(p);
    flock.setup();

    p.mouseDragged = () => {
      // flock.addBoid(p.mouseX, p.mouseY);
      octahedron2;
    };
  };

  const draw = (p: p5Types) => {
    p.clear(0, 0, 0, 0);
    p.background(10);
    flock.run();
    p.song.loof();

    if (p.mouseY < 200){
      p.translate(p.mouseX-1000, p.mouseY-200, 0, 320);
      p.rotate(r / 100.0, [1, 1, 0]);
      p.scale(1);
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
    } 
    
    else if (p.mouseY >= 200 && p.mouseY < 500){
      p.translate(p.mouseX-1000, p.mouseY-200, 0, 320);
      p.rotate(r / 100.0, [1, 1, 0]);
      p.scale(1);
      p.normalMaterial();
      p.model(octahedron2);
      p.rotate(r / 100.0, [1, 1, 0]);
      p.model(octahedron2);
      p.rotate(r / 100.0, [1, 1, 0]);
      p.model(octahedron2);
      p.rotate(r / 100.0, [1, 1, 0]);
      p.model(octahedron2);
      p.translate(0, 1, 10);
      p.rotate(r / 100.0, [1, 1, 0]);
      p.model(octahedron2);
    }
    x++;
    r++;
    
    console.log(props.scrollSize);
  };

  return (
    <P5 style={{ width: "100%" }} setup={setup} draw={draw} preload={preload} />
  );
};

export default Game;
