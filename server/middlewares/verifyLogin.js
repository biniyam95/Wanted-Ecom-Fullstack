//error and async erros handlers
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

const userCollection = require('../models/userModel')

const jwt = require("jsonwebtoken");


// Checks whether user is loggedIn or authenticated 
exports.verifyLogin = catchAsyncErrors(async (req, res, next) => {
   
    console.log(req.cookies,"req.cookies")  

    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401))  
    }

    //verifying the token with the one in the cookies
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)  
    
    req.userData= await userCollection.findById(verifiedUser.userId);

    next()
})

