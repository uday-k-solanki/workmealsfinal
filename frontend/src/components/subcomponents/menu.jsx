import React, { useState } from "react";
import axios from "axios";
import Navbar from "../subcomponents/navbar";
import Slider from "../subcomponents/slider";
import "./menu.css";

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodImage, setFoodImage] = useState(null);
  const [category, setCategory] = useState("Breakfast");
  const [breakfast, setBreakfast] = useState([]);
  const [editopen,setEditopen]=useState(false)
  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
 const closeedit=()=>setEditopen(false)
  const [foodID,serFoodID]=useState('')
  const [errormsg,setErrormsg]=useState('')
  const handleFileChange = (e) => {
    setFoodImage(e.target.files[0]);
  };

  const addFoodItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("foodName", foodName);
    formData.append("foodPrice", foodPrice);
    formData.append("category", category);
    formData.append("foodImage", foodImage);

    try {
        const response = await axios.post("http://localhost:8224/addfood", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("Server Response:", response.data);
        alert("Food item added successfully!");
        setIsOpen(false)
    } catch (error) {
        console.error("Axios Error:", error.response?.data || error.message);
        alert("Error adding food item");
    }
}
//fetching breakfast items
function fetchbreakfast(){
axios.post("http://localhost:8224/fetchbreakfast")
.then(res=>
{
setBreakfast(res.data.mybreakfast)

})
.catch(err=>{console.log(err)})
}
//fetching lunch items
function fetchlunch(){
  axios.post("http://localhost:8224/fetchlunch")
  .then(res=>
  {
  setBreakfast(res.data.mylunch)
  
  })
  .catch(err=>{console.log(err)})
  }
  //fetching dinner
  function fetchdinner()
{
  axios.post("http://localhost:8224/fetchdinner")
  .then(res=>
  {
  setBreakfast(res.data.mydinner)
  
  })
  .catch(err=>{console.log(err)})
}
  //fetching dinner
  function fetchbvg()
{
  axios.post("http://localhost:8224/fetchbeverage")
  .then(res=>
  {
  setBreakfast(res.data.mybeverage)
  
  })
  .catch(err=>{console.log(err)})
}
//updatte item
function edititem(e)
{
  setEditopen(true)
  serFoodID(e.target.value)

}
//updating food item
function updateitem(e)
{
  e.preventDefault()
  axios.post("http://localhost:8224/updatefood",{foodName,foodPrice,foodID})
  .then(res=>{alert(res.data.message)
    setEditopen(false)
  })
  .catch(err=>console.log(err))
  
}
//deleting food item
function deleteitem(e)
{
  axios.post("http://localhost:8224/deletefood",{foodID})
  .then(res=>{alert(res.data.message)})
  .catch(err=>alert("error in deleting item"))
}

  return (
    <div className="dashboard">
      <div className="container">
        <div className="row1"><Navbar /></div>
        <div className="row2">
          <div className="col1"><Slider /></div>
          <div className="col2">
            <div className="header">
              
              <h1>Menu</h1>
              <button className="btn" onClick={openDialog}>Add Item</button>
            </div>
            <hr className="line" />
            <div className="options">
              <button onClick={fetchbreakfast}>Breakfast</button>
              <button onClick={fetchlunch}>Lunch</button>
              <button onClick={fetchdinner}>Dinner</button>
              <button onClick={fetchbvg}>Beverages</button>
            </div>
          
            {isOpen && (
                <>
                    <div className="overlay" onClick={closeDialog}></div>
                    <div className="inptcontainer">
                        <button className="close" onClick={closeDialog}>x</button>
                        <form onSubmit={addFoodItem} className="formfields">
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Beverage</option>
                            </select>
                            <input type="text" placeholder="Item Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                            <input type="number" placeholder="Item Price" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} required />
                            <input type="file" onChange={handleFileChange} required />
                            <button className="btn" type="submit">Add Item</button>
                        </form>
                    </div>
                </>
            )}
              {editopen && (
              <div className="inptcontainer">
                <button className="close" onClick={closeedit}>x</button>
                <form onSubmit={updateitem} className="formfields">
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Beverage</option>
                  </select>
                  <input type="text" placeholder="New Item Name" value={foodName} onChange={(e) => setFoodName(e.target.value)} required />
                  <input type="number" placeholder="NewItem Price" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} required />
                  <input type="file" onChange={handleFileChange} required />
                  <button className="btn" type="submit">Update Item</button>
                </form>
              </div>
            )}
            
            
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Item ID</th>
                                        <th>Name</th>
                                        <th>price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {breakfast.map((bf, index) => (
                                        <tr key={index}>
                                            <td>{bf.id}</td>
                                            <td>{bf.name}</td>
                                            <td>{bf.price}</td>
                                            <td>
                                                <button className='editbtn' id="editbtn" value={bf.id} onClick={(e)=>{edititem(e)}}>Edit</button>
                                                <button className="deletebtn" id="delbtn" value={bf.id} onClick={(e)=>deleteitem(e)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;