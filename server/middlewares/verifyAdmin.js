//error and async erros handlers
const ErrorHandler = require("../utils/errorHandler");

 exports.verifyAdmin = () => {
  return (req, res, next) => {
    
    if (req.userData.role !== "admin") {
      return next(new ErrorHandler(`The role (${req.userData.role}) is not allowed to access this Admin resource`, 403))
      }
      next()
    }
  } 
 
  