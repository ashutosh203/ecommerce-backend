const mongoose = require("mongoose");

const userFavoritesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

//  Prevent duplicate favorites
userFavoritesSchema.index({ userId: 1, productId: 1 }, { unique: true });

const UserFavorites = mongoose.model("UserFavorites", userFavoritesSchema);
module.exports = UserFavorites;
