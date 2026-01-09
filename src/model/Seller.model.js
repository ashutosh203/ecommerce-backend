const mongoose = require("mongoose");
// Define the Seller schema
const SellerSchema = new mongoose.Schema(
  {
    // required fields
    shopName: {
      type: String,
      required: true,
      trim: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    // optional fields
    address: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    shopId:{
      type: String,
      unique: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "BLOCKED"],
      default: "PENDING",
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    role :{
      type: String,
      default: "SELLER",
    }
  },
  { timestamps: true }
);


// Create and export the Seller model
const Seller = mongoose.model("Seller", SellerSchema);
module.exports = Seller;