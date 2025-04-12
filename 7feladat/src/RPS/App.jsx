import React, { useState } from 'react';
import PlayerHand from './PlayerHand';
import PcHand from './PcHand';

const choices = ['kő', 'papír', 'olló'];

function RockPaperScissorsApp() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const getResult = (player, computer) => {
    if (player === computer) return 'Döntetlen!';
    if (
      (player === 'kő' && computer === 'olló') ||
      (player === 'papír' && computer === 'kő') ||
      (player === 'olló' && computer === 'papír')
    ) {
      return 'Nyertél!';
    }
    return 'Vesztettél!';
  };

  const handleClick = (choice) => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(choice);
    setComputerChoice(randomChoice);
    setResult(getResult(choice, randomChoice));
  };

  const handleReset = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
  };

  return (
    <div className="container">
      <h2>✂️ Kő – Papír – Olló</h2>

      <div>
        {choices.map((choice) => (
          <button key={choice} onClick={() => handleClick(choice)}>
            {choice}
          </button>
        ))}
      </div>

      {result && (
        <>
          <h3>Eredmény: {result}</h3>
          <PlayerHand playerChoice={playerChoice} />
          <PcHand computerChoice={computerChoice} />
          <button onClick={handleReset}>Új játék</button>
        </>
      )}
    </div>
  );
}

export default RockPaperScissorsApp;
