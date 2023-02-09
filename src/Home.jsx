import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import "./home.css";

const apiUrl = process.env.REACT_APP_API_URL;

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
  const [isErr, setIsErr] = useState(false);

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
    let res = await axios.get(
      `${apiUrl}?plat=${user.platform}&user=${user.user}`
    );
    if (res.data.data) {
      setData(res.data);
    } else if (res.data.errors) {
      setErr(res.data.errors[0].message);
      setIsErr(true);
    }
    if (isErr) {
      setIsErr(false);
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    grabUser();
    try {
    } catch (error) {
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
        <div className="initial-container h-screen w-screen from-gray-900 to-gray-600 bg-gradient-to-r ">
          <div className="initial-form-container  h-full flex flex-col items-center space-y-8">
            <h1 className=" mt-20 mb-28 block text-white text-base md:text-2xl font-bold">
              Apex Stat Tracker
            </h1>
            <h2 className=" text-red-400">{err}</h2>
            <div className="form-container w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4  ">
              <form
                className="shadow-md rounded-xl p-8 space-y-4 flex flex-col border justify-evenly dark:bg-gray-800 dark:border-gray-700"
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
                    <option defaultValue="Select Platform">
                      Select Platform
                    </option>
                    <option value="xbl">Xbox</option>
                    <option value="psn">Playstation</option>
                    <option value="origin">Origin</option>
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
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* bg-gradient-to-br from-gray-900 to-gray-600 bg-gradient-to-r  */}
      {/* bg-gradient-to-tl from-cyan-900 via-green-600 to-green-500  */}
      <div
        className=" h-screen w-screen overflow-scroll flex flex-col space-y-28 
      from-gray-900 to-gray-600 bg-gradient-to-r
      "
      >
        <div className="pb-8 rounded-b-xl flex justify-center shadow-md bg-[]">
          <h1
            className="mt-8 block text-white text-base md:text-2xl 
          font-semibold text-center border py-2 px-4
          rounded-xl shadow-sm bg-[#6186ad]"
          >
            Apex Stats Tracker
          </h1>
        </div>
        <div className="home-container h-full flex flex-col items-center justify-center space-y-8">
          <div className="form-container w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4  ">
            <form
              className="shadow-md rounded-xl p-8 space-y-4 flex flex-col justify-evenly bg-[#d5dfd23f]"
              onSubmit={handleSubmit2}
            >
              <div className="input-wrapper">
                <label
                  htmlFor="role"
                  className="block text-white text-sm font-bold mb-2"
                />
                <select
                  className="flex-shrink-0 z-10 inline-flex items-center w-full py-2 px-3
                text-sm font-medium text-slate-500 text-center  border
                  rounded"
                  name="platform"
                  id="platform"
                  onChange={handleChange2}
                >
                  <option defaultValue="Select Platform">
                    Select Platform
                  </option>
                  <option value="xbl">Xbox</option>
                  <option value="psn">Playstation</option>
                  <option value="origin">Origin</option>
                </select>
              </div>
              <div className="input-wrapper">
                <label htmlFor="enter-user" />
                <input
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 
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
              {/* [#f26419] orange */}
              <button
                className="search-btn text-white bg-[#6186ad] hover:bg-[#4d6a88]
              font-medium
              rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                type="submit"
              >
                Search for player
              </button>
            </form>
          </div>
        </div>

        <div className="card-container grid gird-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 lg:gap-x-6 gap-x-4 gap-y-4 lg:gap-y-2 lg:col-span-3 place-items-center">
          <div className="w-9/12 h-full rounded-xl square aspect-w-1 aspect-h-1  shadow-lg p-4 bg-[#a0a69f30]">
            <div className=" flex flex-col justify-center ">
              <div className="img-container p-4 flex justify-center h-full w-full md:pt-10 lg:pt-10 xl:pt-10 ">
                <img
                  className="player-avatar object-center object-contain rounded-xl h-1/2 w-1/2  "
                  src={playerAvatar}
                ></img>
              </div>
              <div className="palyer-info h-full flex-col w-full flex justify-center items-center space-y-3 font-maven p-2 ">
                <p className=" p-3 block text-[#6186ad] text-base md:text-lg lg:text-2xl font-bold ">{`Player: ${userName}`}</p>
                <ul className="player-info-list text-white text-base md:text-base font-medium flex flex-col items-center">
                  <li className="rounded px-2">{`Player Level: ${totalLevel}`}</li>
                  <li className="rounded px-2">{`Ranked at number: ${playerRank}`}</li>
                  <li className="rounded px-2">{`Top ${playerPercent}% in kills`}</li>
                  <li className="rounded px-2">{`All Time Kills: ${totalKills}`}</li>
                </ul>
              </div>
            </div>
          </div>
          {/* bg-[#a0a69f] */}

          <div className="legend-card w-9/12 h-full rounded-xl square aspect-w-1 aspect-h-1  bg-[#a0a69f67] shadow-lg font-maven p-4 ">
            <div className="flex flex-col items-center">
              <p className="p-3 text-[#6186ad] text-base md:text-lg lg:text-2xl font-bold ">{`Current Legend: ${legendName}`}</p>
              <div className="img-container p-4 flex justify-center h-full w-full">
                <img
                  className=" legend-card-img object-center object-contain rounded-xl "
                  src={legendPic}
                ></img>
              </div>
            </div>
          </div>
        </div>
        <section className="footer h-1/6  "></section>
      </div>
    </div>
  );
}

export default Home;
