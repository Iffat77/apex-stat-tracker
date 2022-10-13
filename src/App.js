import './App.css';
import axios from 'axios';
import Home from "./Home";
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

const API_KEY = process.env.API_KEY

function App() {
  const [data, setData] = useState([]);

  
  useEffect(() => {
    const fetchPost = async () => {
       const response = await fetch(
         'v2/apex/standard/profile/xbl/taffi77', {
           method: 'GET',
           headers: {
             'Content-type': 'application/json; charset=UTF-8',
             'TRN-Api-Key': API_KEY,
             'Accept': 'application/json',
             'Accept-Encoding': 'gzip'
         },
          }
       );
       const data = await response.json();
      //  console.log(data);
       setData(data);
    };
    fetchPost();

 }, []);


  
//  let response = await fetch('https://jsonplaceholder.typicode.com/posts', {
//   method: 'POST',
//   body: JSON.stringify({
//      title: title,
//      body: body,
//      userId: Math.random().toString(36).slice(2),
//   }),
//   headers: {
//      'Content-type': 'application/json; charset=UTF-8',
//   },
// });
// let data = await response.json();
// setPosts((posts) => [data, ...posts]);
// setTitle('');
// setBody('');
// }; 
  
  
  
  
  return (
    <div className="App">
      <div className='app-container'>
       


      </div>

      <Routes>
        <Route path='/' element={<Home data={data} />} />
       </Routes>
    </div>
  );
}

export default App;
