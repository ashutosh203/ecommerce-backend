const UserCart = require("../../model/userCartSchema.model");
// const { ApiError } = require("../../utils/errorHandler");

module.exports.getAllAddToCart = async (req, res) => {
  const userId = req.User.id;
  // find user all cart
  const cart = await UserCart.findOne({ userId }).populate({
    path: "items.productId",
    select: "productName price images stock",
  });

  // if cart not found
  if (!cart) {
    return res.status(200).json({
      success: true,
      items: [],
      totalAmount: 0,
    });
  }

  // if seller delete product than
  cart.items = cart.items.filter((item) => item.productId !== null);
  await cart.save();

  // total calculate
  let totalAmount = 0;

  cart.items.forEach((item) => {
    totalAmount += item.quantity * item.priceAtThatTime;
  });

  return res.status(200).json({
    success: true,
    items: cart.items,
    totalAmount,
  });
};
