import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActivePlayer,
  onChangePlayerName,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);

  let playerName = isEditing ? (
    <input type="text" required value={name} onChange={onChange} />
  ) : (
    <span className="player-name">{name}</span>
  );
  let buttonText = isEditing ? "Save" : "Edit";

  function onClickEdit() {
    if (isEditing) {
      onChangePlayerName(symbol, name);
    }
    setIsEditing((editing) => !editing);
  }

  function onChange(event) {
    setName(event.target.value);
  }

  return (
    <li className={isActivePlayer ? "active" : undefined}>
      <span className="player">
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onClickEdit}>{buttonText}</button>
    </li>
  );
}
