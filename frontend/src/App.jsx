import axios from "axios"; 

function App() {

  // async == takes time. allows for await, .get is for HTTP get request to the backend
  const pingBackend = async () =>{
    const res = await axios.get("http://127.0.0.1:8000/ping");

    // res.data = json backend response, res.status = http status code, res.headers = response headers
    // prints to browser console
    console.log(res.data);
  }
  return (
    <div>
      <title> Energy Tracker</title>
      <h1>Coming soon.</h1>
      <h6>In the meantime...hello world!</h6>
      <button onClick ={pingBackend}>Ping backend</button>
    </div>
    );
  
}

export default App;
