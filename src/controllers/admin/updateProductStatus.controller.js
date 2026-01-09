const Product = require("../../model/product.model");
const { ApiError } = require("../../utils/errorHandler");

exports.updateProductStatus = async (req, res) => {
  const { productId } = req.params;
  const { isActive } = req.body;
  if (typeof isActive !== "boolean") {
    throw new ApiError(400, "isActive must be true or false");
  }
  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(400, "Product not found");
  }
  product.isActive = isActive;
  await product.save();
   res.status(200).json({
     success: true,
     message: `Product ${isActive ? "activated" : "deactivated"} successfully`,
     product,
   });
};
