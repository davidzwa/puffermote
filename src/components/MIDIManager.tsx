import {FC} from "react";
import {useMIDI, useMIDIControls, useMIDIMessage} from "@react-midi/hooks";

// @ts-ignore
const MIDIControlLog: FC = ({input, setData}) => {
    const controls = [1];

    let prevX: number = 0;
    let prevY: number = 0;
    let grab: number = 0;

    const channelMap = {
        14: "grab",
        15: "y-pos",
        16: "x-pos",
        17: "speed",
        18: "speed-y",
        19: "speed-x"
    };

    const values = useMIDIControls(input, controls, {channel: 3});
    // const values2 = useMIDIControls(input, controls, {channel: 4});
    const message = useMIDIMessage(input); // initially return {}

    if (message?.data) {
        const [device, id, value] = Array.from(message?.data);

        if (id === 14) {
            grab = value;
        }
        if (id === 15 && value !== 0) {
            prevY = value;
            setData({posY: prevY});

        } else if (id === 16 && value !== 0) {
            prevX = value;
            setData({posX: prevX});
        }

        const detail = {
            posX: prevX,
            posY: prevY,
            grab
        };
        window.dispatchEvent(new CustomEvent<{ posX: number, posY: number, grab: number }>('pos-update', {
            detail
        }));

    }
    return (<div>
        {controls.map((control) => (<div key={control}>
            Control {control}: {values[control]}
        </div>))}
    </div>);


};
// @ts-ignore
const MIDIManager: FC<{ setData: any }> = (props) => {
    const {inputs, outputs, hasMIDI} = useMIDI();

    if (inputs.length < 1) return <div>No MIDI Inputs</div>;

    // @ts-ignore
    return <MIDIControlLog setData={props.setData} input={inputs[1]}/>;


};
export default MIDIManager;