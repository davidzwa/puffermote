import React, {useCallback, useEffect, useState} from "react";
import p5Types from "p5";
import p5 from "p5";
import P5 from "./ReactP5";
import Flock from "./Boids/Flock";
import 'p5/lib/addons/p5.sound';

// import 'p5/lib/addons/p5.dom';

interface ComponentProps {
    //Your component props
    data: {
        posX: number;
        posY: number;
    }
}

let x = 0;
const y = 0;
let r = 0;

const Game: React.FC<ComponentProps> = (props: ComponentProps) => {
    const [x1, setX] = useState(0);
    const [y1, setY] = useState(0);
    let octahedron: p5.Geometry;
    let octahedron2: p5.Geometry;
    let flock: Flock;
    let song: p5Types.SoundFile;

    function preload(p: p5Types) {
        // song = p.loadSound("/stressful.mp3");
        octahedron = p.loadModel("/bubbly.obj");
        octahedron2 = p.loadModel("/spiky.obj");
    }

    const updateVals = useCallback((x: number, y: number) => {

        setX(x);
        setY(y);
    }, [x1, y1, setX, setY]);

    useEffect(() => {
        window.addEventListener('pos-update', (update) => {
            const updater = update as CustomEvent;

            const x = updater.detail.posX;
            const y = updater.detail.posY;
            updateVals(x, y);
        });
    }, [x1, setX, y1, setY])

    let xp5 = 0;
    let yp5 = 0;
    let grabFactor = 0;
    const setup = (p: p5Types, canvasParentRef: Element) => {
        window.addEventListener('pos-update', (update) => {
            const updater = update as CustomEvent;

            const x = updater.detail.posX;
            const y = updater.detail.posY;
            const grab =updater.detail.grab;
            // updateVals(x, y);
            xp5 =  x ? x : xp5;
            yp5 = y ? y : yp5;
            grabFactor = grab ? grab : grabFactor;
        });
        p.createCanvas(p.windowWidth, 800, p.WEBGL).parent(canvasParentRef);
        flock = new Flock(p);
        flock.setup();
        // song.loop();
        // @ts-ignore
        // p.getAudioContext().resume();

        // p.mouseDragged = () => {
        //   // flock.addBoid(p.mouseX, p.mouseY);
        //   // octahedron2;
        // };
    };


    const mouseOffsetX = 1000;
    const mouseOffsetY = 250;

    const draw = (p: p5Types) => {
        p.clear(0, 0, 0, 0);
        p.background(10);

        const x = -500 + xp5 * 6;
        const y = -500 + yp5 * 6;

        if (grabFactor < 3) {
            // song.play();

            p.translate(x, y, 0);
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
        } else {
            p.translate(x, y, 0);
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
        flock.run();
    };

    return (
        <>
            {xp5} {yp5}
            <P5 style={{width: "100%"}} setup={setup} draw={draw} preload={preload}/>
        </>
    );
};

export default Game;
