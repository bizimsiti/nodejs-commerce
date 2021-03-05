const { DataTypes } = require("sequelize");
const sequelize = require("../utility/database");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: DataTypes.STRING,
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Category;
