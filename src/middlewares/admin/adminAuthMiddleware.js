const bcrypt = require("bcrypt");
const { ApiError } = require("../../utils/errorHandler");

exports.adminAuthMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  if (email !== process.env.ADMIN_EMAIL) {
    throw new ApiError(401, "Invalid admin Email");
  }
  const isMatch = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );
  // console.log(isMatch)
  if (!isMatch) {
    throw new ApiError(401, "Invalid admin Password");
  }
  next();
};
