import React from 'react'
import Logo from "../../assets/workmeallogo.png"
import "./navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
     <div className="left"><img src={Logo}/><span>WorkMeals</span></div>
     <div className="right">
      <div className="date"><span>04:30 SUNDAY 09-02-2025</span></div> 
      <div className="userinfo">
        <span>user@123gmail.com</span>
        <div className="profilepic"></div>
      </div>
      </div>
    </div>
  )
}

export default Navbar
