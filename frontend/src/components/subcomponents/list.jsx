import React from 'react'
import "./list.css"
import axios from "axios"
import {useState} from "react"
const  List = () => {
  const [orderDetails,setOrderDetails]=useState([])
  axios.post("http://localhos:8224/sendcash")
  .then(res=>console.log(res.data.cashpayment))
  .catch(err=>console.log(err))
  return (
    <div className="list">
      <h1>Cash Payments</h1>
      <div className="table">
        <table>
          <tr>
            <th>EmployeeID</th>
            <th>orderID</th>
            <th>Amount</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
          <tr>
            <td>EMP112</td>
            <td>1122</td>
           
            <td>80</td>
            <td>pending</td>
          </tr>
 
        </table>
      </div>
    </div>
  )
}

export default List
