import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");
  function handleSelectSquare(rowInd, colInd) {
    setActivePlayer((currPlayer) => (currPlayer === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currPlayer = "X";

      if (prevTurns.length > 0 && prevTurns[0].player == "X") currPlayer = "O";

      const updatedTurns = [
        { square: { row: rowInd, col: colInd }, player: currPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
