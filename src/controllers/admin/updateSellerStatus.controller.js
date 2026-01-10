const Seller = require("../../model/Seller.model");
const { ApiError } = require("../../utils/errorHandler");

exports.updateSellerStatus = async (req, res) => {
  const { sellerId } = req.params;
  const { status, isApproved } = req.body;

  // 1 Validate
  if (
    // false
    (status !== "PENDING" || status !== "ACTIVE" || status !== "BLOCKED") &&
    typeof isApproved !== "boolean" // false
  ) {
    throw new ApiError(
      400,
      `isActive must be true or false and status must be PENDING , ACTIVE , BLOCKED`
    );
  }
  // Find seller
  const seller = await Seller.findById(sellerId);
  // Update status
  if (!seller) {
    throw new ApiError(404, "Seller not found");
  }

  seller.status = status;
  seller.isApproved = isApproved;
  await seller.save();

  res.status(200).json({
    success: true,
    message: `Seller isApproved :${
      isApproved ? "activated" : "deactivated"
    }and ${status} update successfully`,
    seller,
  });
};
