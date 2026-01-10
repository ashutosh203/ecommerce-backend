const jwt = require("jsonwebtoken");
const { ApiError } = require("../../utils/errorHandler");
exports.verifySellerToken = async (req, res, next) => {
  // 1 Header se Authorization uthao
  const authHeader = await req.headers.authorization;
  
  // 2 Agar header hi nahi aaya
  if (!authHeader) {
    throw new ApiError(401, "No token provided");
  }
  // 3 "Bearer <token>" se token nikaalo
  const token = await authHeader.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Invalid token format");
  }
  // 4 Token verify karo // JWT_SECRET se
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.seller = decoded;
  next();
  // res.send('HELLO')
};
