const Product = require("../../model/product.model");

exports.userProduct = async (req, res) => {
  const allProducts = await Product.find({
    isActive: true,
    stock: { $gt: 0 },
  }).populate("sellerId", "ownerName shopName");

  res.status(201).json({
    success: true,
    allProducts,
  });
};
