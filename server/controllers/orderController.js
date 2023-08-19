const orderCollection = require('../models/orderModel')
const productCollection = require('../models/productModel')

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

module.exports = {

  /* =================================  USER SIDE  ===============================================================*/
  
  //generate order
  generateOrder: catchAsyncErrors(async (req, res, next) => {
                 
                  const { orderedItems,addressInfo,totalPrice,tax,shippingCharge,grandTotal } = req.body;
                 
                  const newOrder = await orderCollection.create({
                                  orderedItems,addressInfo,totalPrice,tax,shippingCharge,grandTotal,
                                  paidAt: Date.now(),
                                  userId: req.userData._id
                                 })

                  res.status(200).json({
                      success: true,
                      newOrder
                   })
                }),
  
  // Get single order   
    getaOrder :   catchAsyncErrors(async (req, res, next)=>{ 
                  const aOrder = await orderCollection.findById(req.params.id).populate('userId', 'name email')//Populate-> additionally insert name and email of the user from user collection to the order fetched using userId in order collection
                  console.log(aOrder,"aOrder inside contreoller23232")
                  if (!aOrder) return next(new ErrorHandler('No Order found with this ID', 404))
                  
                  res.status(200).json({
                      success: true,
                      aOrder
                    })
                  }),

  // Get order history in profile  
  getOrderHistory : catchAsyncErrors(async (req, res, next)=>{ 
                     console.log(req.userData._id,"userdata user id from req")
                     const orderHistory = await orderCollection.find({ userId : req.userData._id })

                     res.status(200).json({
                         success: true,
                         orderHistory
                     })
                   }),

/* =================================  ADMIN SIDE  ===============================================================*/

  // Get all orders     
  orderList :   catchAsyncErrors(async (req, res, next)=>{ 
                const orderList = await orderCollection.find()
                
                let totalSpent = 0;

                orderList.forEach(item => {
                  totalSpent += item.grandTotal
                })

                res.status(200).json({
                    success: true,
                    totalSpent,
                    orderList
                })
   
               }),

              

  // Get update status to delivered and stock of an order    =>   /api/v1/admin/order/update/:id 
  updateOrder :  catchAsyncErrors(async (req, res, next)=>{ 
                  const aOrder = await orderCollection.findById(req.params.id) //orderId is params.id here

                  //if the order is already delivered , we should disable the button to update.-this is just incase that button doesnt disable
                  if (aOrder.orderStatus === 'Delivered') {
                      return next(new ErrorHandler('You have already delivered this order', 400))
                  }
                  if(req.body.status==='Delivered'){
                    aOrder.orderedItems.forEach(async item => {
                        await decreaseStock(item.prodId, item.quantity)   
                    })
                  }
                  
                  

                  aOrder.orderStatus = req.body.status 
                  
                  if(req.body.status==='Delivered'){
                    aOrder.deliveredAt = Date.now() 
                  }   

                  await aOrder.save()

                  res.status(200).json({
                      success: true, 
                      updatedOrder:aOrder
                  })
   
               }),

  // Delete order   
  deleteOrder : catchAsyncErrors(async (req, res, next) => {
                const aOrder = await orderCollection.findById(req.params.id)

                if (!aOrder) {
                    return next(new ErrorHandler('No Order found with this ID to delete', 404))
                }

                await aOrder.deleteOne()   

                res.status(200).json({
                    success: true
                })
              })

        


}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//update stock


async function decreaseStock(productId, quantity) {
  const aProduct = await productCollection.findById(productId);

  aProduct.stock = aProduct.stock - quantity;

  await aProduct.save({ validateBeforeSave: false }) 
}

