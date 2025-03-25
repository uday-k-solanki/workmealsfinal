import React from 'react'
import {useState} from "react"

import "./login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [msg,setMsg]=useState('')

  const navigate=useNavigate();
  function handleSubmit(e)
  {
    e.preventDefault();
    axios.post("http://localhost:8224/login",{username,password})
    .then((res)=>
      {
     
        setMsg(res.data.message)
        if(res.data.message==="okay")
          {
           
            navigate("/dashboard")
          }
        
      })
    .catch(err=>console.log(err))
  

    
  }
  return (
    <div className="loginframe">
      <div className="box">
        <div className="logo"><span>WorkMeals</span></div>
        <div className="subheading"><span>ADMIN LOGIN</span></div>
        <form onSubmit={handleSubmit}>
        <div className="username">
        <i className='bx bxs-user'></i>
        <input type="text" id="uname" placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="password">
        <i className='bx bxs-lock-alt'></i>
        <input type="password" id="pwd" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <span className="msginfo">{msg}</span>
        <button className="loginbtn" id="loginbtn">LOGIN</button><br/>
        </form>
        <span ><a href="" className="fp">Forgot password?</a></span>
      </div>

    </div>
  )
}

export default Login
