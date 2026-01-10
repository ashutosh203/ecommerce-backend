const Product = require("../../model/product.model");
const Seller = require("../../model/Seller.model");

exports.getSellerProducts = async (req, res) => {
  const sellerId = req.seller.id;
  const profile = await Seller.findById(sellerId).select(
    "name status isApproved"
  );
  const products = await Product.find({ sellerId });
  // const userObj = await Product.find({ sellerId }).populate("sellerId");

  if (!products) {
    return res.status(403).json({
      success: false,
      message: "product not found",
    });
  } else {
    return res.status(201).json({
      success: true,
      products: products,
      profile,
    });
  }
};
