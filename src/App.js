import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])// to store the shuffled cards
  const [turns, setTurns] = useState(0)//to store the number of turns
  const [choiceOne, setChoiceOne] = useState(null)// to store the card that is clicked first
  const [choiceTwo, setChoiceTwo] = useState(null)// to store the card that is clicked second
  const [disabled, setDisabled] = useState(false)// to control the the mouseClick on the card

  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])
  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // to store the choice in choiceOne and choiceTwo
  const handleChoice = (card) => {choiceOne ? setChoiceTwo(card) : setChoiceOne(card)};
  

  //mark the matched choice to be displayed or reset the turn
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards =>  prevCards.map(card => (card.src=== choiceOne.src) ? {...card,matched:true} : card))
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  

  //to store all the card elments that is to be stored
  const cardElements= cards.map(card => 
    <SingleCard 
      key={card.id}
      card={card}
      handleChoice={handleChoice}
      flipped={card === choiceOne || card === choiceTwo || card.matched}// card is displayed only when it flipped is true
      disabled={disabled}//card can only be clicked when disabled is false
    />
  )


  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cardElements}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
}

export default App
