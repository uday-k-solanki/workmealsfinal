import React from 'react'
import Navbar from './navbar'
import Slider from './slider'
import './suggestions.css'
import axios from 'axios'
import {useState,useEffect} from 'react'
const Suggestions = () => {
    const [suggestions,setSuggestions]=useState([])
    
        axios.post("http://localhost:8224/sendsuggestions").then((response)=>{
            setSuggestions(response.data.mysuggestions)
        })

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
                            <h1>Food Suggestions</h1>
                        
                        </div>
                        <hr className="line" />
                        
                       

                        <div className="suggestions-container">
                            <table className='suggestions-table'>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Item Name</th>
                                    <th>Item Price</th>
                                    <th>Category</th>
                                </tr>
                                {suggestions.map((suggestion)=>(
                                    <tr>
                                        <td>{suggestion.employeeID}</td>
                                        <td>{suggestion.itemName}</td>
                                        <td>{suggestion.itemPrice}</td>
                                        <td>{suggestion.category}</td>
                                    </tr>
                                ))}
                            </table>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Suggestions
