const Product = require("../../model/product.model");
const Seller = require("../../model/Seller.model");

exports.sellerDashboardDetails = async (req, res) => {
  const Id = req.seller.id;
  // total product
  const activeCount = await Product.countDocuments({
    sellerId: Id,
    isActive: true,
  });
  // total inStock Product
  const inStock = await Product.countDocuments({
    sellerId: Id,
    isActive: true,
    stock: { $gt: 0 },
  });
  // total outOfStock
  const OutOfStock = await Product.countDocuments({
    sellerId: Id,
    stock: 0,
  });

  const SellerData = await Seller.findById(Id).select("status isApproved");
  console.log(SellerData);
  

  res.status(200).json({
    success: true,
    totalProduct: activeCount,
    totalInStock: inStock,
    totalOutOfStock: OutOfStock,
    SellerData,
  });
};
