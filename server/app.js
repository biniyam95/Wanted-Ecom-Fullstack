const express = require('express')
const app= express()

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const path = require('path')

const errors = require('./middlewares/errors')


app.use(express.json()) 
app.use(cookieParser())  


const productRoutes= require('./routes/productRoutes')
const userRoutes= require('./routes/userRoutes')
const orderRoutes= require('./routes/orderRoutes')

// api 
app.use('/api/v1',productRoutes)
app.use('/api/v1',userRoutes)
app.use('/api/v1',orderRoutes)

//deployment
if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
  })
}


//errors
app.use(errors) 


 


module.exports = app