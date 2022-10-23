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
  const [err, setErr] = useState();
  const [isErr, setIsErr] = useState(false)
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
      let errorHandler = null;
      let na = "N/A";

      // ERROR HANDLING FOR IF FIELDS ARE N/A

      // if (error.response.data.errors[0].message) {
      //   console.log(error.response.data.errors[0].message)
      // }

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
    const res = await axios.get(`${url}${user.platform}${user.user}`, config)
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        console.log(error.response.data.errors[0].message)
        // console.log(error.response.status);
        // console.log(error.response.headers);
        setErr(error.response.data.errors[0].message)
        setIsErr(true)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
    if (isErr) {
      setIsErr(false)
    }
    console.log(err, 'here')
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


  if (isLoading || isErr) {
    return (
      <div className="App">
        <div className="initial-container h-screen w-screen bg-[#121827]">
          <div className="initial-form-container h-full flex flex-col items-center">
            <h1 className="mt-6 mb-28 block text-white text-base md:text-2xl font-bold">
              Apex Stat Tracker
            </h1>
            <h2 className=" text-red-400">{err}</h2>
            <form
              className="shadow-md rounded h-2/5 w-8/12 md:w-1/2 lg:w-1/4 px-4 lg:px-4 flex flex-col border justify-evenly dark:bg-gray-800 dark:border-gray-700"
              onSubmit={handleSubmit2}
            >
              <div className="input-wrapper">
                <label
                  htmlFor="role"
                  className="block text-white text-sm font-bold mb-2"
                >
                  Platform
                </label>
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
                  className="block text-white text-sm font-bold mb-2"
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
      <div className=" h-screen w-screen overflow-scroll bg-[#121827]">
        <div className="home-container overflow-y-scroll h-3/4 flex flex-col items-center space-y-8">
          <h1 className="mt-8 block text-white text-base md:text-2xl font-bold">
            Apex Stats Tracker
          </h1>
          <form
            className="shadow-md rounded h-2/5 w-8/12 md:w-1/2 lg:w-1/4 px-4 lg:px-4 flex flex-col border justify-evenly dark:bg-gray-800 dark:border-gray-700"
            onSubmit={handleSubmit2}
          >
            <div className="input-wrapper">
              <label
                htmlFor="role"
                className="block text-gray-700 text-sm font-bold mb-2"
              />
              <select
                className="flex-shrink-0 z-10 inline-flex items-center w-full py-2 px-3
                text-sm font-medium text-center text-gray-900 border
                 border-black rounded"
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
              <label htmlFor="enter-user" />
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
              font-medium
              rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
             dark:bg-blue-600 dark:hover:bg-blue-700"
              type="submit"
            >
              Search for player
            </button>
          </form>
        </div>


        <div className="card-container flex flex-col items-center space-y-8 overflow-y-scroll mb-8 ">
          <div className="rounded h-2/5 lg:h-3/5 w-3/5 md:w-1/2 lg:w-1/2 px-4 lg:px-4 flex flex-col md:flex-row lg:flex-row items-center border justify-evenly dark:bg-gray-800 dark:border-gray-700 space-x-4">
            <div className="img-container p-4 flex justify-center h-full w-full ">
              <img
                className="player-avatar object-cover rounded-md h-1/2 w-1/2 md:w-full"
                src={playerAvatar}
              ></img>
            </div>
            <div className="palyer-info w-full lg:h-1/3 p-2">
            <h3 className=" p-3 block text-white text-base md:text-xl lg:text-2xl font-bold ">{`Player: ${userName}`}</h3>
            <ul className="player-info-list block text-white text-base md:text-lg font-semibold">
              <li>{`Player Level: ${totalLevel}`}</li>
              <li>{`Ranked at number: ${playerRank}`}</li>
              <li>{`Top ${playerPercent}% in kills`}</li>
              <li>{`All Time Kills: ${totalKills}`}</li>
              </ul>
              </div> 
          </div>
          <div className="legend-card shadow-md rounded h-2/5 w-1/12 md:w-1/2 lg:w-1/2 px-4 lg:px-4 flex flex-col items-center border justify-evenly dark:bg-gray-800 dark:border-gray-700 ">
            <h3 className="p-3 block text-white text-base md:text-2xl font-bold">{`Current Legend: ${legendName}`}</h3>
            <div className="img-container h-3/4 w-3/4 ">
              <img classname="object-cover rounded-md" src={legendPic}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
