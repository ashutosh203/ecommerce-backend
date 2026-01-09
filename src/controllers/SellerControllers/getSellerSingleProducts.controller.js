const Product = require("../../model/product.model");
const { ApiError } = require("../../utils/errorHandler");

exports.getSellerSingleProducts = async (req, res) => {
  const productId = req.params.id;
  const sellerId = req.seller.id;
  const product = await Product.findById(productId);
  // console.log(product)
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.sellerId.toString() !== sellerId) {
    throw new ApiError(403, "you are not owner this product");
  }

  // 3. Product return
  return res.status(200).json({
    success: true,
    product,
  });
};
