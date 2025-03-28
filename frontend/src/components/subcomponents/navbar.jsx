import React from 'react'
import Logo from "../../assets/workmeallogo.png"
import "./navbar.css"
import {Link} from "react-router-dom"
import { useState,useEffect } from 'react'

const Navbar = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Get hours, minutes, and determine AM/PM
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      
      // Convert to 12-hour format
      hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      
      // Format hours with leading zero
      const formattedHours = hours.toString().padStart(2, "0");

      // Get the day name (e.g., Sunday)
      const dayName = now.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();

      // Format the date (DD-MM-YYYY)
      const date = now.getDate().toString().padStart(2, "0");
      const month = (now.getMonth() + 1).toString().padStart(2, "0");
      const year = now.getFullYear();

      // Combine into the final format
      const formattedTime = `${formattedHours}:${minutes} ${ampm} ${dayName} ${date}-${month}-${year}`;

      setTime(formattedTime);
    };

    updateTime(); // Initial call
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, []);
  return (
    <div className="navbar">
     <div className="left"><img src={Logo}/><span>WorkMeals</span></div>
     <div className="right">
      <div className="date"><span>{time}</span></div> 
      <div className="userinfo">
        <span>Maitri</span>
        <div className="profilepic">M</div>
        
      </div>
      </div>
    </div>
  )
}

export default Navbar
