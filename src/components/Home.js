import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <div className="Home">
      <h2 className='home-title'>Recall Rush!</h2>
      <h6 className="home-subtitle">Test you ability to recall</h6>
      <img src="/img/home.jpg" alt="game-screenshot" className='game-poster' width="75%"/>
      <Link to="/game" className='play-game'>Play Game</Link>
    </div>
  )
}

export default Home