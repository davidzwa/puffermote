import "./App.css";
import Game from "./components/Game";
import { GameBg } from "./components/GameBg";
import { useEffect, useState } from "react";

function App() {
  const [scrollPosition, setSrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setSrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <GameBg />
      <h1 style={{ textAlign: "center" }}>Puffermote v1.9.63</h1>
      <br />
      <Game scrollSize={scrollPosition} />
    </div>
  );
}

export default App;
