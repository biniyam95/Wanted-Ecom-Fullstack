const express = require('express')
const router= express.Router()

const {
  getProductList,
  addProduct,editProduct,deleteProduct,
  getAllProducts,getAProduct,
  
}= require('../controllers/productController')

const {verifyLogin} = require('../middlewares/verifyLogin')
const {verifyAdmin} = require('../middlewares/verifyAdmin')

const {uploadMulti} =require('../utils/multer') 

//productRoutes

  /* =================================  USER SIDE  ===============================================================*/

router.get('/allproducts',getAllProducts)
router.get('/product/:id',getAProduct) 


  /* =================================  ADMIN SIDE  ===============================================================*/
 
router.get('/admin/product/list', verifyLogin, verifyAdmin(), getProductList)
router.post('/admin/product/add',  verifyLogin, verifyAdmin(), uploadMulti, addProduct)
router.put('/admin/product/edit/:id', verifyLogin, verifyAdmin(),uploadMulti, editProduct)
router.delete('/admin/product/delete/:id', verifyLogin, verifyAdmin(), deleteProduct) 




module.exports=router 