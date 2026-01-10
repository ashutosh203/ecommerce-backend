const mongoose = require("mongoose");

const userCartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        priceAtThatTime: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const UserCart = mongoose.model("UserCart", userCartSchema);

module.exports = UserCart;
