import React from "react";

export default function DealerHand({ cards, hide }) {
  const total = cards.reduce((a, b) => a + b, 0);
  return (
    <div>
      <h3>Osztó lapjai</h3>
      {hide ? <p>???, ?</p> : <p>{cards.join(", ")} (össz: {total})</p>}
    </div>
  );
}
