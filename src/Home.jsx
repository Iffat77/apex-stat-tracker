import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./home.css";

function Home({ data }) {
  const { slug } = useParams()
  const [card, setCard] = useState();
  const [legendName, setLegendName] = useState();
  const [userName, setUserName] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserBySlug = async () => {
      setIsLoading(true)

      try {
        const config = {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "TRN-Api-Key": process.env.REACT_APP_API_KEY,
          },
        };
        const res = await axios.get(`v2/apex/standard/profile/xbl/${slug}`, config)
        if (res?.data) {
          
        }
      } catch {
        
      }

      setIsLoading(false)
    }
  }, [])


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
