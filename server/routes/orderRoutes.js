const express = require('express')
const router = express.Router()

const {verifyLogin}=require('../middlewares/verifyLogin')
const {verifyAdmin} =require('../middlewares/verifyAdmin')


const {
  generateOrder, 
  getaOrder, 
  getOrderHistory, 

  orderList,
  updateOrder,
  deleteOrder

} = require('../controllers/orderController')

//orderRoutes

  /* =================================  USER SIDE  ===============================================================*/


router.post('/order/generate',verifyLogin, generateOrder)
router.get('/order/:id',verifyLogin, getaOrder)
router.get('/orders/history',verifyLogin, getOrderHistory)
 
/* =================================  ADMIN SIDE  ===============================================================*/


router.get('/admin/order/list',verifyLogin,verifyAdmin(), orderList)
router.put('/admin/order/update/:id', verifyLogin,verifyAdmin(),updateOrder)
router.delete('/admin/order/delete/:id', verifyLogin,verifyAdmin(),deleteOrder)



module.exports = router;