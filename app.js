const express = require("express");
const bp = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");
const sequelize = require("./utility/database");
const app = express();

//database connection
const Product = require("./models/product");
const Category = require("./models/category");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");

Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false
  }
});
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

//one to many
Order.belongsTo(User);
User.hasMany(Order);
//many to many
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

let _user;
sequelize
  /* .sync({
    force: true
  }) */
  .sync()
  .then(() => {
    console.log("database connected!");

    User.findByPk(1)
      .then((user) => {
        if (!user) {
          return User.create({ name: "alimetin", email: "ornek@gmail.com" });
        }
        return user;
      })
      .then((user) => {
        _user = user;
        return user.getCart();
      })
      .then((cart) => {
        if (!cart) {
          return _user.createCart();
        }
        return cart;
      })
      .then(() => {
        Category.count().then((count) => {
          if (count === 0) {
            Category.bulkCreate([
              { name: "telefon", description: "telefon kategorisi" },
              { name: "bilgisayar", description: "bilgisayar kategorisi" },
              { name: "elektronik", description: "elektronik kategorisi" }
            ]);
          }
        });
      });
  })
  .catch((err) => {
    console.log("hata");
  });

//pug set
app.set("view engine", "pug");
app.set("views", "./views");

//middlewares
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

//routers

app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 not found"
  });
});

app.listen(3000, () => console.log("listening son port 3000"));
