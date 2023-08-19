const mongoose = require('mongoose')
require('dotenv').config()



const connectDB=()=>{
        mongoose.connect(process.env.DB_URI,{
          useNewUrlParser:true,
          
        })
        .then(con=>{
          console.log(`mongoDb Database connected with Host: ${con.connection.host}`);
        })
}

module.exports= connectDB