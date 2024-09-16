const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export default function GameBoard({onSelectSquare, turns}) {
    let gameBoard=initialGameBoard;
    for(const turn of turns){
        const {square, player}=turn;
        const {row, col}=square;
        gameBoard[row][col]=turn.player;
    }
    
    // const [gameBoard, setGameBoard]=useState(initialGameBoard);
    // function handleSelectSquare(rowIndex, colIndex){
    //     setGameBoard((prevGameBoard)=>{
    //         console.log(rowIndex, colIndex);
    //         const updatedBoard=[...prevGameBoard.map((board)=>([...board]))];
    //         updatedBoard[rowIndex][colIndex]=player;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }

    return (
        <ol id="game-board">
        {gameBoard.map((row, rowIndex) => 
            <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) =>
                <li key={colIndex}>
                    <button onClick={()=>onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol!=undefined}>{playerSymbol}</button>
                </li>
                )}
            </ol>
            </li>
        )}
        </ol>
    );
}
