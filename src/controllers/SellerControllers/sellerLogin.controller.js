const Seller = require("../../model/Seller.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ApiError } = require("../../utils/errorHandler");

exports.sellerLogin = async (req, res) => {
    const { email, password } = req.body;

    // find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      throw new ApiError(400, "Invalid email");
    }
    // compare passwords
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) {
      throw new ApiError(400, "Invalid password");
    }

    // sellers are approved by admin hold to write logic later
    // generate jwt token
    const token = jwt.sign(
      {
        id: seller._id,
        role: seller.role, // "SELLER" payload me add karna hai
      },
      process.env.JWT_SECRET, // secret key
      {
        expiresIn: process.env.JWT_EXPIRES_IN, // 7d ye  environment variable me set karna hai
      }
    );
    return res.status(200).json({
      success: true,
      message: "Seller logged in successfully",
      token,
      seller: {
        id: seller._id,
        shopName: seller.shopName,
        ownerName: seller.ownerName,
        email: seller.email,
        role: seller.role,
        status: seller.status,
      },
    });
};
