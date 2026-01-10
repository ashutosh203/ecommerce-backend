const UserFavorites = require("../../model/userFavorites.model");

exports.favoriteAllList = async (req, res) => {
  const userId = req.User.id;
  const allFavoritesList = await UserFavorites.find({ userId }).populate(
    "productId"
  );

  if (!allFavoritesList) {
    return res.status(403).json({
      isFavoriteData: null,
    });
  }
  return res.status(201).json({
    success: true,
    allFavoritesList: allFavoritesList,
  });
};
