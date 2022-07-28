import "./App.css";
import Game from "./components/Game";
import { GameBg } from "./components/GameBg";

function App() {
  return (
    <div className="App">
      <GameBg />
      <h1 style={{ textAlign: "center" }}>Puffermote v1.9.63</h1>
      <br />
      <Game />
    </div>
  );
}

export default App;
