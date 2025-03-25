import React from 'react'
import "./tiles.css"
const Tiles = () => {
  return (
    <div className='tiles'>
      <div className='tile1'>
        <div className="heading">Total Orders</div>
        <div className="value">100</div>
        <div className="moredetails">More Details</div>
      </div>
      <div className='tile2'>
        <div className="heading">Total Sales</div>
        <div className="value">13000</div>
        <div className="moredetails">More Details</div>
        </div>
      <div className='tile3'> <div className="heading">Employees</div>
        <div className="value">130</div>
        <div className="moredetails">More Details</div></div>
    </div>
  )
}

export default Tiles
