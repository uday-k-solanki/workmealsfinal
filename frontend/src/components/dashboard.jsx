import React from 'react'
import Navbar from "./subcomponents/navbar"
import Slider from "./subcomponents/slider"
import Tiles from "./subcomponents/tiles"

import List from "./subcomponents/list"
//import Emloyees from "./subcomponent/employees"
import "./dashboard.css"
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dcontainer">
    <div className="drow1"><Navbar/></div>
    <div className="drow2">
      <div className="dcol1"><Slider/></div>
      <div className="dcol2">
        <div className="dcol2-row1">
         <Tiles/> 
        </div>
          <div className="dcol2-row2">
           
            <div className="list">
            <List/>
            </div>
          </div>
      </div>
    </div>
    </div>
    </div>
    
  )
}

export default Dashboard
