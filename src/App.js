import "./App.css";
import axios from "axios";
import Home from "./Home";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchInfo = async () => {
    const config = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "TRN-Api-Key": process.env.REACT_APP_API_KEY,
      },
    };
    const res = await axios.get(`v2/apex/standard/profile/xbl/taffi77`, config);
    console.log(res.data);
    setData(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInfo();
    console.log(data);
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("runing handle submit");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value)
    // setUserInfo({
    //   ...userInfo,
    //   [name]: value,
    // });
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="App">
      <div className="app-container"></div>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Search for player</button>
        </form>
      <Routes>
        <Route path="/" element={<Home data={data} />} />
      </Routes>
    </div>
  );
}

export default App;
