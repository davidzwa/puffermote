import {FC} from "react";
import {useMIDI, useMIDIControls, useMIDIMessage} from "@react-midi/hooks";

// @ts-ignore
const MIDIControlLog = ({input}) => {
    const controls = [1];

    //
    const channelMap = {
        16: "x-pos",
        17: "speed",
        18: "speed-y",
        19: "speed-x"
    };

    const values = useMIDIControls(input, controls, {channel: 3});
    const values2 = useMIDIControls(input, controls, {channel: 4});
    const message = useMIDIMessage(input); // initially return {}

    if (message?.data) {
        const [device, id, value] = Array.from(message?.data);
        // console.log(values, values2, [...Array.from(message?.data)]);
        // @ts-ignore
        console.log(channelMap[id], value);
    }
    return (<div>
        {controls.map((control) => (<div key={control}>
            Control {control}: {values[control]}
        </div>))}
    </div>);


};
const MIDIManager: FC = () => {
    const {inputs, outputs, hasMIDI} = useMIDI();

    if (inputs.length < 1) return <div>No MIDI Inputs</div>;
    return <MIDIControlLog input={inputs[1]}/>;


};
export default MIDIManager;