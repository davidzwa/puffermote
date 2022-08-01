import React, {FC, useEffect, useRef} from "react";
import p5 from "p5";

// NOTE: assigning p5 to window because someone can need it globally to use in others libraries
if (typeof window !== "undefined") {
    window.p5 = p5;
}

export const p5Events = [
    "draw",
    "windowResized",
    "preload",
    "mouseClicked",
    "doubleClicked",
    "mouseMoved",
    "mousePressed",
    "mouseWheel",
    "mouseDragged",
    "mouseReleased",
    "keyPressed",
    "keyReleased",
    "keyTyped",
    "touchStarted",
    "touchMoved",
    "touchEnded",
    "deviceMoved",
    "deviceTurned",
    "deviceShaken",
];

const P5: FC<any> = (props: {
    setup: (...data: any) => any;
    [k: string]: (...data: any) => any;
    className: any;
    style: any;
}) => {
    const canvasParentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sketch = new p5((p) => {
            p.setup = () => {
                props.setup(p, canvasParentRef.current);
            };

            p5Events.forEach((event) => {
                if (props[event]) {
                    p[event] = (...rest: any[]) => {
                        props[event](p, ...rest);
                    };
                }
            });
        }, document.getElementById("react-p5")!);
    }, []);

    return (
        <div
            ref={canvasParentRef}
            className={props.className || "react-p5"}
            data-testid="react-p5"
            style={props.style || {}}
        />
    );
};

export default P5;
