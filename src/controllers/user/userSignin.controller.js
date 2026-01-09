const User = require("../../model/user.model");
const { ApiError } = require("../../utils/errorHandler");
const bcrypt = require("bcrypt");

exports.userSignin = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "USER",
  });

  res.status(201).json({
    success: true,
    message: "User signup successful",
  });
};
