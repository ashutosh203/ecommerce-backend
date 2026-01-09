const Product = require("../../model/product.model");
const { ApiError } = require("../../utils/errorHandler");

exports.SellerProductDelete = async (req, res) => {
    const productId = req.params.id;
    // console.log("this is delete id:", productId);
    const updateData = req.body;
    // console.log("this is delete data:", updateData);
    const id = req.seller.id;

    // 1. Product find karo
    const product = await Product.findById(productId);
    console.log("this is a find by id product:", product);
    if (!product) {
      throw new ApiError(404,"Product not found")
    }
    // the seller id and product seller id match kar rahe hai ki nahi
    if (product.sellerId.toString() !== id) {
      throw new ApiError(403, "you are not owner this product");
    }

    // 3. Delete product
    await Product.findByIdAndDelete(productId);
    res.status(200).json({
      success: true,
      message: "Product delete ho gaya",
    }); 
};
