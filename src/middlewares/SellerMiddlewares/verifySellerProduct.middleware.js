const { ApiError } = require("../../utils/errorHandler");

exports.verifySellerProduct = async (req, res, next) => {
  const {
    productName,
    price,
    category,
    subCategory,
    stock,
    images,
    productDetails,
  } = req.body;

  if (
    !productName ||
    !price ||
    !category ||
    !subCategory ||
    !stock ||
    !images ||
    !productDetails
  ) {
    throw new ApiError(400, "All product details are required.");
  }
  next();
};
