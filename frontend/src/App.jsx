import axios from "axios"; 

function App() {
  const pingBackend = async () =>{
    const res = await axios.get("http://127.0.0.1:8000/ping");

    console.log(res.data);
  }
  return (
    <div>
      <h1>Hello, world!</h1>
      <button onClick ={pingBackend}>Ping backend</button>
    </div>
    );
  
}

export default App;
