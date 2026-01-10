const { ApiError } = require("../utils/errorHandler");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // req.seller authMiddleware se aata hai
    if (req.seller && allowedRoles.includes(req.seller.role)) {
      return next();
    } else if (req.User && allowedRoles.includes(req.User.role)) {
      return next();
    } else {
      throw new ApiError(403, "Access denied: insufficient permissions");
    }

  };
};

module.exports = authorizeRoles;
