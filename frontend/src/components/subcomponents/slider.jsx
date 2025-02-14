import React from 'react'
import "./slider.css"
const Slider = () => {
  return (
    <div className="slider">
      <div className="top">
        <button>DASHBOARD</button>
      </div>
      <div className="bottom">
      <button>EMPLOYEES</button>
      <button>MENU</button>
      <button>SALES</button>
      <button>ORDERS</button>
      <button>PAYMENTS</button>
      <button>ORDER HISTORY</button>
      <button>SETTINGS</button>
      </div>
    </div>
  )
}

export default Slider
