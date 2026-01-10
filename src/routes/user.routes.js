const express = require("express");
const { userSignin } = require("../controllers/user/userSignin.controller");
const { userLogin } = require("../controllers/user/userLogin.controller");
const {
  verifyUserToken,
} = require("../middlewares/user/verifyUserToken.middleware");
const { userProduct } = require("../controllers/user/userProduct.controller");
const authorizeRoles = require("../middlewares/authorizeRoles.middleware");
const {
  toggleFavorite,
} = require("../controllers/user/userFavorites.controller");
const {
  favoriteAllList,
} = require("../controllers/user/favoriteAllList.controller");
const { addToCart } = require("../controllers/user/addToCart.controller");
const {
  getAllAddToCart,
} = require("../controllers/user/getAllAddToCart.controller");
const {
  removeFromCart,
} = require("../controllers/user/removeFromCart.controller");
const {
  updateCartQuantity,
} = require("../controllers/user/updateCartQuantity.controller");
const { createOrder } = require("../controllers/user/createOrder.controller");
const userRoute = express();

// /api/user/

userRoute.post("/signup", userSignin);
userRoute.post("/login", userLogin);
userRoute.get("/products", userProduct);
userRoute.post(
  "/favorites",
  verifyUserToken,
  authorizeRoles("USER"),
  toggleFavorite
);

userRoute.get(
  "/favorites/list",
  verifyUserToken,
  authorizeRoles("USER"),
  favoriteAllList
);

// /api/user/cart/add
userRoute.post("/cart/add", verifyUserToken, authorizeRoles("USER"), addToCart); // add to cart

// /api/user/cart/getAllCart
userRoute.get(
  //get all  add to cart
  "/cart/getAllCart",
  verifyUserToken,
  authorizeRoles("USER"),
  getAllAddToCart
);

// /api/user/cart/:productId
userRoute.delete(
  "/cart/:productId",
  verifyUserToken,
  authorizeRoles("USER"),
  removeFromCart
); //get all  add to cart

// /api/user/cart
userRoute.patch(
  "/cart",
  verifyUserToken,
  authorizeRoles("USER"),
  updateCartQuantity
); //get all  add to cart
// /api/user/order
userRoute.post("/order", verifyUserToken, authorizeRoles("USER"), createOrder); //get all  add to cart

module.exports = userRoute;
