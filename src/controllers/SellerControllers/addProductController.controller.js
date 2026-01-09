const Product = require("../../model/product.model");

exports.addProductController= async (req, res) => {
  const { productName, price, category, subCategory, stock, images, productDetails } = req.body;
  const sellerId = req.seller.id;

  // Create new product
  const product = await Product.create({
    productName,
    price,
    category,
    subCategory,
    sellerId,
    stock,
    images,
    productDetails,
  });
  return res.status(201).json({
    success: true,
    message: "Product added successfully",
    product: product,
  });
  }
