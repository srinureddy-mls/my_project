//display products

const products =async(req,res,next)=>{
    try{
        var db=req.con;
        let results= await db.query("Select*from product5",(error,rows)=>{
            if(error){
                console.log("Error ")
            }
            else{
                const data = rows.reverse();
                res.send({
                    status:"success",
                    message:"Successfully got list of products",
                     data:data
                })
            }
        })
    }
    catch(error){
       res.send({
        message:"an Error occured"
       })
    }
}
//create new products 
const createproducts = async (req, res, next) => {
    try {
      var db = req.con;
      var data = {
        Product_Name: req.body.Product_Name,
        Product_cost: req.body.Product_cost,
        Person_age: req.body.Person_age,
        Order_date: req.body.Order_date,
        Product_image: req.file.filename
      };
  
      let results = await db.query("INSERT INTO product5 SET ?", [data], (err, rows) => {
        if (err) {
          res.send({
            message: "An error occurred"
          });
        } else {
          res.json({
            message: "Successfully created products",
            status: "success"
          });
        }
      });
  
    } catch (error) {
      res.send({
        message: "An error occurred"
      });
    }
  };
  
// const createproducts=async(req,res,next)=>{
//     try {
//         var db=req.con;
//         var id=Math.floor(Math.random()*90000)+100000;
//         var data={
//             id:id,
//             Product_Name:req.body.Product_Name,
//             Product_cost:req.body.Product_cost,
//             Person_age:req.body.Person_age,
//             Order_date:req.body.Order_date,
//             Product_image:req.file.filename
//         }
       
//         let results=await db.query("insert into product5 set ?",[data],(err,rows,data,req)=>{
//             if(err){
//                 res.send({
//                     message:"An error occurred",
//                 })
//             }
//             else{
//                 res.json({
//                     message:"Successfully created products with id:"+id,
//                     status:"success",
//                 })   
//             }
//         });
      
//     } catch (error) {
//         res.send({
//         message:"an Error occured"
//        })
//     }
// };

// const createlogins=async(req,res,next)=>{
//     try {
//         var db=req.con;
//         var id=Math.floor(Math.random()*1)+1000;
//         var data={
//             id:id,
//             name:req.body.name,
//             email:req.body.email,
//             password:req.body.password,
           
//         }
       
//         let results=await db.query("insert into loginproduct set ?",[data],(err,rows,data)=>{
//             if(err){
//                 res.send({
//                     message:"An error occurred",
//                 })
//             }
//             else{
//                 res.json({
//                     message:"Successfully created products with id:"+id,
//                     status:"success",
                  
//                 })   
//             }
//         })
//     } catch (error) {
//         res.send({
//         message:"an Error occured"
//        })
//     }
// }
//delete Products from table and mysql database
const deleteProduct =async (req,res,next)=>{
    try{
        var db=req.con;
        var id=req.params.id;
        let results =await db.query('delete from product5 where id =?',id,function(err,row){
            if(err) throw err 
            else{
                res.send({
                    message:"Success"
                })
            }
        })
    }
    catch (error) {
        res.send({
        message:"an Error occured"
       })
    }
}


module.exports={products,createproducts,deleteProduct}