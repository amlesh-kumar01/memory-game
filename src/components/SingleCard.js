import './SingleCard.css'

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  // to decide the whether the card can be clicked or not
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/cover.png" onClick={handleClick} alt="cover" style={{opacity:"0.8"}} />
      </div>
    </div>
  )
}
