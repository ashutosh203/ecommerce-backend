// external modules
const express = require("express");

// local modules
// This Root is signup route for seller
const {
  checkSellerDetails,
} = require("../middlewares/SellerMiddlewares/checkSellerDetails.middleware");
const {
  sellerSignup,
} = require("../controllers/SellerControllers/sellerSignup.controller");
// This Route is login route for seller
const {
  checkSellerLoginDetails,
} = require("../middlewares/SellerMiddlewares/checkSellerLoginDetails.middleware");
const {
  sellerLogin,
} = require("../controllers/SellerControllers/sellerLogin.controller");
// This Route is dashboard route for seller
const {
  verifySellerToken,
} = require("../middlewares/SellerMiddlewares/verifySellerToken.middleware");
const authorizeRoles = require("../middlewares/authorizeRoles.middleware");
const {
  addProductController,
} = require("../controllers/SellerControllers/addProductController.controller");
const {
  verifySellerProduct,
} = require("../middlewares/SellerMiddlewares/verifySellerProduct.middleware");
const {
  getSellerProducts,
} = require("../controllers/SellerControllers/getSellerProducts.controller");
const {
  SellerProductUpdate,
} = require("../controllers/SellerControllers/SellerProductUpdate.controller");
const {
  SellerProductDelete,
} = require("../controllers/SellerControllers/SellerProductDelete.controller");
const {
  getSellerSingleProducts,
} = require("../controllers/SellerControllers/getSellerSingleProducts.controller");
const {
  sellerAccessMiddleware,
} = require("../middlewares/SellerMiddlewares/sellerAccess.middleware");
const {
  sellerDashboardDetails,
} = require("../controllers/SellerControllers/sellerDashboardDetails.controller");
const {
  sellerProfile,
} = require("../controllers/SellerControllers/SellerProfile.controller");

// create router
const sellerRoutes = express.Router();

sellerRoutes.post("/signup", checkSellerDetails, sellerSignup); // seller signup //{hold }
sellerRoutes.post("/login", checkSellerLoginDetails, sellerLogin); // seller login // {Done}
// sellerRoutes.get("/dashboard", verifySellerToken, ); // only for testing purpose
sellerRoutes.get(
  "/dashboard",
  verifySellerToken,
  authorizeRoles("SELLER"),
  sellerAccessMiddleware,
  sellerDashboardDetails
); // {Done}

sellerRoutes.post(
  "/product/add",
  verifySellerToken,
  authorizeRoles("SELLER"),
  sellerAccessMiddleware,
  verifySellerProduct,
  addProductController
); //add product  {done}
sellerRoutes.get(
  "/products",
  verifySellerToken,
  authorizeRoles("SELLER"),
  sellerAccessMiddleware,
  getSellerProducts
); // return all products of the logged in seller {done}

sellerRoutes.get(
  "/product/:id",
  verifySellerToken,
  authorizeRoles("SELLER"),
  sellerAccessMiddleware,
  getSellerSingleProducts
); // {done}

sellerRoutes.put(
  "/product/update/:id",
  verifySellerToken,
  authorizeRoles("SELLER"),
  sellerAccessMiddleware,
  SellerProductUpdate
); // {done}
sellerRoutes.delete(
  "/product/delete/:id",
  verifySellerToken,
  authorizeRoles("SELLER"),
  sellerAccessMiddleware,
  SellerProductDelete
); // {DONE}
sellerRoutes.get(
  "/profile",
  verifySellerToken,
  authorizeRoles("SELLER"),
  // sellerAccessMiddleware,
  sellerProfile
); // {DONE}

module.exports = sellerRoutes;

// In app.js, you would import and use this route as follows:
// const sellerRoutes = require('./routes/sellerRoutes.routes');
// app.use("/api/seller", sellerRoutes);
