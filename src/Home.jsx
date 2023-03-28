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
      let pic;
      let playerPic = data.data.platformInfo.avatarUrl;
      let playRank = null;
      let playPercentage = null;
      let kills = null;
      let errorHandler = null;
      let na = "N/A";

      let segArr = data.data.segments;

      for (let i = 1; i < segArr.length; i++) {
        if (segArr[i].metadata.name === legend) {
          pic = segArr[i].metadata.imageUrl;
        }
      }

      // ERROR HANDLING FOR IF FIELDS ARE N/A
      if (data.data.segments[0].stats.kills) {
        kills = data.data.segments[0].stats.kills.value;
        setTotalKills(kills);
      } else if (!data.data.segments[0].stats.kills) {
        kills = na;
        setTotalKills(kills);
      }
      if (data.data.segments[0].stats.rankScore.rank) {
        playRank = data.data.segments[0].stats.rankScore.rank;
        setPlayerRank(playRank);
      } else if (!data.data.segments[0].stats.rankScore.rank) {
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
  }, [data]);

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
    } catch (error) {}
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
        <div className="initial-container h-screen w-screen bg-black bg-[url(./assets/wp11307855.jpg)] bg-no-repeat bg-cover ">
          <div className="initial-form-container  h-full flex flex-col items-center space-y-8 backdrop-blur-md">
            <h1
              className="mt-8 mb-28 block text-white text-base md:text-2xl 
          font-semibold text-center border py-4 px-8
          rounded-xl shadow-sm bg-[#242e3a9d]"
            >
              Apex Stat Tracker
            </h1>
            <h2 className=" text-red-400">{err}</h2>
            <div className="form-container w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4  ">
              <form
                className="shadow-md rounded-xl p-8 space-y-4 flex flex-col border justify-evenly dark:bg-gray-800 dark:border-gray-700"
                onSubmit={handleSubmit2}
              >
                <div className="input-wrapper w-full ">
                  <label
                    htmlFor="role"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  />
                  <select
                    className="select w-full pr-3 text-center bg-[#242e3a9d] text-white"
                    name="platform"
                    id="platform"
                    onChange={handleChange2}
                  >
                    <option disabled selected defaultValue="Select Platform">
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
                    className="input input-bordered w-full text-center bg-[#242e3a9d] text-white"
                    id="user"
                    name="user"
                    placeholder="Enter Username"
                    type="text"
                    onChange={handleChange2}
                    autoComplete="on"
                  />
                </div>
                <button
                  className="btn w-full bg-orange-700 text-white hover:bg-red-800 "
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
    <div className="h-screen w-screen bg-[#04141e] bg-no-repeat bg-cover ">
      <div className=" h-screen w-screen overflow-scroll flex flex-col backdrop-blur-md">
        <div className="pb-8 flex justify-center ">
          <h1
            className="mt-8 block text-white text-base md:text-2xl 
          font-semibold text-center border py-4 px-8
          rounded-xl shadow-sm bg-[#242e3a9d]"
          >
            Apex Stats Tracker
          </h1>
        </div>
        <div className="home-container bg-[url(./assets/wp11307855.jpg)] bg-no-repeat bg-cover h-full flex flex-col items-center justify-center space-y-8 mb-8">
          <div className="w-full h-full backdrop-blur-md flex justify-center items-center">
            <div className="form-container  w-9/12 md:w-1/2 lg:w-1/3 xl:w-1/4  ">
              <form
                className="p-8 space-y-4 flex flex-col justify-evenly"
                onSubmit={handleSubmit2}
              >
                <div className="input-wrapper w-full ">
                  <label
                    htmlFor="role"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  />
                  <select
                    className="select w-full pr-3 text-center bg-[#242e3a9d] text-white"
                    name="platform"
                    id="platform"
                    onChange={handleChange2}
                  >
                    <option disabled selected defaultValue="Select Platform">
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
                    className="input input-bordered w-full text-center bg-[#242e3a9d] text-white"
                    id="user"
                    name="user"
                    placeholder="Enter Username"
                    type="text"
                    onChange={handleChange2}
                    autoComplete="on"
                  />
                </div>
                <button
                  className="btn w-full bg-orange-700 text-white hover:bg-red-800 "
                  type="submit"
                >
                  Search for player
                </button>
              </form>
            </div>
          </div>
        </div>

{/* end of form start of cards*/}

        <div className="card-container grid grid-cols-1 md:grid-cols-2 justify-items-center font-mono">
          <div className="player-card flex flex-col items-center justify-center ">
            <img
              className="player-avatar object-contain rounded-lg h-1/4 m-4 lg:h-1/4 "
              src={playerAvatar}
            ></img>

            <div className="text-slate-300 font-mono m-4 flex flex-col items-center justify-center">
              <h2 className="card-title m-2">{`Player : ${userName}`}</h2>

              <div className="stats bg-slate-800 text-slate-300 overflow-visible stats-vertical font-medium lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Level</div>
                  <div className="stat-value text-2xl">{totalLevel}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">Ranked at</div>
                  <div className="stat-value text-2xl">{playerRank}</div>
                </div>

                <div className="stat">
                  <div className="stat-title">All Time Kills</div>
                  <div className="stat-value text-2xl">{totalKills}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="legend-card flex flex-col justify-center items-center ">
            <h2 className="card-title m-2">{`Current Legend: ${legendName}`}</h2>
            <img className=" h-2/3 lg:h-1/2" src={legendPic}></img>
          </div>
        </div>
        <section className="footer h-1/6 mb-8 "></section>
      </div>
    </div>
  );
}

export default Home;
