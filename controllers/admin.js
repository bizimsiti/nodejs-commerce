const Product = require("../models/product");
const Category = require("../models/category");

exports.getProducts = (req, res) => {
  Product.getAll()
    .then((products) => {
      res.render("admin/products", {
        title: "Admin Products",
        products: products[0],
        path: "/admin/products",
        action: req.query.action
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res) => {
  Category.getAll()
    .then((categories) => {
      res.render("admin/add-product", {
        categories: categories[0],
        title: "Admin Products",
        path: "/admin/add-product"
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res) => {
  const product = new Product(
    req.body.name,
    req.body.price,
    req.body.img,
    req.body.description,
    req.body.categoryid
  );
  product
    .saveProduct()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res) => {
  Product.getById(req.params.productid)
    .then((product) => {
      Category.getAll()
        .then((categories) => {
          res.render("admin/edit-product", {
            title: "Edit Product",
            path: "/admin/edit-products",
            product: product[0][0],
            categories: categories[0]
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const product = new Product();
  product.id = req.body.id;
  product.name = req.body.name;
  product.price = req.body.price;
  product.img = req.body.img;
  product.description = req.body.description;
  product.categoryid = req.body.categoryid;
  Product.Update(product)
    .then(() => {
      res.redirect("/admin/products?action=edit");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteProduct = (req, res) => {
  Product.DeleteById(req.body.productid)
    .then(() => {
      res.redirect("/admin/products?action=delete");
    })
    .catch((err) => {
      console.log(err);
    });
};
