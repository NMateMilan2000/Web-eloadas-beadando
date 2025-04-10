import React from "react";

export default function PlayerHand({ cards }) {
  return (
    <div>
      <h3>Játékos lapjai</h3>
      <p>{cards.join(", ")} (össz: {cards.reduce((a, b) => a + b, 0)})</p>
    </div>
  );
}
