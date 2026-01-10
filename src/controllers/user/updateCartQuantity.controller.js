const UserCart = require("../../model/userCartSchema.model");
const { ApiError } = require("../../utils/errorHandler");

module.exports.updateCartQuantity = async (req, res) => {
  const userId = req.User.id;
  const { productId, action } = req.body;

  if (!["INC", "DEC"].includes(action)) {
    throw new ApiError(400, "Invalid action");
  }

  //  Find cart
  const cart = await UserCart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  //  Find item
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  // 3️⃣ Update quantity
  if (action === "INC") {
    cart.items[itemIndex].quantity += 1;
  }

  if (action === "DEC") {
    cart.items[itemIndex].quantity -= 1;

    // remove if quantity 0
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }
  }

  // Save
  await cart.save();

  //  Calculate total
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
    message: "Cart updated",
    items: cart.items,
    totalAmount,
  });
};
