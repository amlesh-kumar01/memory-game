import { useState, useEffect } from "react";
import "./Game.css";
import SingleCard from "./SingleCard";
import { Link } from 'react-router-dom';

const cardImages = [
  { src: "/img/apple.jpg", matched: false },
  { src: "/img/banana.jpg", matched: false },
  { src: "/img/strawberry.jpg", matched: false },
  { src: "/img/coconut.jpg", matched: false },
  { src: "/img/cherry.jpg", matched: false },
  { src: "/img/grapes.jpg", matched: false },
  { src: "/img/berry.jpg", mathched: false },
  { src: "/img/mango.jpg", mathched: false },
];

function Game() {
  const [cards, setCards] = useState([]); // to store the shuffled cards
  const [turns, setTurns] = useState(0); //to store the number of turns
  const [choiceOne, setChoiceOne] = useState(null); // to store the card that is clicked first
  const [choiceTwo, setChoiceTwo] = useState(null); // to store the card that is clicked second
  const [disabled, setDisabled] = useState(false); // to control the the mouseClick on the card

  // start new game automagically
  useEffect(() => {
    shuffleCards();
  }, []);
  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // to store the choice in choiceOne and choiceTwo
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //mark the matched choice to be displayed or reset the turn
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  //to store all the card elments that is to be stored
  const cardElements = cards.map((card) => (
    <SingleCard
      key={card.id}
      card={card}
      handleChoice={handleChoice}
      flipped={card === choiceOne || card === choiceTwo || card.matched} // card is displayed only when it flipped is true
      disabled={disabled} //card can only be clicked when disabled is false
    />
  ));

  return (
    <div className="Game">
      <h2 className="game-heading">Recall Rush</h2>
      <div className="game-control">
        <button onClick={shuffleCards}>New Game</button>
        <p>Turns: {turns}</p>
      </div>
      <div className="card-grid">{cardElements}</div>
      <Link to="/" className="go-back">Go Back</Link>
    </div>
  );
}

export default Game;
