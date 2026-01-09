const express = require("express");
const {
  adminAuthMiddleware,
} = require("../middlewares/admin/adminAuthMiddleware");
const { adminLogin } = require("../controllers/admin/adminLogin.controller");
const {
  verifySellerToken,
} = require("../middlewares/SellerMiddlewares/verifySellerToken.middleware");
const authorizeRoles = require("../middlewares/authorizeRoles.middleware");
const {
  getAllProducts,
} = require("../controllers/admin/getAllProducts.controller");
const {
  updateProductStatus,
} = require("../controllers/admin/updateProductStatus.controller");
const {
  getAllSellersList,
} = require("../controllers/admin/getAllSellersList.controller");
const {
  updateSellerStatus,
} = require("../controllers/admin/updateSellerStatus.controller");
const { getDashBoard } = require("../controllers/admin/getDashBoard.controller");

// admin routes create
const adminRoutes = express.Router();

adminRoutes.post("/login", adminAuthMiddleware, adminLogin);// {done}
adminRoutes.get(
  "/dashboard",
  verifySellerToken,
  authorizeRoles("ADMIN"),
  getDashBoard
);// done




// ----------------------------------------
adminRoutes.get(
  "/products",
  verifySellerToken,
  authorizeRoles("ADMIN"),
  getAllProducts
); // {done}


adminRoutes.patch(
  "/products/:productId/status",
  verifySellerToken,
  authorizeRoles("ADMIN"),
  updateProductStatus
);
// {done}
// -----------------------------------------


adminRoutes.get(
  "/sellerList",
  verifySellerToken,
  authorizeRoles("ADMIN"),
  getAllSellersList
);// {done }



adminRoutes.patch(
  "/seller/:sellerId/status",
  verifySellerToken,
  authorizeRoles("ADMIN"),
  updateSellerStatus
);// {done}

module.exports = adminRoutes;
