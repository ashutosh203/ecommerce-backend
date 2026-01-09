const Product = require("../../model/product.model");
exports.getAllProducts = async (req, res, next) => {
  // const page = Number(req.query.page) || 1;
  // const limit = Number(req.query.limit) || 10;
  // const skip = (page - 1) * limit;

  // Total products count
  // const totalProducts = await Product.countDocuments();
  //  Fetch products + populate seller


  const query = req.query.filter;
  const find = {};

  if (query === "ALL") {
    find.isActive = { $in: ["true", "false"] };
  } else if (query === "ACTIVE") {
    find.isActive = true;
  } else if (query === "BLOCKED") {
    find.isActive = false;
  } else if (query === "OUT_OF_STOCK") {
    find.stock = 0;
  }
  const products = await Product.find(find).populate(
    "sellerId",
    "ownerName email shopName"
  ); //
  // .skip(skip)
  // .limit(limit)
  // .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    //  totalProducts,
    //  currentPage: page,
    // totalPages: Math.ceil(totalProducts / limit),
    products,
  });
};
