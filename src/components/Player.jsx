import { useRef, useState } from "react";

export default function Player({symbol, initialName, isActive}) {
    const [playerName, setPlayerName]=useState(initialName);
    const [isEditing, setIsEditing]=useState(false);
    function handleClick(){
        setIsEditing((prev)=>!prev);
    }
    function handleSelect(event){
        setPlayerName(event.target.value);
    }
    let editablePlayerName=<span className="player-name">{playerName}</span>;
    if(isEditing){
        editablePlayerName=<input type="text" value={playerName} required onChange={handleSelect}/>;
    }
    return (
    <li className={isActive?'active':undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{!isEditing?'Edit':'Save'}</button>
    </li>
  );
}
