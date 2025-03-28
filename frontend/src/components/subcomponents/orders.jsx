import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import Slider from './slider';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './orders.css';


const Orders = () => {

     // Function to generate and download Excel file
     const downloadExcel = () => {
        if (orders.length === 0) {
            alert("No data to export!");
            return;
        }

        const worksheet = XLSX.utils.json_to_sheet(orders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        // Create a buffer and download file
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(data, "orders_report.xlsx");
    };

    const [orders,setOrders]=useState([])
    const [searchresult,setSearchresult]=useState([])
    const [click,setClick]=useState(false)
    const [empID,setempID]=useState('')
axios.post("http://localhost:8224/sendorders")
.then(res=>{
    setOrders(res.data.myorders)
})
.catch(err=>{
    console.log(err)
})


    


  return (

    <div>
      <div className="dashboard">
            <div className="container">
                <div className="row1">
                    <Navbar />
                </div>
                <div className="row2">
                    <div className="col1">
                        <Slider />
                    </div>
                    <div className="col2">
                        <div className="header">
                            <h1>All Orders</h1>
                            <button onClick={downloadExcel}>Download File</button>
                        </div>
                        <hr className="line" />
                        
                       

                        <div className="order-container">
            
                            <table className='order-table'>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Employee ID</th>
                                    <th>Order Date</th>
                                    <th>Total Amount</th>
                                    <th>Payment Status</th>
                                    <th>Payment Method</th>
                                   
                                    
                                </tr>
                                {orders.map((order)=>(
                                <tr>
                                    <td>{order.orderID}</td>
                                    <td>{order.employeeID}</td>
                                    <td>{order.dateTime}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>{order.paymentStatus}</td>
                                    <td>{order. paymentMethod}</td>
                                    
                                </tr>
                                ))}
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Orders
