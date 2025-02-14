import React from 'react'
import Navbar from "./subcomponents/navbar"
import Slider from "./subcomponents/slider"
import Tile from "./subcomponents/tile"
import Graph from "./subcomponents/graph"
import List from "./subcomponents/list"
import "./dashboard.css"
const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="container">
      <div class="row1"><Navbar/></div>
      <div class="row2">
        <div class="col1"><Slider/></div>
        <div class="col2">
            <div class="col2-row1"><Tile/></div>
            <div class="col2-row2">
                <div class="row2-col1"><Graph/></div>
                <div class="row2-col2"><List/></div>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Dashboard
