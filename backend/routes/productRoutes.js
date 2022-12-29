const express = require("express");
const router = express.Router();
const products = require("../Models/products");
const { createTokens, validateToken } = require("../Middleware/auth");

router.get("/getproducts", async (req, res) => {
  let allProducts;
  try {
    allProducts = await products.find({});

    return res.status(200).json(allProducts);
  } catch (err) {
    console.log(err);
    return res.status(500).json("error");
  }
});
router.get("/getproduct/:id", async (req, res) => {
  let product;

  try {
    product = await products.findOne({ _id: req.params.id });

    if (!product) {
      return res.status(404).json("product not found");
    } else {
      return res.status(200).json(product);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
router.get("/getproductsby/:category", async (req, res) => {
  let productsByCategory;

  try {
    productsByCategory = await products.find({
      category: req.params.category,
    });

    if (!productsByCategory) {
      return res.status(404).json("products not found");
    } else {
      return res.status(200).json(productsByCategory);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
