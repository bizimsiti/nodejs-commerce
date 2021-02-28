const Product = require("../models/product");
const Category = require("../models/category");
exports.getIndex = (req, res) => {
  const categories = Category.getAll();
  Product.getAll()
    .then((products) => {
      res.render("shop/index", {
        title: "Home Page",
        products: products[0],
        categories: categories,
        path: "/"
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res) => {
  const categories = Category.getAll();
  Product.getAll()
    .then((products) => {
      res.render("shop/products", {
        title: "Home Page",
        products: products[0],
        categories: categories,
        path: "/"
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategoryId = (req, res) => {
  const categoryid = req.params.categoryid;
  const products = Product.getProductsByCategoryId(categoryid);
  const categories = Category.getAll();

  res.render("shop/products", {
    title: "Products",
    selectedCategory: categoryid,
    products: products,
    categories: categories,
    path: "/products"
  });
};

exports.getProduct = (req, res) => {
  Product.getById(req.params.productid)
    .then((product) => {
      res.render("shop/product-detail", {
        title: product[0][0].name,
        product: product[0][0],
        path: "/products"
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductDetails = (req, res) => {
  const products = Product.getAll();
  res.render("shop/details", {
    title: "Details",

    path: "/details"
  });
};

exports.getCard = (req, res) => {
  const products = Product.getAll();
  res.render("shop/card", {
    title: "Card",
    products: products,
    path: "/card"
  });
};

exports.getOrders = (req, res) => {
  const products = Product.getAll();
  res.render("shop/orders", {
    title: "Orders",
    products: products,
    path: "/orders"
  });
};
