import React, { useState } from 'react';
import Navbar from "./navbar";
import Slider from "./slider";
import axios from "axios";
import "./employees.css";

const Employees = () => {
    const [empname, setEmpname] = useState('');
    const [empemail, setEmpemail] = useState('');
    const [empcontact, setEmpcontact] = useState('');
    const [empdpt, setEmpdpt] = useState('');
    const [validationmsg, setValidationmsg] = useState('');
    const [isopen, setIsopen] = useState(false);
    const [updateisopen,setUpdateisopen]=useState(false);
    const [employees,setEmployee]=useState([])
    //open and close update dialog
    
    const updatecloseDialog=()=>setUpdateisopen(false);
    // Open and Close Dialog Functions
    const openDialog = () => setIsopen(true);
    const closeDialog = () => setIsopen(false);

    // Email Validation
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    // Mobile Number Validation
    const validateMobile = (contact) => {
        const mobileRegex = /^[6-9]\d{9}$/;
        return mobileRegex.test(contact);
    };

    // Handle Employee Submission
    const addemployee = (e) => {
        e.preventDefault();

        if (!empname || !empemail || !empcontact || !empdpt) {
            setValidationmsg("Please fill all the fields");
        } else if (!validateEmail(empemail)) {
            setValidationmsg("Invalid email");
        } else if (!validateMobile(empcontact)) {
            setValidationmsg("Invalid mobile number");
        } else {
            setValidationmsg("");

            axios.post("http://localhost:8224/addemployee", { empname, empemail, empcontact, empdpt })
                .then((res) => {
                    setValidationmsg(res.data.message);
                    document.getElementById("errormsg").style.color = "green";

                    // Clear input fields after submission
                    setEmpname("");
                    setEmpemail("");
                    setEmpcontact("");
                    setEmpdpt("");
                    if(res.data.validatenumber===false)
                    {
                      document.getElementById("errormsg").style.color = "red";
                      setValidationmsg("number already exists")
                      setIsopen(true)
                    }
                    else
                    {
                      if(res.data.validateemail===false)
                      {
                        
                      document.getElementById("errormsg").style.color = "red";
                      setValidationmsg("email already exists")
                      setIsopen(true)
                      }
                      else
                      {
                        setTimeout(() => {
                            setIsopen(false);
                            setValidationmsg("");
                        }, 1000);
                      }
                    }
                })
                .catch((err) => {
                    console.error("Error:", err.response ? err.response.data : err.message);
                });
              
        }
        
    };
    //get employees
    axios.post("http://localhost:8224/sendemployees")
    .then(res=>{
        setEmployee(res.data.myresult)
        
    })
    .catch(err=>console.log("error in fetching data"))

    //deleting emp
    function deleteemp(e)
    {
        let deletedemp=e.target.value 
        
        axios.post("http://localhost:8224/deleteemployee",{deletedemp})
        .then(
            setTimeout(()=>{
                window.location.reload();
            },1000)
        )
        .catch(err=>console.log(err))
       
    }
    //edit emp
    const [empID,setEmpID]=useState('')
    function editemp(e)
    {
        setUpdateisopen(true)
        setEmpID(e.target.value)
    }
    //update emp
    function updateemp(e)
    {
       
       e.preventDefault();

       if (!empname || !empemail || !empcontact || !empdpt) {
           setValidationmsg("Please fill all the fields");
       } else if (!validateEmail(empemail)) {
           setValidationmsg("Invalid email");
       } else if (!validateMobile(empcontact)) {
           setValidationmsg("Invalid mobile number");
       } else {
           setValidationmsg("");

           axios.post("http://localhost:8224/updateemp", { empname, empemail, empcontact, empdpt,empID })
               .then((res) => {
                   setValidationmsg(res.data.message);
                   document.getElementById("errormsg").style.color = "green";

                   // Clear input fields after submission
                   setEmpname("");
                   setEmpemail("");
                   setEmpcontact("");
                   setEmpdpt("");
                   if(res.data.validatenumber===false)
                   {
                     document.getElementById("errormsg").style.color = "red";
                     setValidationmsg("number already exists")
                     setUpdateisopen(true)
                   }
                   else
                   {
                     if(res.data.validateemail===false)
                     {
                       
                     document.getElementById("errormsg").style.color = "red";
                     setValidationmsg("email already exists")
                     setUpdateisopen(true)
                     }
                     else
                     {
                       setTimeout(() => {
                        
                           setValidationmsg("");
                           setUpdateisopen(false);
                       }, 1000);
                     }
                   }
               })
               .catch((err) => {
                   console.error("Error:", err.response ? err.response.data : err.message);
               });
             
       }
       
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
                            <h1>Employees</h1>
                            <button className="addempbtn" onClick={openDialog}>Add Employee</button>
                        </div>
                        <div className="line"></div>
                        <div className="empcontainer">
                            {isopen && (
                                <>
                                    <div className="overlay" onClick={closeDialog}></div>
                                    <div className="inptcontainer" id="inptcontainer">
                                        <button className="close" onClick={closeDialog}>x</button>
                                        <form onSubmit={addemployee} className="formfields">
                                            <input type="text" placeholder="Employee name" value={empname} onChange={(e) => setEmpname(e.target.value)} />
                                            <input type="text" placeholder="Employee email" value={empemail} onChange={(e) => setEmpemail(e.target.value)} />
                                            <input type="text" placeholder="Employee phone" value={empcontact} onChange={(e) => setEmpcontact(e.target.value)} />
                                            <input type="text" placeholder="Employee department" value={empdpt} onChange={(e) => setEmpdpt(e.target.value)} />
                                            <button className="emp-sbmt-btn" type="submit">ADD</button>
                                            <span className="errormsg" id="errormsg">{validationmsg}</span>
                                        </form>
                                    </div>
                                </>
                            )}
                            {updateisopen && (
                                <>
                                    <div className="overlay" onClick={updatecloseDialog}></div>
                                    <div className="inptcontainer" id="inptcontainer">
                                        <button className="close" onClick={updatecloseDialog}>x</button>
                                        <form onSubmit={updateemp} className="formfields">
                                            <input type="text" placeholder="new Employee name" value={empname} onChange={(e) => setEmpname(e.target.value)} />
                                            <input type="text" placeholder="new Employee email" value={empemail} onChange={(e) => setEmpemail(e.target.value)} />
                                            <input type="text" placeholder="new Employee phone" value={empcontact} onChange={(e) => setEmpcontact(e.target.value)} />
                                            <input type="text" placeholder="new Employee department" value={empdpt} onChange={(e) => setEmpdpt(e.target.value)} />
                                            <button className="emp-sbmt-btn" type="submit">UPDATE</button>
                                            <span className="errormsg" id="errormsg">{validationmsg}</span>
                                        </form>
                                    </div>
                                </>
                            )}
                            <div className="listcontainer">
                            <table>
                                <thead>
                                  <tr>
                                  <th>Employee ID</th>
                                     <th>Name</th>
                                     <th>Email</th>
                                        <th>Phone</th>
                                    <th>Department</th>
                                    <th>Actions</th>
                                                </tr>
                                                     </thead>
                                                    <tbody>
                                        {employees.map((emp, index) => (
                                         <tr key={index}>
                                      <td>{emp.employeeID}</td>
                                        <td>{emp.employeeName}</td>
                                     <td>{emp.employeeEmail}</td>
                                    <td>{emp.employeePhone}</td>
                                     <td>{emp.employeeDepartment}</td>
                                     <td><button className='editbtn'id="editbtn" value={emp.employeeID} onClick={(e)=>{editemp(e)}}>Edit</button> <button className="deletebtn" id="delbtn" value ={emp.employeeID} onClick={(e)=>deleteemp(e)}>Delete</button></td>
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

export default Employees;