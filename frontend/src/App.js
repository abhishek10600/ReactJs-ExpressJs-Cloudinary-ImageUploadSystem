import { useState } from 'react';
import './App.css';
import axios from "axios";
import FormData from "form-data";

function App() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState([]);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData();
    formData.append("message", message);
    formData.append("sampleFile", image[0]);
    const res = await axios.post("http://localhost:4000/upload", formData, {
      header: {
        "Content-Type": "multipart/form-data"
      }
    })
    console.log(res);
  }
  return (
    <div className="App">
      <h1>React-Express-FileUpload</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={(ev) => setMessage(ev.target.value)} />
        <input type="file" name="sampleFile" onChange={(ev) => setImage(ev.target.files)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
