const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
      name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [20, "Your name cannot exceed 20 characters"],
      },
      email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"],
      },
      password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [4, "Your password must be longer than 4 characters"], 
        select: false,  
      },
      role: { type: String, default: "user" },
      
      createdAt: { type: Date, default: Date.now }
      
});



 userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) 
      next()

  this.password = await bcrypt.hash(this.password, 10)
}) 

 userSchema.methods.comparePassword = async function(enteredPassword) {
             return await bcrypt.compare(enteredPassword, this.password)
           } 

userSchema.methods.generateJWTtoken= function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRY});
} 


const userCollection = mongoose.model("USERS", userSchema)
module.exports = userCollection

