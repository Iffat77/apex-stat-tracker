import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./home.css";

function Home() {
  const [legendName, setLegendName] = useState();
  const [userName, setUserName] = useState();
  const [totalLevel, setTotalLevel] = useState();
  const [totalKills, setTotalKills] = useState(null);
  const [legendPic, setLegendPic] = useState();
  const [playerAvatar, setPlayerAvatar] = useState();
  const [playerRank, setPlayerRank] = useState();
  const [playerPercent, setPlayerPercent] = useState();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const url = "v2/apex/standard/profile/";

  useEffect(() => {
    if (data) {
      let player = data.data.platformInfo.platformUserId;

      let legend = data.data.metadata.activeLegendName;
      let level = data.data.segments[0].stats.level.value;
      let pic = data.data.segments[1].metadata.imageUrl;
      let playerPic = data.data.platformInfo.avatarUrl;
      let playRank = null;
      let playPercentage = null;
      let kills = null;
      let na = "N/A";

      // ERROR HANDLING FOR IF FIELDS ARE N/A

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
        playPercentage = "N/A";
      }

      setUserName(player);
      setLegendName(legend);
      setUserName(player);
      setTotalLevel(level);
      setLegendPic(pic);
      setPlayerAvatar(playerPic);
      setPlayerRank(playRank);
      setPlayerPercent(playPercentage);
    }
  });

  const grabUser = async () => {
    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "TRN-Api-Key": process.env.REACT_APP_API_KEY,
      },
    };
    const res = await axios.get(`${url}${user.platform}${user.user}`, config);
    // console.log(res)
    setData(res.data);
    setIsLoading(false);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    grabUser();
    console.log(user);
    try {
      console.log("runing handle submit");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  if (isLoading) {
    return (
      <div className="App">
        <div className="initial-container h-screen w-screen ">
          <div className="initial-form-container h-full border flex flex-col items-center">
            <h1 className="mt-6 mb-28 block text-gray-700 text-base md:text-2xl font-bold">Apex Stat Tracker</h1>
            <form
              className="shadow-md rounded h-2/5 w-8/12 md:w-1/2 lg:w-1/4 px-4 lg:px-4 flex flex-col border justify-evenly"
              onSubmit={handleSubmit2}
            >
              <div className="input-wrapper">
                <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">Platform</label>
                <select
                  className="flex-shrink-0 z-10 inline-flex items-center w-full py-2 px-3
                  text-sm font-medium text-center text-gray-900 border
                   border-black rounded"
                  name="platform"
                  id="platform"
                  onChange={handleChange2}
                >
                  <option defaultValue="Select Platform">
                    Select Platform
                  </option>
                  <option value="xbl/">Xbox</option>
                  <option value="psn/">Playstation</option>
                  <option value="origin/">Origin</option>
                </select>
              </div>
              <div className="input-wrapper">
                <label
                  htmlFor="enter-user"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Enter Username
                </label>
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 
                  leading-tight text-sm font-medium text-center 
                  focus:outline-none focus:shadow-outline"
                  id="user"
                  name="user"
                  placeholder="Enter Username"
                  type="search"
                  onChange={handleChange2}
                  autoComplete="on"
                />
              </div>
              <button
                className="search-btn text-white bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
              rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
             dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Search for player
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="home-container bg-slate-400">
        <h1>Testing home</h1>
        <form className="form" onSubmit={handleSubmit2}>
          <div className="input-wrapper">
            <label htmlFor="role">Platform</label>
            <select
              className="Platform"
              name="platform"
              id="platform"
              onChange={handleChange2}
            >
              <option defaultValue="Select Platform">Select Platform</option>
              <option value="xbl/">Xbox</option>
              <option value="psn/">Playstation</option>
              <option value="origin/">Origin</option>
            </select>
          </div>
          <div className="input-wrapper">
            <label htmlFor="enter-user">enter-user</label>
            <input
              required
              id="user"
              name="user"
              type="textarea"
              onChange={handleChange2}
              autoComplete="on"
            />
          </div>
          <button className="search-btn" type="submit">
            Search for player
          </button>
        </form>
        <div className="user-card">
          <h3>{`Player: ${userName}`}</h3>
          <img className="player-avatar" src={playerAvatar}></img>
          <h3>{`Player Level: ${totalLevel}`}</h3>
          <h3>{`Ranked at number: ${playerRank}`}</h3>
          <h3>{`Top ${playerPercent}% in kills`}</h3>
          <h3>{`All Time Kills: ${totalKills}`}</h3>
        </div>
        <div className="legend-card">
          <h3>{`Current Legend: ${legendName}`}</h3>
          <img src={legendPic}></img>
        </div>
      </div>
    </div>
  );
}

export default Home;
