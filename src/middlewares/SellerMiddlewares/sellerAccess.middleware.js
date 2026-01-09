const Seller = require("../../model/Seller.model");

exports.sellerAccessMiddleware = async (req, res, next) => {
  const sellerId = req.seller.id;
  const seller = await Seller.findById(sellerId).select("isApproved status");
  if (!seller.isApproved) {
    return res.status(403).json({
      message: "Admin approval pending",
      code: "NOT_APPROVED",
      seller,
    });
  }

  if (seller.status === "PENDING") {
    return res.status(403).json({
      message: "Admin approval pending",
      code: "PENDING",
      seller,
    });
  } else if (seller.status !== "ACTIVE") {
    return res.status(403).json({
      message: "Seller account is blocked",
      code: "BLOCKED",
      seller,
    });
  }

  next();
};
