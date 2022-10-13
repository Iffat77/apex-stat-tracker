import React from "react";
import { useEffect, useState } from "react";
import "./home.css";

function Home({ data }) {
  const [card, setCard] = useState();
  const [legendName, setLegendName] = useState();
  const [userName, setUserName] = useState()




  useEffect(() => {
    let legend = data.data.metadata.activeLegendName
    let player = data.data.platformInfo.platformUserId

    setCard(data);

    setLegendName(legend)
    setUserName(player)
  }, []);


  return (
    <div>
      <h1>Testing home</h1>
      <div className="testing-container">
        {console.log(card)}
        <h3>{`Legend: ${legendName}`}</h3>
        <h3>{`Player: ${userName}`}</h3>

      </div>
    </div>
  );
}

export default Home;
