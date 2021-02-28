const express = require("express");
const bp = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/shop");

const app = express();

//database connection

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
