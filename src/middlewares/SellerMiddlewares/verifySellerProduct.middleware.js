const { ApiError } = require("../../utils/errorHandler");

exports.verifySellerProduct = async (req, res, next) => {
  console.log(req.method, req.url, req.body);
  const {
    productName,
    price,
    category,
    subCategory,
    stock,
    images,
    productDetails,
  } = req.body;
  console.log(req.body)

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
