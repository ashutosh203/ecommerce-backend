const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },
    subCategory: {
      type: String,
      required: true,
      index: true,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      index: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    images: [
      {
        type: String, // image URL
      },
    ],

    productDetails: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
