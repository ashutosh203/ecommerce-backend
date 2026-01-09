const { ApiError } = require("../../utils/errorHandler");
const jwt = require("jsonwebtoken");

exports.adminLogin = async (req, res, next) => {

  const token = jwt.sign(
    {
      id: "ADMIN_ID",
      role: "ADMIN",
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.status(200).json({
    success: true,
    token,
  });
};
