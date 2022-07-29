import "./App.css";
import Game from "./components/Game";
import {GameBg} from "./components/GameBg";
import {useState} from "react";
import MIDIManager from "./components/MIDIManager";

function App() {
    const [data, setData] = useState({posX: 0, posY: 0});

    return (
        <div className="App">
            <GameBg/>
            <MIDIManager setData={setData}/>
            <h1 style={{textAlign: "center"}}>Meditative Aquarium</h1>
            <br/>
            <Game posX={data.posX} posY={data.posY} />
        </div>
    );
}

export default App;
