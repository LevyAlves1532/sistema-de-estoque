const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema({
  _id_user: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
});

const CategoriesModel = mongoose.model("Categories", CategoriesSchema);

class Categories {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.category = null;
  }

  async get(_id) {
    const category = await CategoriesModel.findById(_id);
    return category;
  }

  async getAllFromIdUser(_id_user) {
    const categories = await CategoriesModel.find({ _id_user })
      .sort({ name: 1 });
    return categories;
  }

  async set(_id_user) {
    this.validate();
    if (this.errors.length > 0) return;

    await this.isCategory();
    if (this.errors.length > 0) return;

    this.category = await CategoriesModel.create({ _id_user, ...this.body });
  }

  async up(_id) {
    if (typeof _id !== "string") return;

    this.validate();
    if (this.errors.length > 0) return;

    this.category = await CategoriesModel.findByIdAndUpdate(_id, this.body, { new: true });
  }

  async del(_id) {
    if (typeof _id !== "string") return;

    const category = await CategoriesModel.findOneAndDelete({ _id });

    return category;
  }

  async isCategory() {
    this.category = await CategoriesModel.findOne({ name: this.body.name });
    if (this.category) this.errors.push("Já existe uma categoria com esse nome!");
  }

  validate() {
    this.normalizeBody();

    if (this.body.name.length < 3 || this.body.name.length > 20) this.errors.push("O nome da categoria precisa ter entre 3 à 20 caracteres!");
    if (this.body.slug.includes(" ") || /[A-Z]/.test(this.body.slug) 
      || /[^\w\s-]/.test(this.body.slug.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) this.errors.push("Slug invalído!");
  }

  normalizeBody() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.name,
      slug: this.body.slug,
    };
  }
}

module.exports = Categories;
