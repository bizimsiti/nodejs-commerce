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

exports.getCart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts().then((products) => {
        res.render("shop/cart", {
          title: "Cart",
          path: "/cart",
          products: products
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res) => {
  const productId = req.body.productId;
  let quantity = 1;
  let userCart;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      console.log("products ===>" + products);
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        quantity += product.cartItem.quantity;
        return product;
      }
      return Product.findByPk(productId);
    })
    .then((product) => {
      userCart.addProduct(product, { through: { quantity: quantity } });
    })
    .then(() => res.redirect("/cart"))
    .catch((err) => console.log(err));
};

exports.postCartItemDelete = (req, res) => {
  const productId = req.body.productid;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];

      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch();
};

exports.getOrders = (req, res) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.render("shop/orders", {
        title: "Orders",
        orders: orders,
        path: "/orders"
      });
    })
    .catch((err) => console.log(err));
};

exports.postOrder = (req, res) => {
  let userCart;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      return req.user.createOrder().then((order) => {
        order.addProducts(
          products.map((product) => {
            product.orderItem = {
              quantity: product.cartItem.quantity,
              price: product.price
            };
            return product;
          })
        );
      });
    })
    .then(() => {
      userCart.setProducts(null);
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch();
};
