const { ApiError } = require("../../utils/errorHandler");

exports.checkSellerLoginDetails = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password)

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }
  next();
};
