import React, { useState } from "react";
import PlayerHand from "./PlayerHand";
import DealerHand from "./DealerHand";
import Controls from "./Controls";
import ResultDisplay from "./ResultDisplay";
import "../index.css";
// A Blackjack játékhoz szükséges komponensek importálása
// A Blackjack játék fő komponense

export default function BlackjackApp() {
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [result, setResult] = useState("");

  const drawCard = () => Math.floor(Math.random() * 11) + 1;

  const playerTotal = playerCards.reduce((a, b) => a + b, 0);
  const dealerTotal = dealerCards.reduce((a, b) => a + b, 0);

  const handleHit = () => {
    const newCard = drawCard();
    const newHand = [...playerCards, newCard];
    setPlayerCards(newHand);

    const newTotal = newHand.reduce((a, b) => a + b, 0);
    if (newTotal > 21) {
      setResult("Vesztettél! 😞 Túlmentél 21-en.");
      setGameOver(true);
    }
  };

  const handleStand = () => { 
    let newDealerCards = [...dealerCards];
    let currentTotal = newDealerCards.reduce((a, b) => a + b, 0);

    while (currentTotal < 17) {
    const card = drawCard();
    newDealerCards.push(card);
    currentTotal += card;

    }
    setDealerCards(newDealerCards);

    const newTotal = newDealerCards.reduce((a, b) => a + b, 0);

    if (newTotal > 21 || playerTotal > newTotal) {
      setResult("Nyertél! 🎉");
    } else if (playerTotal === newTotal) {
      setResult("Döntetlen! 😐");
    } else {
      setResult("Vesztettél! 😞");
    }

    setGameOver(true);
  };

  const handleRestart = () => {
    setPlayerCards([drawCard(), drawCard()]);
    setDealerCards([drawCard()]);
    setResult("");
    setGameOver(false);
  };

  // Ha játék indul, automatikusan kezdés két lappal
  React.useEffect(() => {
    handleRestart();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px", contentAlign: "center" }}>
      <h1>🃏 Blackjack Játék</h1>
      <PlayerHand cards={playerCards} />
      <DealerHand cards={dealerCards} hide={!gameOver} />
      <Controls
        onHit={handleHit}
        onStand={handleStand}
        onRestart={handleRestart}
        disabled={gameOver}
      />
      {gameOver && <ResultDisplay result={result} />}
    </div>
  );
}
