import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function deriveActivePlayer(gameTurns){
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") currPlayer = "O";
  return currPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer=deriveActivePlayer(gameTurns);

  let gameBoard=initialGameBoard;
    for(const turn of gameTurns){
        const {square, player}=turn;
        const {row, col}=square;
        gameBoard[row][col]=turn.player;
    }

  let winner=null;
  for(const winning of WINNING_COMBINATIONS){
    let firstSymbol=gameBoard[winning[0].row][winning[0].column];
    let secondSymbol=gameBoard[winning[1].row][winning[1].column];
    let thirdSymbol=gameBoard[winning[2].row][winning[2].column];
    if(firstSymbol&&firstSymbol===secondSymbol&&secondSymbol===thirdSymbol){
      winner=firstSymbol;
      console.log(firstSymbol, " wins");
    }
    

  }

  function handleSelectSquare(rowInd, colInd) {

    setGameTurns((prevTurns) => {
      const currPlayer=deriveActivePlayer(prevTurns);

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
        {winner&&<GameOver winner={winner}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
