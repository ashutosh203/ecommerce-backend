const Seller = require("../../model/Seller.model");
exports.getAllSellersList = async (req, res) => {
  const query = req.query.filter;
  const find = { role: "SELLER" };

  if (query === "ACTIVE") {
    find.status = "ACTIVE";
  } else if (query === "PENDING") {
    find.status = "PENDING";
  } else if (query === "BLOCKED") {
    find.status = "BLOCKED";
  }

  const sellers = await Seller.find(find).select("-password");
  res.status(200).json({
    success: true,
    count: sellers.length,
    sellers,
  });
};
