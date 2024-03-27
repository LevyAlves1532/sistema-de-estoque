const mongoose  = require("mongoose");
const validator = require("validator");
const bcryptjs  = require("bcryptjs");

const UsersSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UsersModel = mongoose.model("Users", UsersSchema);

class Users {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async getFromLogin() {
    this.validate();
    if (this.errors.length > 0) return;

    this.user = await UsersModel.findOne({ email: this.body.email });
    if (!this.user) {
      this.errors.push("Usuário não existe.");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida");
      this.user = null;
      return;
    }
  }

  async set() {
    this.validate();
    if (this.errors.length > 0) return;

    await this.isUser();
    if (this.errors.length > 0) return;

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await UsersModel.create(this.body);
  }

  async up(_id, user) {
    if (typeof _id !== "string") return;

    this.validate(true);
    if (this.errors.length > 0) return;

    for (let key in this.body) {
      if (!this.body[key] || this.body[key] === user[key]) delete this.body[key];
    }

    if (this.body.email) {
      await this.isUser();
      if (this.errors.length > 0) return;
    }

    const salt = bcryptjs.genSaltSync();
    if (this.body.password) {
      this.body.password = bcryptjs.hashSync(this.body.password, salt);
    }

    this.user = await UsersModel.findByIdAndUpdate(_id, this.body, { new: true });
  }

  async isUser() {
    this.user = await UsersModel.findOne({ email: this.body.email });
    if (this.user) this.errors.push("Já existe um usuário com esse e-mail!");
  }

  validate(edit = false) {
    this.normalizeBody();

    const isEmail = validator.isEmail(this.body.email);
    const isPassword = this.body.password.length < 6 || this.body.password.length > 12;

    if ((!edit && !isEmail) || (edit && this.body.email.length > 0 && !isEmail)) this.errors.push("E-mail inválido!");
    if ((!edit && isPassword) || (edit && this.body.password.length > 0 && isPassword)) this.errors.push("Senha precisa estar entre 6 e 12 caracteres!");
  }

  normalizeBody() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }
}

module.exports = Users;
