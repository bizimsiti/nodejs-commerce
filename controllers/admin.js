const Product = require("../models/product");
const Category = require("../models/category");

exports.getProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        title: "Admin Products",
        products: products,
        path: "/admin/products",
        action: req.query.action
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAddProduct = (req, res) => {
  Category.findAll()
    .then((categories) => {
      res.render("admin/add-product", {
        categories: categories,
        title: "Admin Products",
        path: "/admin/add-product"
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  const img = req.body.img;
  const description = req.body.description;
  const categoryid = req.body.categoryid;

  Product.create({
    name: name,
    price: price,
    img: img,
    description: description
    //categoryid:categoryid
  })
    .then(() => {
      console.log("created product");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res) => {
  Product.findByPk(req.params.productid)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      Category.findAll()
        .then((categories) => {
          res.render("admin/edit-product", {
            title: "Edit Product",
            path: "/admin/edit-products",
            product: product,
            categories: categories
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const price = req.body.price;
  const img = req.body.img;
  const description = req.body.description;
  const categoryid = req.body.categoryid;

  Product.findByPk(id)
    .then((product) => {
      product.name = name;
      product.price = price;
      product.img = img;
      product.description = description;
      return product.save();
    })
    .then(() => {
      console.log("product updated");
      return res.redirect("/admin/products?action=edit");
    })
    .catch((err) => console.log(err));
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
