// generate a new token and send it to cookie and save in cookie.
const sendTokenToCookie = (User, statusCode, res) => {

  // Generate a new Jwt token
  const token =  User.generateJWTtoken()    
  // Options for cookie
  const options = {
      expires: new Date( Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true
  }

  res.status(statusCode).cookie('token', token, options).json({
      success: true,
      User,
      token,
      
  })

}

module.exports = sendTokenToCookie;