const Seller = require("../../model/Seller.model");
const bcrypt = require("bcrypt");
const { ApiError } = require("../../utils/errorHandler");
const { v4: uuidv4 } = require("uuid");

const sellerSignup = async (req, res) => {
  const { shopName, ownerName, email, password } = req.body;
  // check database for existing seller with the given email
  // 1. method const existingSeller = await Seller.findOne({ email });// return full document
  // 2. const existingSeller = await Seller.findOne({ email }, { _id: 1 } // 👈 sirf id lao );
  // 3. method const existingSeller = await Seller.findOne({ email }).select("_id"); // return only _id field
  // 4. const existingSeller = await Seller.exists({ email });

  const existingSeller = await Seller.exists({ email }); // return true/false
  // check if seller already exists with the given email in the database
  if (existingSeller) {
    throw new ApiError(400, "Seller already exists with this email");
  }
  // hash password before saving to database
  const hashedPassword = await bcrypt.hash(password, 10);
  // create new seller data in mongo db
  const seller = await Seller.create({
    shopName,
    ownerName,
    email,
    password: hashedPassword,
    shopId: `SHOP-${uuidv4().slice(0, 8)}`,
  });

  return res.status(201).json({
    success: true,
    message: "Seller account created successfully",
    sellerId: seller._id,
    status: seller.status,
  });
};

module.exports = { sellerSignup };
