import React from 'react'
import "./login.css"
const Login = () => {
  return (
    <div className="loginframe">
      <div className="box">
        <div className="logo"><span>WorkMeals</span></div>
        <div className="subheading"><span>ADMIN LOGIN</span></div>
        <div className="username">
        <i class='bx bxs-user'></i>
        <input type="text" id="uname" placeholder='username'/>
        </div>
        <div className="password">
        <i class='bx bxs-lock-alt'></i>
        <input type="password" id="uname" placeholder='password'/>
        </div>
        <button className="loginbtn" id="loginbtn">LOGIN</button><br/>
        <span ><a href="" className="fp">Forgot password?</a></span>
      </div>

    </div>
  )
}

export default Login
