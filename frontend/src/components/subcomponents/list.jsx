import React, { useState, useEffect } from "react";
import axios from "axios";
import "./list.css";

const List = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [approved, setApproved] = useState(false);

  // Fetch order details when the component mounts
  useEffect(() => {
    axios
      .post("http://localhost:8224/sendcash")
      .then((res) => {
        setOrderDetails(res.data.cashpayment);
      })
      .catch((err) => console.log(err));
  }, []); // Empty dependency array ensures this runs only once

  const handleApprove = () => {
    alert("Approved");
    setApproved(true);
    
    axios
      .post("http://localhost:8224/approvecash", { approved: true })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="list">
      <h1>Cash Payments</h1>
      {orderDetails ? (
        <div className="table">
          <table>
           
              <tr>
                <th>EmployeeID</th>
                <th>OrderID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
     
            
              <tr>
                <td>{orderDetails.employeeID}</td>
                <td>{orderDetails.orderID}</td>
                <td>{orderDetails.amount}</td>
                <td>{orderDetails.status}</td>
                <td>
                  <button id="approve-button" onClick={handleApprove}>
                    Approve
                  </button>
                </td>
              </tr>
            
          </table>
        </div>
      ) : (
        <h3>No cash payments to approve</h3>
      )}
    </div>
  );
};

export default List;
