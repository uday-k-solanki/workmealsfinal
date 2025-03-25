import React from 'react'
import "./slider.css"
import {Link} from "react-router-dom"


const Slider = () => {
  
 
  return (
    <div className="slider">
      <div className="top">
        <Link to="/dashboard"><button>DASHBOARD</button></Link>
      </div>
      <div className="bottom">
      <Link to="/dashboard/employees"><button>EMPLOYEES</button></Link>
      <Link to="/dashboard/menu"><button>MENU</button></Link>
      <Link to="/dashboard/sales"><button>SALES</button></Link>
      <button>ORDERS</button>
      <button>PAYMENTS</button>
      <button>ORDER HISTORY</button>
     
      </div>
    </div>
  )
}

export default Slider
