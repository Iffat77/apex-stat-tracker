import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import fetchInfo from "./App.js";
import "./home.css";

function Home({ data }) {
  const [card, setCard] = useState();
  const [legendName, setLegendName] = useState();
  const [userName, setUserName] = useState();
  const [totalLevel, setTotalLevel] = useState();
  const [totalKills, setTotalKills] = useState(null)


  useEffect(() => {
    let legend = data.data.metadata.activeLegendName;
    let player = data.data.platformInfo.platformUserId;
    let level = data.data.segments[0].stats.level.value;
    let kills = null
    let na= "N/A"

    if (data.data.segments[0].stats.kills) {
      kills = data.data.segments[0].stats.kills.value
      setTotalKills(kills);
    } else if (!data.data.segments[0].stats.kills) {
      kills = na
      setTotalKills(kills);
    }
    
    setCard(data);
    setLegendName(legend);
    setUserName(player);
    setTotalLevel(level);


  }, [data]);

  return (
    <div>
      <h1>Testing home</h1>
      <div className="testing-container">
        <h3>{`Legend: ${legendName}`}</h3>
        <h3>{`Player: ${userName}`}</h3>
        <h3>{`Level: ${totalLevel}`}</h3>
        <h3>{`All Time Kills: ${totalKills}`}</h3>
        
      </div>
    </div>
  );
}

export default Home;
