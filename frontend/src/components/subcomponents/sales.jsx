import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Slider from './slider';
import './sales.css';

const Sales = () => {

    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [onlinePayments, setOnlinePayments] = useState(0);
    const [cashPayments, setCashPayments] = useState(0);
    const [salaryDeducts, setSalaryDeducts] = useState(0);

    axios.post("http://localhost:8224/sendsalesamounts")
    .then(res=>{
      setOnlinePayments(res.data.totalOnlineSales)
      setCashPayments(res.data.totalCashSales)
      setSalaryDeducts(res.data.totalSalaryDeducts)
      setTotalSales(res.data.totalSales)
    })
    .catch(err=>{
        console.log(err)
    })
    function getAllSales()
    {
    axios.post("http://localhost:8224/getallsales")
    .then(res=>{
        setSalesData(res.data.mysales)
      
    })
    .catch(err=>{
        console.log(err)
    })
}

    function getOnlinePayments()
    {
      
       
        axios.post("http://localhost:8224/getonlinepayments")
        .then(res=>{
            console.log(res.data.onlinepayments)
            setSalesData(res.data.onlinepayments)
       
        })
        .catch(err=>{
            console.log(err)
        })
    }
    function getCashpayments()
    {
        axios.post("http://localhost:8224/getcashpayments")
        .then(res=>{
           
            setSalesData(res.data.cashpayments)
      
        })
        .catch(err=>{
            console.log(err)
        })
    }   
    function getSalaryDeducts()
    {
        axios.post("http://localhost:8224/getsalarydeducts")
        .then(res=>{
            setSalesData(res.data.salarydeducts)
         
        })
        .catch(err=>{
            console.log(err)
        })
    }
  
    return (
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
                            <h1>Sales Report</h1>
                        
                        </div>
                        <hr className="line" />
                        
                       

                        <div className="sales-container">
                            <div className="headerbox">
                            <div className="boxofsales">
                                
                                <span className="box-title">Online Payments: ₹{onlinePayments}</span>
                                <span className="box-title">Cash Payments: ₹{cashPayments}</span>
                                <span className="box-title">Salary Deducts: ₹{salaryDeducts}</span>
                                <span className="box-title">Total Sales: ₹{totalSales}</span>

                            </div>
                            <div className="salesactions">
                                <div className="buttonactions">
                                <button className="actionbutton active" onClick={getAllSales}>All</button>
                                    <button className="actionbutton" onClick={getOnlinePayments}>Online Payments</button>
                                    <button className="actionbutton" onClick={getCashpayments}>Cash Payments</button>
                                    <button className="actionbutton" onClick={getSalaryDeducts}>Salary Deducts</button>
                                </div>
                            </div>
                            </div>
                            <div className="listcontainer">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salesData.map((sale) => (
                                            <tr key={sale.orderID}>
                                                <td>{sale.orderID}</td>
                                                <td>{sale.dateTime}</td>
                                                <td>{sale.employeeID}</td>
                                                <td>₹{sale.totalAmount}</td>
                                                <td>{sale.paymentStatus}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sales; 