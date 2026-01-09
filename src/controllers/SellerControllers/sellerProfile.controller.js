const Seller = require("../../model/Seller.model");
const { ApiError } = require("../../utils/errorHandler");

exports.sellerProfile = async (req, res) => {
  const id = req.seller.id;
  const profile = await Seller.findById(id).select(
    "shopName ownerName email role status isApproved "
  );
  if (!profile) {
    throw new ApiError(404, "your seller profile not found");
  }
  res.status(200).json({
    success: true,
    message: "Seller Profile",
    profile,
  });
};
