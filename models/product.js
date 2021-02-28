const connection = require("../utility/database");

module.exports = class Product {
  constructor(name, price, img, description, categoryid) {
    this.name = name;
    this.price = price;
    this.img = img;
    this.description = description;
    this.categoryid = categoryid;
  }
  saveProduct() {
    return connection.execute(
      "INSERT INTO products(name,price,img,description,categoryid) VALUES(?,?,?,?,?)",
      [this.name, this.price, this.img, this.description, this.categoryid]
    );
  }

  static getAll() {
    return connection.execute("SELECT * FROM products");
  }
  static getById(id) {
    return connection.execute("SELECT * FROM products WHERE products.id=?", [
      id
    ]);
  }
  static getProductsByCategoryId(categoryid) {}
  static Update(product) {
    return connection.execute(
      "UPDATE products SET products.name=?,products.price=?,products.img=?,products.description=?,products.categoryid=? WHERE products.id=?",
      [
        product.name,
        product.price,
        product.img,
        product.description,
        product.categoryid,
        product.id
      ]
    );
  }
  static DeleteById(id) {
    return connection.execute("DELETE FROM products WHERE id=?", [id]);
  }
};
/**
 const p = new Product();
 p.saveProduct();

 const products = Product.getAll();
 */
