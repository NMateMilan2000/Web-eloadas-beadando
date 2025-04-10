import React from "react";

export default function Controls({ onHit, onStand, onRestart, disabled }) {
  return (
    <div>
      <button onClick={onHit} disabled={disabled}>Húzok</button>
      <button onClick={onStand} disabled={disabled}>Megállok</button>
      <button onClick={onRestart}>Újraindítás</button>
    </div>
  );
}
