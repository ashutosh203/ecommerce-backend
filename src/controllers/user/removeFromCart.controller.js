const UserCart = require("../../model/userCartSchema.model");
const { ApiError } = require("../../utils/errorHandler");

module.exports.removeFromCart = async (req, res) => {
  const userId = req.User.id;
  const { productId } = req.params;
  // find user cart
  const cart = await UserCart.findOne({ userId });

  // if cart not find
  if (!cart) {
    return res.status(200).json({
      success: true,
      message: "Cart is empty",
      items: [],
      totalAmount: 0,
    });
  }

  // Check product exists in cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  //  Remove product
  cart.items.splice(itemIndex, 1);

  // Save cart
  await cart.save();

  // Calculate total
  let totalAmount = 0;
  cart.items.forEach((item) => {
    totalAmount += item.quantity * item.priceAtThatTime;
  });

  await cart.populate({
    path: "items.productId",
    select: "productName price images stock",
  });

  return res.status(200).json({
    success: true,
    message: "Product removed from cart",
    items: cart.items,
    totalAmount,
  });
};
