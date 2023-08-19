const express = require('express')
const router = express.Router();

const {verifyLogin}=require('../middlewares/verifyLogin')

const { processPayment,sendStripApi} = require('../controllers/paymentController')

//payment routes
router.post('/payment/process', verifyLogin , processPayment)

router.get('/stripeapi' , verifyLogin , sendStripApi)

//////////////////////
module.exports = router;