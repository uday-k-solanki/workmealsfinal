import React from 'react'
import "./tiles.css"
import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
const Tiles = () => {
  const [orders,setOrders]=useState(0)
  const [sales,setSales]=useState(0)
  const [employees,setEmployees]=useState(0)

    axios.post("http://localhost:8224/totalorders").then((response)=>{
          setOrders(response.data.totalorders)
  })
  axios.post("http://localhost:8224/totalsales").then((response)=>{
    setSales(response.data.totalsales)
  })
  axios.post("http://localhost:8224/totalemployees").then((response)=>{
    setEmployees(response.data.totalemployees)
  })


  return (
    <div className='tiles'>
      <div className='tile1'>
        <div className="heading">Total Orders</div>
        <div className="value">{orders}</div>
        <div className="moredetails"><Link to="/dashboard/orders">More Details</Link></div>
      </div>
      <div className='tile2'>
        <div className="heading">Total Sales</div>
        <div className="value">INR {sales}</div>
        <div className="moredetails"><Link to="/dashboard/sales">More Details</Link></div>
        </div>
      <div className='tile3'> <div className="heading">Employees</div>
        <div className="value">{employees}</div>
        <div className="moredetails"><Link to="/dashboard/employees">More Details</Link></div></div>
    </div>
  )
}

export default Tiles
