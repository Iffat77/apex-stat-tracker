import React from 'react';
import { useEffect, useState } from 'react';
import "./home.css";



function Home({ data }) {

  const [card, setCard] = useState([])
  
  useEffect(() => {
    let allGameData = data

    setCard(allGameData)
  }, [card])









  return (
    <div>

      <h1>Testing home</h1>
      <div className='testing-container'>
        {console.log(card.data.segments[0].stats)}
      </div>

    </div>
  )
}

export default Home