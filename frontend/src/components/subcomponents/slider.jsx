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
      <Link to="/dashboard/orders"><button>ORDERS</button></Link>
      <Link to="/dashboard/suggestions"><button>SUGGESTIONS</button></Link>
      <Link to="/"><button className='logoutbtn'>LOGOUT</button></Link>
     
      </div>
    </div>
  )
}

export default Slider
