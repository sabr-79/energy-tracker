import axios from "axios"; 
import { useState } from "react";

function App() {

  // state vals for logs
  const [sleepHours, setSleepHours] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [waterCups, setWaterCups] = useState("");
  const [fogLevel, setFogLevel] = useState("");

  // const vs let: const is constant, let implies change
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

      // for dev tools: on mac it's cmd+optn+I
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
    // root container
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      
      {/* Wave Background*/}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
        <svg
          className="relative block w-[200%] h-64 animate-[wave_8s_linear_infinite]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Back wave (darkest, slowest) */}
          <path
            d="M0,40 C150,80 350,0 600,30 850,60 1050,20 1200,40 L1200,120 L0,120 Z"
            fill="#312e81"
            opacity="0.6"
          />

          {/* Middle wave */}
          <path
            d="M0,50 C200,20 400,80 600,50 800,20 1000,80 1200,50 L1200,120 L0,120 Z"
            fill="#3730a3"
          opacity="0.8"
          />

          {/* Front wave (lightest) */}
          <path
            d="M0,60 C250,90 450,30 600,60 750,90 950,30 1200,60 L1200,120 L0,120 Z"
            fill="#4338ca"
            />
          </svg>
      </div>

      <div
        className="
          absolute top-30 right-20 w-24 h-24 rounded-full bg-orange-400 
          animate-[pulse-glow_4s_ease-in-out_infinite]
          "
      />
      <div
        className="
          absolute top-26 right-16 w-32 h-32 rounded-full
          bg-orange-400/30 animate-[pulse-glow_4s_ease-in-out_infinite]
          "

      />
      <div className="relative z-10 p-6 space-y-4">
      <div className="h-16 flex items-center justify-right bg-indigo-900 text-indigo-400 text-3xl">
        Tailwind is working! Welcome to 'Energy Tracker.'
      </div>
      <h1 className="text-3xl font-bold  text-indigo-400"> Energy Tracker.</h1>
      <h2 className="text-xl text-indigo-200">Coming soon.</h2>
      <h6 className="text-sm text-indigo-100">In the meantime...hello, world!</h6>
      
      {/* If button is clicked, call the pingBackend function. Entitle the button as 'ping backend' */}
      <button onClick ={pingBackend}className="px-4 py-2 bg-orange-500 text-white
      rounded-lg
      shadow-md
      hover:bg-orange-400
      transition
      ">Ping backend</button>
      

      <h1>Daily Log</h1>

      {/*Input Fields,
      Where the user will type their stats
      to send to the backend.
      */}
      <div>
        <input
          type="number"
          placeholder="Hours slept"
          className="mt-2 px-3 py-2 rounded-md bg-indigo-700 text-white placeholder-indigo-400
          border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value = {sleepHours}
          onChange= {(e) => setSleepHours(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Energy level"
          className="mt-2 px-3 py-2 rounded-md bg-indigo-700 text-white placeholder-indigo-400
          border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value = {energyLevel}
          onChange= {(e) => setEnergyLevel(e.target.value)}
         />
      </div>
      <div>
        <input
          type="number"
          placeholder="Cups of water"
          className="mt-2 px-3 py-2 rounded-md bg-indigo-700 text-white placeholder-indigo-400
          border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value = {waterCups}
          onChange={(e) => setWaterCups(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="Fog level"
          className="mt-2 px-3 py-2 rounded-md bg-indigo-700 text-white placeholder-indigo-400
          border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          value = {fogLevel}
          onChange={(e) => setFogLevel(e.target.value)}
        />
      </div>

      {/* After typing their states, the clicked button will send the info to the backend */}
      <button onClick={enterLog}className="px-4 py-2 bg-orange-500 text-white rounded-lg
      shadow-md
      hover:bg-orange-400
      transition">
        Enter Daily Log
      </button>
    </div>
    </div>




  );
  
}

export default App;
