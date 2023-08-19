const mongoose = require("mongoose");

//product schema or constraints
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter product name"],
    trim: true,
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [5, "Product price cannot exceed 5 characters"],
    default: 0.0,
  },
  description: { type: String, required: [true, "Please enter product description"] },

  category: {
    type: String,
    required: [true, "Please select category for this product"],
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
      ],
      message: "Please select correct category for product",
    },
  },

  seller: { type: String, required: [true, "Please enter product seller"] },

  stock: {  
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [5, "stock cannot exceed 5 characters"],
    default: 0,
  },

  createdAt: { type: Date, default: Date.now  },

  ratings: { type: Number, default: 0 },

 productImages:[{type: String, required: [true, "Please upload images"] }],
  
});

const productCollection = mongoose.model("PRODUCTS", productSchema)

module.exports = productCollection
