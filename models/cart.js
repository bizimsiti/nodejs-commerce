const Sequelize = require("sequelize");
const { model } = require("../utility/database");

const sequelize = require("../utility/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;
