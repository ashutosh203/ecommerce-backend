const UserFavorites = require("../../model/userFavorites.model");


exports.toggleFavorite = async (req, res) => {
  const userId = req.User.id;
  const { productId } = req.body;

  // 🔍 Check already exists
  const existing = await UserFavorites.findOne({ userId, productId });

  if (existing) {
    //  Remove favorite
    await UserFavorites.deleteOne({ _id: existing._id });
    return res.json({
      message: "Removed from favorites",
      isFavorite: false,
    });
  }

  // ✅ Add favorite
  await UserFavorites.create({ userId, productId });
  res.json({
    message: "Added to favorites",
    isFavorite: true,
  });
};
