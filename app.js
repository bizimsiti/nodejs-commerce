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

Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false
  }
});
Category.hasMany(Product);
Product.belongsTo(User);
User.hasMany(Product);
sequelize
  .sync({
    force: true
  })
  //.sync()
  .then(() => {
    console.log("database connected!");

    User.findByPk(1)
      .then((user) => {
        if (!user) {
          User.create({ name: "alimetin", email: "ornek@gmail.com" });
        }
        return user;
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

//routers

app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404 not found"
  });
});

app.listen(3000, () => console.log("listening son port 3000"));
