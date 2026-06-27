import axios from "axios"; 
import { useState, useEffect } from "react";

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon...
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const days = [];
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, daysInPrevMonth - i),
      isCurrentMonth: false
    });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }
  
  return days;
}

function App() {

  // state vals for logs
  const [sleepHours, setSleepHours] = useState("");
  const [energyLevel, setEnergyLevel] = useState("");
  const [waterCups, setWaterCups] = useState("");
  const [fogLevel, setFogLevel] = useState("");
  const [logDate, setLogDate] = useState("");

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;

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
          fog: Number(fogLevel),
          date: Number(logDate)
        }
      );

      // for dev tools: on mac it's cmd+optn+I
      console.log(response.data);
      
      // Clean up after submission
      setSleepHours("");
      setEnergyLevel("");
      setWaterCups("");
      setFogLevel("");
      setLogDate("");
      await fetchLogs();
    } catch (error){
    console.error("Error when submitting daily log: ", error)
    }
  }

  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/daily-log");
      setLogs(response.data);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    }
  };

  // Call fetchLogs when component mounts
    useEffect(() => {
    fetchLogs();}, []);



  // async == takes time. allows for await, .get is for HTTP get request to the backend
    const pingBackend = async () =>{
    const res = await axios.get("http://127.0.0.1:8000/ping")

    // res.data = json backend response, res.status = http status code, res.headers = response headers
    // prints to browser console
    console.log(res.data);


  }

    // Add these with your other useState declarations
    const [currentDate, setCurrentDate] = useState(new Date());
    const [logsByDate, setLogsByDate] = useState({});

    // Replace your fetchLogs with a month-specific version
    const fetchLogsForMonth = async (year, month) => {
    try {
      const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
      const response = await axios.get(`http://127.0.0.1:8000/daily-log?month=${monthStr}`);
    
      // Convert array into a map: { "2026-06-15": { sleep: 8, ... }, ... }
      const map = {};
      response.data.forEach(log => {
        const dateObj = new Date(log.log_date);
        const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        map[key] = log;
      });
      setLogsByDate(map);
    } catch (error) {
      console.error("Failed to fetch month logs", error);
    }
  };

// Use useEffect to fetch when month/year changes
useEffect(() => {
  fetchLogsForMonth(currentDate.getFullYear(), currentDate.getMonth());
}, [currentDate]);
  return (
    // root container
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      
      {/* Wave Background*/}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
        <svg
          className="block w-[200%] h-64 animate-wave-horizontal"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          {/* Back wave (darkest, slowest) */}
          <path
            d="M0,40 C150,80 350,0 600,30 850,60 1050,20 1200,40 L1200,120 L0,120 Z"
            fill="#312e81"
            opacity="0.5"
            className="animate-wave-vertical-slow"
          />

          {/* Middle wave */}
          <path
            d="M0,50 C200,20 400,80 600,50 800,20 1000,80 1200,50 L1200,120 L0,120 Z"
            fill="#3730a3"
          opacity="0.7"
          className="animate-wave-vertical"
          />

          {/* Front wave (lightest) */}
          <path
            fill="#4338ca"
            className="animate-wave-morph"
            d="M0,70 C250,100 450,40 600,70 
              C750,100 950,40 1200,70
              C1450,100 1650,40 1800,70
              C1950,100 2150,40 2400,70
              L2400,120 L0,120 Z"
          />
        </svg>
      </div>

      {!isNight && (
        <>
          <div
            className="absolute top-30 right-20 w-24 h-24 rounded-full bg-orange-400 animate-pulse-glow"
          />
          <div
            className="absolute top-26 right-16 w-32 h-32 rounded-full bg-orange-400/30 animate-pulse-glow"

          />
        </>
      )}
      {isNight && (
        <div className="absolute top-24 right-16 w-24 h-24">
        <div className="relative w-full h-full rounded-full bg-indigo-200">
        <div className="absolute top-2 left-2 w-24 h-24 rounded-full bg-gray-900 " 
        />
        </div>
        </div>
      )}

      <div className="relative z-10 p-6 space-y-4">
      <div className="h-16 flex items-center justify-right bg-indigo-900 text-indigo-400 text-3xl">
        Tailwind is working! Welcome to 'Energy Tracker.'
      </div>
      <h1 className="text-3xl font-bold  text-indigo-400"> Energy Tracker.</h1>
      <h2 className="text-xl text-indigo-200">Coming soon.</h2>
      <h6 className="text-sm text-indigo-100">In the meantime...hello, world!</h6>
      <div className="relative z-10 p-6 space-y-4">
  {/* Month Navigator */}
  <div className="flex items-center justify-between">
    <button 
      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
      className="px-3 py-1 bg-indigo-600 rounded"
    >←</button>
    <h2 className="text-xl font-bold text-indigo-300">
      {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
    </h2>
    <button 
      onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
      className="px-3 py-1 bg-indigo-600 rounded"
    >→</button>
  </div>

  {/* Calendar Grid */}
  <div className="grid grid-cols-7 gap-1 text-center">
    {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <div key={d} className="text-indigo-400 font-bold text-sm">{d}</div>)}
    
    {getCalendarDays(currentDate.getFullYear(), currentDate.getMonth()).map((day, idx) => {
      const dateKey = `${day.date.getFullYear()}-${String(day.date.getMonth() + 1).padStart(2, '0')}-${String(day.date.getDate()).padStart(2, '0')}`;
      const log = logsByDate[dateKey];
      
      return (
        <div 
          key={idx} 
          className={`p-1 border border-indigo-700/30 min-h-[60px] ${!day.isCurrentMonth ? 'text-indigo-700' : 'text-white'}`}
        >
          <div className="text-xs">{day.date.getDate()}</div>
          {log && (
            <div className="mt-1 text-[10px] bg-orange-500/20 rounded p-1 text-orange-300">
              ⚡{log.energy} 💧{log.water}
            </div>
          )}
        </div>
      );
    })}
  </div>
  </div>
      
      {/* If button is clicked, call the pingBackend function. Entitle the button as 'ping backend' */}
      <button onClick ={pingBackend}className="px-4 py-2 bg-orange-500 text-white
      rounded-lgshadow-md hover:bg-orange-400 transition"
      >Ping backend</button>
      
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
  
      <input type="date" value={logDate} onChange={(e) => setLogDate(e.target.value)} />


      {/* After typing their states, the clicked button will send the info to the backend */}
      <button onClick={enterLog}className="px-4 py-2 bg-orange-500 text-white rounded-lg
      shadow-md hover:bg-orange-400 transition"
      > 
      Enter Daily Log
      </button>
    </div>
    </div>




);}

export default App;
