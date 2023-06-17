const express=require("express");
const router=express.Router();
const multer=require("multer");
const controller=require("../controller/prod")
const path=require('path');
const { appendFile } = require("fs");


// store the file in give path
const storage=multer.diskStorage({
 
    destination:'./login/public/Product_images/',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
// image file upload 
const upload =multer({
    storage:storage,
    // fileFilter:function(req,file,cb){
    //     if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
    //         req.fileValidationError ='Only image files are allowed!';
    //         return cb(new Error('Only image files are allowed!'),false);
    //     }
    //     cb(null,true);
    // },
})

router.get('/products',controller.products)
router.post('/createproducts',upload.single('Product_image') ,controller.createproducts)
router.delete('/deleteProduct/:id' ,controller.deleteProduct)
// router.put('/updateProduct/:id',upload.single('Product_image'),controller.updateProduct)
// router.get('/getProduct/:id' ,controller.getProduct)
// router.post('/createlogins',controller.createlogins)

module.exports=router;