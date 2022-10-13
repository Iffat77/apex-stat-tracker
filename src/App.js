import "./App.css";
import axios from "axios";
import Home from "./Home";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isLoading, setIsLoading]= useState(true)
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

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }
  return (
    <div className="App">
      <div className="app-container"></div>

      <Routes>
        <Route path="/" element={<Home data={data} isLoading={isLoading} />} />
      </Routes>
    </div>
  );
}

export default App;
