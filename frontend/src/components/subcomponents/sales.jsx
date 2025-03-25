import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar';
import Slider from './slider';
import './sales.css';

const Sales = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [salesData, setSalesData] = useState([]);
    const [totalSales, setTotalSales] = useState(0);

    const openDialog = () => setIsOpen(true);
    const closeDialog = () => setIsOpen(false);

    const handleGenerateReport = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8224/getsales', {
                startDate,
                endDate
            });
            setSalesData(response.data.sales || []);
            setTotalSales(response.data.totalSales || 0);
            setIsOpen(false);
        } catch (error) {
            console.error('Error fetching sales data:', error);
            alert('Error generating sales report');
        }
    };

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
                            <button className="btn" onClick={openDialog}>
                                Generate Report
                            </button>
                        </div>
                        <hr className="line" />
                        
                        {isOpen && (
                            <>
                                <div className="overlay" onClick={closeDialog}></div>
                                <div className="inptcontainer">
                                    <button className="close" onClick={closeDialog}>×</button>
                                    <form onSubmit={handleGenerateReport}>
                                        <div className="formfields">
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                required
                                            />
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className="btn">
                                                Generate
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}

                        <div className="sales-container">
                            <div className="listcontainer">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Date</th>
                                            <th>Customer</th>
                                            <th>Items</th>
                                            <th>Total Amount</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {salesData.map((sale) => (
                                            <tr key={sale.orderId}>
                                                <td>{sale.orderId}</td>
                                                <td>{new Date(sale.date).toLocaleDateString()}</td>
                                                <td>{sale.customer}</td>
                                                <td>{sale.items.join(', ')}</td>
                                                <td>₹{sale.totalAmount}</td>
                                                <td>{sale.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {salesData.length > 0 && (
                                <div className="total-sales">
                                    <h2>Total Sales: ₹{totalSales}</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sales; 