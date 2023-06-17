const express=require('express')
const app=express();
const PDFDocument = require('pdfkit');
var mysql=require('mysql')
const path=require('path')
const cors=require('cors')
const bodyparser=require('body-parser')
const cookieparser=require('cookie-parser');
const multer=require("multer");
const jwt =require('jsonwebtoken')
const router = require('./ccc/routes/routes');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
    credentials: true,
  }));



var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root123",
    database:"register",
    insecureAuth : true
})
con.connect(function(err){
    if(err){
        console.log("Error connecting to db");
    }
    else{
        console.log("Connection established");
    }
})
app.listen(3001,(err)=>{
    if(err){
        console.log("Server failed to start")
    }
    else{
        console.log("Server started at port:3001")
    }
});
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
app.use(cookieparser());

const verifyUser=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.json({Message:"we need token please provied it."})
    }else{
        jwt.verify(token,"our-jwt-secret-key",(err,decoded)=>{
            if(err){
                return res.json({Message:"Authentication Error"})
            }else{
                req.name=decoded.name;
                next();
            }
        })
    }
}
//pdf 
// app.get('/store-data-in-pdf', verifyUser, (req, res) => {
//     const query = 'SELECT * FROM product5'; // Replace 'your_table' with the actual table name
//     con.query(query, (error, data) => {
//       if (error) {
//         console.error('Error retrieving data from MySQL:', error);
//         return res.json({ Message: 'Error retrieving data from MySQL' });
//       }
  
//       // Create a new PDF document
//       const doc = new PDFDocument();
  
//       // Format and add data to the PDF
//       data.forEach((row) => {
//         const formattedRow = Object.values(row).join('\t'); // Format the row as needed
//         doc.text(formattedRow);
//       });
  
//       // Generate the PDF and send it as a response
//       res.setHeader('Content-Type', 'application/pdf');
//       doc.pipe(res);
//       doc.end();
//     });
//   });


//login 
app.post('/login',(req,res)=>{
    const sql ="SELECT * FROM regi WHERE email =? AND password =?";
    con.query(sql,[req.body.email,req.body.password],(err,result)=>{
        if(err) return res.json({Message:"Error inside server"});
        if(result.length >0){
            const name=result[0].name;
            const token =jwt.sign({name},"our-jwt-secret-key",{expiresIn:'1d'});
            res.cookie('token',token);
            return res.json({Login:true})
        }else{
            return res.json({Login:false})
        }
    })
})
//new registration  
app.post("/register",(req,res)=>{
    const sql="INSERT INTO regi  (`name`,`email`,`password`)Values(?)";
    const values =[
        req.body.name,
        req.body.email,
        req.body.password,
    ];
    con.query(sql,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json({Status:"Success"})
    })
})
// app.use( express.static('public'));
//update get 
app.get('/edit/:id',(req,res)=>{
    const sql="select * from product5 where id=?";
    const id=req.params.id;
    con.query(sql,[id],(err,result)=>{
        if(err) return res.json({Error:err});
        return res.json(result);
    })
})
const storage=multer.diskStorage({
    destination:'./login/public/Product_images/',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload =multer({
    storage:storage,
})
//update the details 
app.put(`/update/:id`,upload.single('Product_image'),(req,res)=>{
    const sql="update product5 set `Product_Name`=? ,`Product_cost`=?,`Person_age`=?,`Order_date`=?,`Product_image`=? where id=?";
    const id=req.params.id; 
    con.query(sql,[req.body.Product_Name,req.body.Product_cost,req.body.Person_age,req.body.Order_date,req.file.filename, id],(err,result)=>{
        if(err)return res.json("Error");
        return res.json({updated:true})
    })
})

// POST route for simulating item deletion
app.post("/deleteItem", (req, res) => {
    const { id } = req.body;
    res.json({ message: "Item deleted successfully" });
  });
  
//home page 
app.get ('/main',verifyUser,(req,res)=>{
    return res.json({Status:"success",name:req.name})
     }) 

//viwe 
app.get("/view/:id",(req,res)=>{
    const {id}=req.params;
    const sql="select * from product5 where id=?";
    con.query(sql,id,(error,result)=>{
        if(error)return res.json({Message:"Error inside server"});
        return res.json(result);
    });
    
});

//logout 
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    return res.json({Status:"success"})
})

app.use(function(req,res,next){
    req.con=con;
    next();
})

app.use("/product",router)

module.exports=app;

