const { ApiError } = require("../../utils/errorHandler");

exports.checkSellerDetails = async (req, res, next) => {
  const { shopName, ownerName, email, password } = req.body;
  if (!shopName || !ownerName || !email || !password) {
    // return res.status(400).json({ message: "All fields are required." });
    // throw new Error("");
    throw new ApiError(400, "All fields are required.");
  }
  next();
};
// Additional validation logic can be added here (e.g., email format, password strength)
// res.send("Validation passed");
