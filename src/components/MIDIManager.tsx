import {FC} from "react";
import {useMIDI, useMIDIControls, useMIDIMessage} from "@react-midi/hooks";

// @ts-ignore
const MIDIControlLog: FC = ({input, setData}) => {
    const controls = [1];

    let prevX = 0;
    let prevY = 0;

    const channelMap = {
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

        // @ts-ignore
        // console.log(channelMap[id], value);
        if (id === 15) {
            prevY = value;
            console.log("set data y", prevY);
            setData({posY: prevY});
        } else if (id === 16) {
            prevX = value;
            console.log("set data x", prevX);
            setData({posX: prevX});
        }
    }
    return (<div>
        {controls.map((control) => (<div key={control}>
            Control {control}: {values[control]}
        </div>))}
    </div>);


};
// @ts-ignore
const MIDIManager: FC<{setData: any}> = (props) => {
    const {inputs, outputs, hasMIDI} = useMIDI();

    if (inputs.length < 1) return <div>No MIDI Inputs</div>;

    // @ts-ignore
    return <MIDIControlLog setData={props.setData} input={inputs[1]}/>;


};
export default MIDIManager;