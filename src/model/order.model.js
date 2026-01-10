const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    // User who placed order
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    //  Ordered items (cart snapshot)
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        priceAtThatTime: {
          type: Number,
          required: true,
        },
      },
    ],

    //  Total price
    totalAmount: {
      type: Number,
      required: true,
    },

    //  Shipping address
    address: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      addressLine: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },

    // 💳 Payment method
    paymentMethod: {
      type: String,
      enum: ["COD", "CARD", "UPI"],
      default: "COD",
    },

    // 📦 Order status
    status: {
      type: String,
      enum: ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"],
      default: "PLACED",
    },
  },
  {
    timestamps: true, // 👉 createdAt & updatedAt auto
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
