const mongoose = require("mongoose");
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const unlink = promisify(fs.unlink);

const ProductsSchema = new mongoose.Schema({
  _id_user: { type: String, required: true },
  _id_categories: [{ type: String }],
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: String, required: true },
  inventory: { type: String, required: true },
});

const ProductsModel = mongoose.model("Products", ProductsSchema);

class Products {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.product = null;
  }

  async get(_id) {
    const products = await ProductsModel.findById(_id);
    return products;
  }

  async getAllFromIdUser(_id_user) {
    const products = await ProductsModel.find({ _id_user })
      .sort({ title: 1 });
    return products;
  }

  async getAllFromCategory(_id_user, _id_category) {
    const products = await ProductsModel.find({ _id_user, _id_categories: _id_category })
      .sort({ title: 1 });
    return products;
  }

  async set(_id_user, image) {
    this.validate();
    if (this.errors.length > 0) return;

    await this.isProduct(_id_user);
    if (this.errors.length > 0) return;

    this.category = await ProductsModel.create({ _id_user, image, ...this.body });
  }

  async up(_id, current_image, image = null) {
    if (typeof _id !== "string") return;

    this.validate();
    if (this.errors.length > 0) return;

    let body = { ...this.body };

    if (current_image && image) {
      await unlink(path.resolve(__dirname, "..", "..", "public", "assets", "uploads", current_image));
      body.image = image;
    }

    this.product = await ProductsModel.findByIdAndUpdate(_id, body, { new: true });
  }

  async del(_id) {
    if (typeof _id !== "string") return;

    const product = await ProductsModel.findOneAndDelete({ _id });
    await unlink(path.resolve(__dirname, "..", "..", "public", "assets", "uploads", product.image));

    return product;
  }

  async isProduct(_id_user) {
    this.product = await ProductsModel.findOne({ title: this.body.title, _id_user });
    if (this.product) this.errors.push("Já existe um produto com esse título!");
  }

  validate() {
    this.normalizeBody();

    if (this.body._id_categories.length === 0) this.errors.push("Selecione uma categoria!");
    if (this.body.title.length < 6 || this.body.title.length > 50) this.errors.push("O título deve ter entre 6 a 50 caracteres!");
    if (this.body.price.indexOf(",") > -1 || /[A-Za-z]/.test(this.body.price)) this.errors.push("Preço inválido!");
    if (this.body.inventory.indexOf(",") > -1 || /[A-Za-z]/.test(this.body.inventory)) this.errors.push("Estoque inválido!");
  }

  normalizeBody() {
    this.body = {
      _id_categories: this.body.categories ? this.body.categories : [],
      title: this.body.title,
      price: this.body.price,
      inventory: this.body.inventory,
    };
  }
}

module.exports = Products;
