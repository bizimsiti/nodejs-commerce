const Product = require("../models/product");
const Category = require("../models/category");
exports.getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      Category.findAll()
        .then((categories) => {
          res.render("shop/index", {
            title: "Home Page",
            products: products,
            categories: categories,
            path: "/"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res) => {
  Product.findAll({
    attributes: ["id", "name", "price", "img"]
  })
    .then((products) => {
      Category.findAll()
        .then((categories) => {
          res.render("shop/products", {
            title: "Products",
            products: products,
            categories: categories,
            path: "/"
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProductsByCategoryId = (req, res) => {
  const categoryid = req.params.categoryid;
  const model = [];
  Category.findAll()
    .then((categories) => {
      model.categories = categories;

      const category = categories.find((i) => i.id == categoryid);
      return category.getProducts();
    })
    .then((products) => {
      res.render("shop/products", {
        title: "Products",
        selectedCategory: categoryid,
        products: products,
        categories: model.categories,
        path: "/products"
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
  Product.findByPk(req.params.productid)
    .then((product) => {
      res.render("shop/product-detail", {
        title: product.name,
        product: product,
        path: "/products"
      });
    })
    .catch((err) => console.log(err));
};
/*  Product.findAll({
    attributes: ["id", "name", "price", "img"],
    where: { id: req.params.productid }
  })
    .then((products) => {
      res.render("shop/product-detail", {
        title: products[0].name,
        product: products[0],
        path: "/products"
      });
    })
    .catch((err) => console.log(err));
}; */

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
