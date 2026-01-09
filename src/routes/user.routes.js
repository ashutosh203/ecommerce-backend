const express = require("express");
const { userSignin } = require("../controllers/user/userSignin.controller");
const { userLogin } = require("../controllers/user/userLogin.controller");
const {
  verifyUserToken,
} = require("../middlewares/user/verifyUserToken.middleware");
const { userProduct } = require("../controllers/user/userProduct.controller");
const authorizeRoles = require("../middlewares/authorizeRoles.middleware");
const { toggleFavorite } = require("../controllers/user/userFavorites.controller");
const { favoriteAllList } = require("../controllers/user/favoriteAllList.controller");
const userRoute = express();

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

module.exports = userRoute;
