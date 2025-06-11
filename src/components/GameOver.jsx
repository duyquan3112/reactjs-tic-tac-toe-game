export default function GameOver({ winner, onRestart }) {
  const resultContent = winner ? (
    <p>{winner.toUpperCase()} won!</p>
  ) : (
    <p>It's a draw!</p>
  );

  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {resultContent}
      <p>
        <button onClick={onRestart}>Rematch</button>
      </p>
    </div>
  );
}
