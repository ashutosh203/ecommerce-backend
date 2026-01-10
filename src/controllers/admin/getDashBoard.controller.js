const Product = require("../../model/product.model");
const Seller = require("../../model/Seller.model");
const UserFavorites = require("../../model/userFavorites.model");

exports.getDashBoard = async (req, res) => {
  const totalSeller = await Seller.countDocuments();
  const pendingApprovals = await Seller.countDocuments({
    isApproved: false,
  }); // total pending approvals seller count

  const totalProducts = await Product.countDocuments();
  const totalUser = await UserFavorites.countDocuments();

  const pendingSellerProfile = await Seller.find({
    isApproved: false,
  }).select("isApproved ownerName email status createdAt");
  res.status(200).json({
    success: true,
    totalSeller,
    pendingApprovals,
    totalProducts,
    pendingSellerProfile,
    totalUser,
  });
};
