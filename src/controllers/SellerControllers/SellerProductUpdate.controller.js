const Product = require("../../model/product.model");
const { ApiError } = require("../../utils/errorHandler");

exports.SellerProductUpdate = async (req, res) => {
  const productId = req.params.id;
  // console.log("this is update id:", productId);
  // const updateData = req.body;
  // console.log("this is update data:", updateData);
  const id = req.seller.id;

  // 1. Product find karo
  const product = await Product.findById(productId);
  // console.log("this is a find by id product:", product);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  // the seller id and product seller id match kar rahe hai ki nahi
  if (product.sellerId.toString() !== id) {
    throw new ApiError(403, "you are not owner this product");
  }

  const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    product: updatedProduct,
    message : "update your Product"
  });
};
