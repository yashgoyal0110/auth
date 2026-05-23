import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import axios from "axios"

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleLogin() {
    try {
      const loginData = await axios.post("http://localhost:3000/login", {
        "email": email, "password": password,
      },  {withCredentials: true})
      window.alert("login successfull")
    }
    catch (err) {
      console.log("login failed", err.message)
      window.alert("login failed")
    }
  }

  return (
    <>
      <input type="text" value={email}
      onChange={(e)=>setEmail(e.target.value)}></input>
      <input type="password" value={password}
      onChange={(e)=>setPassword(e.target.value)}></input>
      <button
        onClick={handleLogin}
      >login</button>
    </>
  )
}

export default App
