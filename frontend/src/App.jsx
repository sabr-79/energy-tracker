import axios from "axios"; 
import { useState } from "react";

function App() {

  // state vals for logs
  const [sleepHours, setSleepHours] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [waterCups, setWaterCups] = useState("");
  const [fogLevel, setFogLevel] = useState("");
  const enterLog = async () => {
    try{
      const response = await axios.post(
        "http://127.0.0.1:8000/daily-log",
        { 
          // type conversion 
          sleep: Number(sleepHours),
          energy: Number(energyLevel),
          water: Number(waterCups),
          fog: Number(fogLevel)
        }
      );
      console.log(response.data);
      // Clean up after submission
      setSleepHours("");
      setEnergyLevel("");
      setWaterCups("");
      setFogLevel("");
    } catch (error){
    console.error("Error when submitting daily log: ", error)
    }
  }
  




  // async == takes time. allows for await, .get is for HTTP get request to the backend
  const pingBackend = async () =>{
    const res = await axios.get("http://127.0.0.1:8000/ping")

    // res.data = json backend response, res.status = http status code, res.headers = response headers
    // prints to browser console
    console.log(res.data);


  }
  return (
    <div>
     <h1> Energy Tracker.</h1>
      <h2>Coming soon.</h2>
      <h6>In the meantime...hello, world!</h6>
      <button onClick ={pingBackend}>Ping backend</button>

      <br></br>

      <h1>Daily Log</h1>

      {/*Input Fields*/}
      <div>
        <input
          type="number"
          placeholder="Hours slept"
          value = {sleepHours}
          onChange= {(e) => setSleepHours(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Energy level"
          value = {energyLevel}
          onChange= {(e) => setEnergyLevel(e.target.value)}
         />
      </div>
      <div>
        <input
          type="number"
          placeholder="Cups of water"
          value = {waterCups}
          onChange={(e) => setWaterCups(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Fog level"
          value = {fogLevel}
          onChange={(e) => setFogLevel(e.target.value)}
        />
      </div>

      <button onClick={enterLog}>
        Enter Daily Log
      </button>
    </div>




  );
  
}

export default App;
