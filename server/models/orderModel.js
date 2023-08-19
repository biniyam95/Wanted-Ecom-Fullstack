const mongoose = require('mongoose')

//below is what we get we create a order document

const orderSchema = mongoose.Schema({
      orderedItems: [{
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            prodId: { type: mongoose.Schema.Types.ObjectId, ref: 'PRODUCTS', required: true }
          
        }
      ],

      addressInfo: {
          street: { type: String,required: true },
          city: { type: String, required: true },
          phone: { type: String, required: true },
          zip : { type: String, required: true },
          country: { type: String, required: true }
        },
      
      totalPrice: { type: Number, required: true, default: 0.0 }, 
      
      tax: { type: Number, required: true, default: 0.0 }, 
      
      shippingCharge: { type: Number, required: true, default: 0.0 },
      
      grandTotal: { type: Number, required: true, default: 0.0 }, 

      orderStatus: { type: String, required: true, default: 'Processing' }, 
      deliveredAt: { type: Date },  
      createdAt: { type: Date, default: Date.now }, 
      paidAt: { type: Date },  

      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'USERS', required: true }
    
})

const orderCollection = mongoose.model("ORDERS", orderSchema)

module.exports = orderCollection