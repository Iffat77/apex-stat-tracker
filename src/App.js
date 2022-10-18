import "./App.css";
import axios from "axios";
import Home from "./Home";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});

  const url = "v2/apex/standard/profile/";

  const fetchInfo = async () => {
    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "TRN-Api-Key": process.env.REACT_APP_API_KEY,
      },
    };
    const res = await axios.get(
      `v2/apex/standard/profile/psn/Daltoosh`,
      config
    );
    console.log(res.data);
    setData(res.data);
    setIsLoading(false);
  };

  const grabUser = async () => {
    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "TRN-Api-Key": process.env.REACT_APP_API_KEY,
      },
    };
    const res = await axios.get(`${url}${user.platform}${user.user}`, config);
    let newData = res.data;
    setData(newData);
    console.log(newData, "new data");
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInfo();
    console.log(data);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    grabUser();
    console.log(user);
    try {
      console.log("runing handle submit");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="App">
      <div className="app-container"></div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="role">Platform</label>
          <select
            className="Platform"
            name="platform"
            id="platform"
            onChange={handleChange}
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
            onChange={handleChange}
            autoComplete="on"
          />
        </div>
        <button className="search-btn" type="submit">
          Search for player
        </button>
      </form>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
