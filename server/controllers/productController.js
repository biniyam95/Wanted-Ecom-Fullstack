const productCollection = require("../models/productModel")
//errorHandler and async errorhandler
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors= require('../middlewares/catchAsyncErrors')

//api features
const ApiFeatures=require('../utils/apiFeatures')




module.exports = {

  /* =================================  USER SIDE  ===============================================================*/
  
  //get all products=> 
  getAllProducts: catchAsyncErrors(async (req, res, next) => {
                 
                   const prodPerPage = 4;
                   const prodCount = await productCollection.countDocuments()

    
    
                  const apiFeatures = new ApiFeatures(productCollection.find(),req.query) .search() .filter() .pagination(prodPerPage)
    
                  const allProducts = await apiFeatures.query; 
                  const filteredProdCount=allProducts.length
                 
                  res.status(200).json({
                    success: true,
                    allProducts,
                    prodCount,
                    prodPerPage,
                    filteredProdCount
                  })
                }),
  
  getAProduct: catchAsyncErrors(async (req, res, next) => {
                    const aProduct = await productCollection.findById(req.params.id);
                    
                    if (!aProduct) {
                      return next(new ErrorHandler('Product not found', 404))
                    }
                    res.status(200).json({
                      success: true,
                      aProduct,
                    })
                  }),
  /* =================================  ADMIN SIDE  ===============================================================*/
  
  getProductList: catchAsyncErrors(async (req, res, next) => {
                  const productList = await productCollection.find();

                  res.status(200).json({
                    success: true,
                    productList,
                   })
                 }),
  
  //Add new product (ADMIN)
  addProduct: catchAsyncErrors(async (req, res, next) => {           
             req.body.productImages = req.body.prodImgs

              const newProduct = await productCollection.create(req.body);
              res.status(201).json({
                  success: true,
                  newProduct,
                })
              }),
  
  //Edit product (ADMIN)
  editProduct: catchAsyncErrors(async (req, res, next) => {
                if(req.body.prodImgs){
                  req.body.productImages = req.body.prodImgs
                }
               const updatedProduct =await productCollection.findByIdAndUpdate(req.params.id, req.body,{new:true,runValidators:true,useFindAndModify:true})
               
               if (!updatedProduct) {
                return next(new ErrorHandler('Product not found', 404));
               }

               res.status(200).json({
                 success: true,
                 updatedProduct
               })
             }),

  deleteProduct: catchAsyncErrors(async(req, res, next) => {
                 const deletedProduct= await productCollection.findById(req.params.id)
                  
                  if (!deletedProduct) {
                    return next(new ErrorHandler('Product not found', 404))
                  }
                  await deletedProduct.deleteOne() 
                  
                  res.status(200).json({
                        success: true,
                        deletedProduct,
                        message:'Product is deleted'
                      })

                }),



};
