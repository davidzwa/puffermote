import React from "react";
import p5Types from "p5";
import p5 from "p5";
import P5 from "./ReactP5";
import Flock from "./Boids/Flock";
import 'p5/lib/addons/p5.sound';

// import 'p5/lib/addons/p5.dom';

interface ComponentProps {
    //Your component props
    posX: number;
    posY: number;
}

let x = 0;
const y = 0;
let r = 0;

const Game: React.FC<ComponentProps> = (props: ComponentProps) => {
    let octahedron: p5.Geometry;
    let octahedron2: p5.Geometry;
    let flock: Flock;
    let song: p5Types.SoundFile;

    function preload(p: p5Types) {
        song = p.loadSound("/stressful.mp3");
        octahedron = p.loadModel("/bubbly.obj");
        octahedron2 = p.loadModel("/spiky.obj");
    }

    const setup = (p: p5Types, canvasParentRef: Element) => {
        p.createCanvas(p.windowWidth, 500, p.WEBGL).parent(canvasParentRef);
        flock = new Flock(p);
        flock.setup();
        song.loop();
        // @ts-ignore
        p.getAudioContext().resume();

        // p.mouseDragged = () => {
        //   // flock.addBoid(p.mouseX, p.mouseY);
        //   // octahedron2;
        // };
    };

    const mouseOffsetX = 500;
    const mouseOffsetY = 250;

    const draw = (p: p5Types) => {
        p.clear(0, 0, 0, 0);
        p.background(10);
        flock.run();

        const x = p.width / 2 - mouseOffsetX + props.posX * 100;
        const y = p.height / 2 - mouseOffsetY + props.posY * 50;
        console.log(x, y);
        if (p.mouseY < 200) {
            song.play();


            p.translate(x, y, 0, 320);
            p.rotate(r / 100.0, [1, 1, 0]);

            // Render los spikos
            // p.scale(1);
            p.normalMaterial();
            p.model(octahedron);
            p.rotate(r / 100.0, [1, 1, 0]);

            // p.model(octahedron);
            // p.rotate(r / 100.0, [1, 1, 0]);
            // p.model(octahedron);
            // p.rotate(r / 100.0, [1, 1, 0]);
            // p.model(octahedron);
            // p.translate(0, 1, 10);
            // p.rotate(r / 100.0, [1, 1, 0]);
        } else if (p.mouseY >= 200 && p.mouseY < 500) {
            p.translate(x, y, 0, 320);
            p.rotate(r / 100.0, [1, 1, 0]);

            p.scale(1);
            p.normalMaterial();
            p.model(octahedron2);
            p.rotate(r / 100.0, [1, 1, 0]);

            // p.model(octahedron2);
            // p.rotate(r / 100.0, [1, 1, 0]);
            // p.model(octahedron2);
            // p.rotate(r / 100.0, [1, 1, 0]);
            // p.model(octahedron2);

            p.translate(0, 1, 10);
            p.rotate(r / 100.0, [1, 1, 0]);
            p.model(octahedron2);
        }
        // x++;
        r++;
    };

    return (
        <>
            <P5 style={{width: "100%"}} setup={setup} draw={draw} preload={preload}/>
        </>
    );
};

export default Game;
