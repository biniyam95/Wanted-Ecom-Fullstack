const app=require('./app')

const connectDB= require('./config/database')

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1)
})

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'server/.env' })

connectDB()  // connecting the database

const server = app.listen(process.env.PORT,()=>{
  console.log(`server is running on port :${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})

// Handle Unhandled errors
process.on('unhandledRejection', err => {
  console.log(`ERROR: ${err.stack}`);
  console.log('Shutting down the server due to Unhandled Promise rejection');
  server.close(() => {
      process.exit(1)
  })
})