const express=require("express")
const cors=require("cors")
const mysql=require("mysql2")
const multer = require("multer");
const path = require("path");

const app = express();

// Configure CORS to allow access from any origin
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Configure static file serving for uploads
const uploadsPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));
console.log('Uploads directory path:', uploadsPath);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'))
    },
    filename: function (req, file, cb) {
        // Add timestamp to ensure unique filenames
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

//database connection
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"uk123",
    database:"workmeals"
})
db.connect(err=>
   {
    if(err)
    {
        console.log("database connection failed")
    }
    else
    {
        console.log("database connection successfull") 
    }
   }
)

//login

app.post("/login",(req,res)=>{

    const {username,password}=req.body;
    const sql="SELECT * FROM admin WHERE admin_username=? AND admin_password=?";
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error(" Database error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    
        console.log(" Query result:", result); // 
        if (result.length > 0) {
            console.log("User found, logging in...");
            res.status(200).json({ message: "okay" });
        } else {
            console.log(" Invalid credentials");
            res.json({ message: "Invalid username or password" });
        }
    });



    
})

//adding employee
app.post("/addemployee",(req,res)=>{
    const {empname,empemail,empcontact,empdpt}=req.body;
   
    const idquery="SELECT id FROM employees"
    db.query(idquery,(err,result)=>{
        if(err){
            console.log("error in id query")
        }
        else
        {
            const prevID=(result[result.length-1].id)
            const empID="EMP"+(prevID+1)
            const insertemp= `INSERT INTO employees (employeeID,employeeName,employeeEmail,employeePhone,employeeDepartment)
                              VALUES (?,?,?,?,?)` 
            const validatemobile="SELECT employeePhone FROM employees WHERE employeePhone=?"
            
            db.query(validatemobile,[empcontact],(err,result)=>{
                if(err)
                    {
                        console.log("error in insert query")
                    }
                    else
                    {
                        if(result.length>0)
                        {
                            return res.status(200).json({ validatenumber:false });
                        }
                        else
                        {
                            const validateemail="SELECT employeeEmail FROM employees WHERE employeeEmail=?"
                            db.query(validateemail,[empemail],(err,result)=>{
                                if(err)
                                {
                                    console.log("error in inserting query")
                                }
                               else
                               {
                                  if(result.length>0)
                                  {
                                    return res.status(200).json({validateemail:false});
                                  }
                                  else
                                  {
                                    db.query(insertemp,[empID,empname,empemail,empcontact,empdpt],(err,result)=>
                                    {
                                        if(err)
                                        {
                                            console.log("error in inserting query")
                                        }
                                        else
                                        {
                                            console.log("data inserted")
                                            return res.status(200).json({message:"inserted successfully"})
                                            
                                        }
                                    })
                                  }
                               }
                            })
                        }
    
                    }
            })
            
           
        }
    })
  
    
})

//add food item


// API to add food item
app.post("/addfood", upload.single('foodImage'), (req, res) => {
    console.log("Received Request:", req.body);
    console.log("Uploaded File:", req.file);

    const { foodName, foodPrice, category } = req.body;
    const foodImage = req.file ? req.file.filename : null;

    // Check if all fields are received
    if (!foodName || !foodPrice || !category || !foodImage) {
        console.log("Missing fields:", { foodName, foodPrice, category, foodImage });
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO food_menu (name, price, photo, category) VALUES (?, ?, ?, ?)";
    db.query(sql, [foodName, foodPrice, foodImage, category], (err, result) => {
        if (err) {
            console.error("Error adding food item:", err);
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json({ message: "Food item added successfully" });
    });
});

//send employees
app.post("/sendemployees",(req,res)=>{
    const fetchemp="SELECT * FROM employees"
    db.query(fetchemp,(err,result)=>{
        if(err){
            res.status(200).json({message:"error fetching data"})

        }
        else
        {
            res.status(200).json({myresult:result})
        }
    })
})
 
//delete employee
app.post("/deleteemployee",(req,res)=>{
    const { deletedemp } = req.body;
    console.log(deletedemp)
    const delquery="DELETE FROM employees WHERE employeeID=?"
    db.query(delquery,[deletedemp],(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in deleting employee"})
            console.log(err)
        }
        else
        {
            res.status(200).json({message:"employee deleted successfully"})
        }
    })
    
    
})

//update employee
app.post("/updateemp",(req,res)=>{
    const {empname,empemail,empcontact,empdpt,empID}=req.body;
    const validatemobile="SELECT employeePhone FROM employees WHERE employeePhone=?"
            
    db.query(validatemobile,[empcontact],(err,result)=>{
        if(err)
            {
                console.log("error in insert query")
            }
            else
            {
                if(result.length>0)
                {
                    return res.status(200).json({ validatenumber:false });
                }
                else
                {
                    const validateemail="SELECT employeeEmail FROM employees WHERE employeeEmail=?"
                    db.query(validateemail,[empemail],(err,result)=>{
                        if(err)
                        {
                            console.log("error in inserting query")
                        }
                       else
                       {
                          if(result.length>0)
                          {
                            return res.status(200).json({validateemail:false});
                          }
                          else
                          {
                            const updatequery="UPDATE employees SET employeeName=?,employeeEmail=?,employeePhone=?,employeeDepartment=? WHERE employeeID=?"
                        db.query(updatequery,[empname,empemail,empcontact,empdpt,empID],(err,result)=>{
                        if(err)
                         {
                            console.log(err)
                            console.log("error updating the record")
                            res.status(200).json({message:"error in updating employee"})
                        }
                        else
                        {
                            res.status(200).json({message:"employee updated."})
                        }
                            })
                          }
                       }
                    })
                }

            }
    })
    
   
})
//validate employee
app.post("/emplogin",(req,res)=>{
    const {emp}=req.body
    const sql="SELECT * FROM employees WHERE employeeID=?"
    db.query(sql,[emp],(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in validation"})
            console.log(err)
        }
        else
        {
            if(result.length>0)
            {
                res.status(200).json({valid:true})
            }
            else
            {
                res.status(200).json({message:"invalid employee ID"})
            }
        }
    })
})
//fetch breakfast
app.post("/fetchbreakfast",(req,res)=>
{
    let breakfast="SELECT * FROM food_menu WHERE category='Breakfast'"
    db.query(breakfast,(err,result)=>{
        if(err)
        {
            console.log("error fetching breakfast items")
        }
        else
        {
            
            res.status(200).json({mybreakfast:result})
        }
    })
})
//fetch lunch
app.post("/fetchlunch",(req,res)=>
    {
        let lunch="SELECT * FROM food_menu WHERE category='Lunch'"
        db.query(lunch,(err,result)=>{
            if(err)
            {
                console.log("error fetching lunch items")
            }
            else
            {
                
                res.status(200).json({mylunch:result})
            }
        })
    })
    //fetch dinner
    app.post("/fetchdinner",(req,res)=>
        {
            let dinner="SELECT * FROM food_menu WHERE category='Dinner'"
            db.query(dinner,(err,result)=>{
                if(err)
                {
                    console.log("error fetching dinner items")
                }
                else
                {
                   
                    res.status(200).json({mydinner:result})
                }
            })
        })
        //fetch beverages
        app.post("/fetchbeverage",(req,res)=>
            {
                let bvg="SELECT * FROM food_menu WHERE category='Beverage'"
                db.query(bvg,(err,result)=>{
                    if(err)
                    {
                        console.log("error fetching lunch items")
                    }
                    else
                    {
                       
                        res.status(200).json({mybeverage:result})
                    }
                })
            })
//update food item
app.post("/updatefood",(req,res)=>{
    const {foodName,foodPrice,foodID}=req.body
    const updatequery="UPDATE food_menu SET name=?,price=? WHERE id=?"
    db.query(updatequery,[foodName,foodPrice,foodID],(err,result)=>{
        if(err)
        {
            console.log("error updating the item")
            res.status(200).json({message:"error updating the item"})
        }
        else
        {
            res.status(200).json({message:"item updated"})
        }
    })
})
//delete food item
app.post("/deletefood",(req,res)=>{
    const {foodID}=req.body
    const delquery="DELETE FROM food_menu WHERE id=?"
    db.query(delquery,[foodID],(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in deleting item check connection"})
            console.log(err)
        }
        else
        {
            res.status(200).json({message:"item deleted successfully"})
            console.log("item deleted successfully") 
        }
    })
})
let orderDetails = {}; 
let message=""
//confirmcash
app.post("/confirmcash",(req,res)=>
{
     orderDetails=req.body
    console.log("cofirming order")
    console.log(orderDetails)
  
})

//getorder
app.post("/addorder",(req,res)=>{
     orderDetails=req.body
    console.log(orderDetails)
   
})
//send cash payment to dashboard
if(orderDetails!=="")
{
app.post("/sendcash", (req, res) => {
    res.status(200).json({ cashpayment: orderDetails });
    
});

}
//approve cash payment
let isPaymentApproved = ""; // Global variable to store approval status

// Route to Approve Cash Payment
app.post("/approvecash", (req, res) => {
    const {approved} = req.body;
    console.log(approved)
    if (approved===true) {
        console.log("dashboard response",{approved})
        isPaymentApproved = "true"; // Store the approval status
        res.status(200).json({ message: "Cash payment approved" });
        
    } else {
        isPaymentApproved=""
        res.status(400).json({ message: "Payment not approved" });
    }
});
console.log(isPaymentApproved)
// Separate Route for Checking Approval Status
app.post("/paymentapprove", (req, res) => {
   
    if (isPaymentApproved==="true") {
        message="okay"
        res.status(200).json({ message:message});
        console.log("Payment approved by dashboard")
        
        setTimeout(() => {
            orderDetails={}
            message = ""
            isPaymentApproved=""
        }, 3000);
        
    } else {
        isPaymentApproved=""
        res.status(200).json({ message:message });
        console.log("Payment not yet approved by dashboard")
    }

});

//oreder to database
app.post("/orderplaced",(req,res)=>{
 const finalorder=req.body
 const [{ employeeId, items, totalAmount, dateTime, token, paymentMethod, paymentStatus }] = finalorder;

// Convert items array to a JSON string (for SQL insertion)
const itemsJson = JSON.stringify(items);

console.log(employeeId, itemsJson, totalAmount, dateTime, token, paymentMethod, paymentStatus);
const insertorder="INSERT INTO orders (employeeID,items,totalAmount,dateTime,token,paymentMethod,paymentStatus) VALUES (?,?,?,?,?,?,?)"
db.query(insertorder,[employeeId,itemsJson,totalAmount,dateTime,token,paymentMethod,paymentStatus],(err,result)=>{
    if(err)
    {
        console.log("error in inserting order")
    }
    else
    {
        console.log("order inserted successfully")
    }
})
})
//get sales
//all
app.post("/getallsales",(req,res)=>{
    const fetchsales="SELECT * FROM orders"
    db.query(fetchsales,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching sales"})
            console.log(err)
        }
        else
        {
            res.status(200).json({mysales:result})
        }
    })
})
//get online payments
app.post("/getonlinepayments",(req,res)=>{
    const fetchonline="SELECT * FROM orders WHERE paymentMethod='Online'"
    db.query(fetchonline,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching online payments"})
            console.log(err)
        }
        else
        {
            res.status(200).json({onlinepayments:result})
        }
    })
        
})
//get cash payments
app.post("/getcashpayments",(req,res)=>{
    const fetchcash="SELECT * FROM orders WHERE paymentMethod='Cash'"
    db.query(fetchcash,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching cash payments"})
            console.log(err)
        }
        else
        {
            res.status(200).json({cashpayments:result})
        }
    })
})
//get salary deducts
app.post("/getsalarydeducts",(req,res)=>{
    const fetchsalary="SELECT * FROM orders WHERE paymentMethod='salary deduct'"
    db.query(fetchsalary,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching salary deducts"})
            console.log(err)
        }
        else
        {
            res.status(200).json({salarydeducts:result})
        }
    })
})

//send sales amounts
app.post("/sendsalesamounts", async (req, res) => {
    try {
        const fetchAllSales = "SELECT SUM(totalAmount) AS total_amount FROM orders;";
        const fetchOnlinePayments = "SELECT SUM(totalAmount) AS total_amount FROM orders WHERE paymentMethod='online'";
        const fetchCashPayments = "SELECT SUM(totalAmount) AS total_amount FROM orders WHERE paymentMethod='cash'";
        const fetchSalaryDeducts = "SELECT SUM(totalAmount) AS total_amount FROM orders WHERE paymentMethod='salary deduct'";

        // Execute all queries in parallel
        const [allSales, onlineSales, cashSales, salaryDeducts] = await Promise.all([
            db.promise().query(fetchAllSales),
            db.promise().query(fetchOnlinePayments),
            db.promise().query(fetchCashPayments),
            db.promise().query(fetchSalaryDeducts)
        ]);

        // Extract values from results
        res.json({
            totalSales: allSales[0][0].total_amount || 0,
            totalOnlineSales: onlineSales[0][0].total_amount || 0,
            totalCashSales: cashSales[0][0].total_amount || 0,
            totalSalaryDeducts: salaryDeducts[0][0].total_amount || 0
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching sales amounts", error: error.message });
    }
});
//send orders to orderpage
app.post("/sendorders",(req,res)=>{
    const fetchorders="SELECT * FROM orders"
    db.query(fetchorders,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching orders"})
        }
        else
        {
            res.status(200).json({myorders:result})
        }
    })
})
//add suggestions
app.post("/addsuggestions",(req,res)=>{
    const {emp,itemName,itemPrice,category}=req.body
    const insertsuggestion="INSERT INTO suggestions (employeeID,itemName,itemPrice,category) VALUES (?,?,?,?)"
    db.query(insertsuggestion,[emp.toUpperCase(),itemName,itemPrice,category],(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in adding suggestions"})
            console.log(err)
        }
        else
        {
            res.status(200).json({message:"suggestions added successfully"})
        }
    })
})
//send suggestions
app.post("/sendsuggestions",(req,res)=>{
    const fetchsuggestions="SELECT * FROM suggestions"
    db.query(fetchsuggestions,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching suggestions"})
            console.log(err)
        }
        else
        {
            res.status(200).json({mysuggestions:result})
        }
    })
})
//totalorder
app.post("/totalorders",(req,res)=>{
    const fetchtotalorders="SELECT COUNT(*) AS total_orders FROM orders"
    db.query(fetchtotalorders,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching total orders"})
            console.log(err)
        }
        else
        {
            res.status(200).json({totalorders:result[0].total_orders})
        }
    })
})
//total sales
app.post("/totalsales",(req,res)=>{
    const fetchtotalsales="SELECT SUM(totalAmount) AS total_sales FROM orders"
    db.query(fetchtotalsales,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching total sales"})
            console.log(err)
        }
        else
        {
            res.status(200).json({totalsales:result[0].total_sales})
        }
    })
})
//total employees
app.post("/totalemployees",(req,res)=>{
    const fetchtotalemployees="SELECT COUNT(*) AS total_employees FROM employees"
    db.query(fetchtotalemployees,(err,result)=>{
        if(err)
        {
            res.status(200).json({message:"error in fetching total employees"})
            console.log(err)
        }
        else
        {
            res.status(200).json({totalemployees:result[0].total_employees})
        }
    })  
})
//showorderhistory
app.post("/showorderhistory",(req,res)=>{
    const {emp}=req.body
    const gethistory="SELECT * FROM orders WHERE employeeID=?"
    db.query(gethistory,[emp],(err,result)=>{
        if(err)
        {
            console.log("error in fetching history")
        }
        else
        {
            res.status(200).json({myorderhistory:result})
        }
    })
})

//searching orders
app.post("/searchorder",(req,res)=>{
    const {empID}=req.body
    const search="SELECT * FROM orders WHERE employeeID=?"
    db.query(search,[empID],(err,result)=>{
        if(err)
        {
            console.log("error in fetching data")
        }
        else
        {
            console.log(result)
            res.status(200).json({searchedorders:result})
        }
    })
})
//listen
app.listen(8224,()=>

{
    console.log("server is listening at port 8223")
})

