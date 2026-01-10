const Product = require("../../model/product.model");
const UserCart = require("../../model/userCartSchema.model");
const { ApiError } = require("../../utils/errorHandler");

module.exports.addToCart = async (req, res) => {
  const userId = req.User.id;
  const { productId } = req.body;
  const product = await Product.findById(productId);
  // if product not found
  if (!product) {
    throw new ApiError(400, "Product not found");
  }
  // find the UserCart all ready exists
  let cart = await UserCart.findOne({ userId });
  // if card is not found
  if (!cart) {
    cart = await UserCart.create({
      userId,
      items: [
        {
          productId,
          quantity: 1,
          priceAtThatTime: product.price,
        },
      ],
    });

    return res.status(201).json({
      success: true,
      message: "Product add to cart",
      cart,
    });
  }

  // if cart all ready exists than  give me index position
  const itemIndex = cart.items.findIndex(
    (i) => i.productId.toString() === productId
  );

  // if product all ready exists than increase quantity

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += 1;
  } else {
    cart.items.push({
      productId,
      quantity: 1,
      priceAtThatTime: product.price,
    });
  }

  await cart.save();

  return res.status(201).json({
    success: true,
    message: "Product add to cart",
    cart,
  });
};
