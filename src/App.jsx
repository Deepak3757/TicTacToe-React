import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
function App() {
  const [activePlayer, setActivePlayer]=useState('X');
  function handleSelectSquare(){
    setActivePlayer((currPlayer)=>currPlayer==='X'?'O':'X');
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
        <Player initialName="Player1" symbol="X" isActive={activePlayer==='X'}/>
        <Player initialName="Player2" symbol="O" isActive={activePlayer==='O'}/>
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} player={activePlayer}/>
      </div>
      log
    </main>    

  )
}

export default App
