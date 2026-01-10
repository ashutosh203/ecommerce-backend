const Order = require("../../model/order.model");
const Product = require("../../model/product.model");
const UserCart = require("../../model/userCartSchema.model");
const { ApiError } = require("../../utils/errorHandler");

module.exports.createOrder = async (req, res) => {
  const userId = req.User.id;
  const { address, paymentMethod } = req.body;

  // 1 Validate address
  if (
    !address ||
    !address.name ||
    !address.addressLine ||
    !address.city ||
    !address.pincode
  ) {
    throw new ApiError(400, "Address is incomplete");
  }

  // 2 Get cart
  const cart = await UserCart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  let totalAmount = 0;

  // 3 Stock validation
  for (const item of cart.items) {
    if (!item.productId) {
      throw new ApiError(400, "Product not found");
    }

    if (item.productId.stock < item.quantity) {
      throw new ApiError(400, `${item.productId.productName} is out of stock`);
    }

    totalAmount += item.quantity * item.priceAtThatTime;
  }

  // 4 Create order
  const order = await Order.create({
    userId,
    items: cart.items,
    totalAmount,
    address,
    paymentMethod,
    status: "PLACED",
  });

  // 5 Reduce stock
  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.productId._id, {
      $inc: { stock: -item.quantity },
    });
  }

  // 6 Clear cart
  cart.items = [];
  await cart.save();

  return res.status(201).json({
    success: true,
    message: "Order placed successfully",
    orderId: order._id,
  });
};
