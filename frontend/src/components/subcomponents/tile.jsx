import React from 'react'
import "./tile.css"
const Tile = () => {
  return (
    <div className="tile">
      <div className="box1">
        <span id="orders">Orders</span>
        <h1>123</h1>
        <p>see orders</p>
      </div>
      <div className="box2">
      <span id="orders">sales</span>
        <h1>1230 INR</h1>
        <p>view sales</p>
      </div>
      <div className="box3">
      <span id="orders">Completed</span>
        <h1>120</h1>
        <p>order history</p>
      </div>
    </div>
  )
}

export default Tile
