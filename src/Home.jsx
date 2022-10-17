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
  const [totalKills, setTotalKills] = useState(null);
  const [legendPic, setLegendPic] = useState();
  const [playerAvatar, setPlayerAvatar] = useState();
  const [playerRank, setPlayerRank] = useState();
  const [playerPercent, setPlayerPercent] = useState();

  useEffect(() => {
    let legend = data.data.metadata.activeLegendName;
    let player = data.data.platformInfo.platformUserId;
    let level = data.data.segments[0].stats.level.value;
    let pic = data.data.segments[1].metadata.imageUrl;
    let playerPic = data.data.platformInfo.avatarUrl;
    let playRank = null;
    let playPercentage = null;
    let kills = null;
    let na = "N/A";

    //ERROR HANDLING FOR MISSING FIELDS

    if (data.data.segments[0].stats.kills) {
      kills = data.data.segments[0].stats.kills.value;
      setTotalKills(kills);
    } else if (!data.data.segments[0].stats.kills) {
      kills = na;
      setTotalKills(kills);
    }
    if (data.data.segments[0].stats.kills) {
      playRank = data.data.segments[0].stats.kills.rank;
      setPlayerRank(playRank);
    } else if (!data.data.segments[0].stats.kills) {
      playRank = na;
      setPlayerRank(playRank);
    }
    if (data.data.segments[0].stats.kills) {
      playPercentage = 100 - data.data.segments[0].stats.kills.percentile;
      setPlayerPercent(playPercentage);
    } else if (!data.data.segments[0].stats.kills) {
      playPercentage = na;
      setPlayerPercent(playPercentage);
    }
    // ----------------------------------

    playPercentage = parseFloat(playPercentage).toFixed(1);

    if (playPercentage < 1) {
      playPercentage = 1;
    } else if (playPercentage === "NaN") {
      playPercentage = "N/A"
    }

    setCard(data);
    setLegendName(legend);
    setUserName(player);
    setTotalLevel(level);
    setLegendPic(pic);
    setPlayerAvatar(playerPic);
    setPlayerRank(playRank);
    setPlayerPercent(playPercentage);
  }, [data]);

  return (
    <div>
      <h1>Testing home</h1>
      <div className="testing-container">
        <h3>{`Player: ${userName}`}</h3>
        <img className="player-avatar" src={playerAvatar}></img>
        <h3>{`Player Level: ${totalLevel}`}</h3>
        <h3>{`Ranked at number: ${playerRank}`}</h3>
        <h3>{`Top ${playerPercent}% in kills`}</h3>
        <h3>{`All Time Kills: ${totalKills}`}</h3>
        <h3>{`Current Legend: ${legendName}`}</h3>
        <img src={legendPic}></img>
      </div>
    </div>
  );
}

export default Home;
