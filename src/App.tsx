import "./App.css";
import Game from "./components/Game";
import {GameBg} from "./components/GameBg";
import {useEffect, useState} from "react";
import {useMIDI} from "@react-midi/hooks";
import MIDIManager from "./components/MIDIManager";

function App() {

    const [scrollPosition, setSrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, {passive: true});
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="App">
            <GameBg/>
            <MIDIManager/>
            <h1 style={{textAlign: "center"}}>Meditative Aquarium</h1>
            <br/>
            <Game scrollSize={scrollPosition}/>
        </div>
    );
}

export default App;
