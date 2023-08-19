//errorHandler and async errorhandler
const ErrorHandler=require('../utils/errorHandler')
const catchAsyncErrors= require('../middlewares/catchAsyncErrors')

const sendTokenToCookie =  require('../utils/sendTokenToCookie')

const userCollection = require("../models/userModel");


module.exports = {
  /* =================================  USER SIDE  ===============================================================*/
  
  signup: catchAsyncErrors(async (req, res, next) => {
          const {name,email,password,role} = req.body
          
          const newUser = await userCollection.create({name,email,password,role})
         
          //generate a new token and send to store in cookie
          sendTokenToCookie(newUser,201,res)  
        
        }),

  login:  catchAsyncErrors(async (req, res, next) => {
       console.log(req.body,'87878787')
          const {email,password} = req.body
          
          
          if (!email || !password) 
              return next(new ErrorHandler('Please enter email & password', 400))
          
         
          const userExist= await userCollection.findOne({email:email}).select('+password')
          if (!userExist) 
              return next(new ErrorHandler('email doesnt exist in db', 401))
          
        
          const isPassMatch=  await userExist.comparePassword(password)
          if (!isPassMatch)
              return next(new ErrorHandler('wrong password', 401))
          
          
          sendTokenToCookie(userExist,200,res)   
          
          }),
  
  logout :  catchAsyncErrors(async (req, res, next) => {
           
            res.cookie('token', null, {expires: new Date(Date.now()), httpOnly: true})
            
            res.status(200).json({
                success: true,
                message: 'Logged out'
              })
            
            
            }),


  profile :  catchAsyncErrors(async (req, res, next) => {
            const profileUser= await userCollection.findById(req.userData.id) 
            
            res.status(200).json({
                success: true,
                profileUser
              })

            }),

  editProfile : catchAsyncErrors(async (req, res, next) =>{

            const editData= { name: req.body.name,  email: req.body.email }

            const editedProfileUser=await userCollection.findByIdAndUpdate(req.userData.id, editData,
                                    { new: true,runValidators: true,useFindAndModify: false})


            res.status(200).json({
                success: true,
                editedProfileUser
              })

            }),




  

  /* =================================  ADMIN SIDE  ===============================================================*/
  
  userList : catchAsyncErrors(async (req, res, next)=>{
             const userlist= await userCollection.find()
             res.status(200).json({
                success:true,
                userlist
              })
            }),


  getAUser: catchAsyncErrors(async (req, res, next) => {
              const aUser = await userCollection.findById(req.params.id);
              
              if (!aUser) {
                return next(new ErrorHandler('user not found', 404))
              }
              res.status(200).json({
                success: true,
                aUser,
              })
            }),


};

