const UsersModel = require("../models/UsersModel");

exports.index = (req, res) => {
  res.render("account");
};

exports.login = async (req, res) => {
  try {
    const usersModel = new UsersModel(req.body);
    await usersModel.getFromLogin();

    if (usersModel.errors.length > 0) {
      req.flash("errors", usersModel.errors);
      req.session.save(() => {
        return res.redirect("/account/sign-in");
      });
      return;
    }

    req.session.user = usersModel.user;
    req.session.save(() => {
      return res.redirect("/");
    });
  } catch(e) {
    console.log(e);
    res.render("404");
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

exports.register = async (req, res) => {
  try {
    const usersModel = new UsersModel(req.body);
    await usersModel.set();

    if (usersModel.errors.length > 0) {
      req.flash("errors", usersModel.errors);
      req.session.save(() => {
        return res.redirect("/account/sign-up");
      });
      return;
    }

    req.flash("success", "Seu usuário foi criado com sucesso.");
    req.session.save(() => {
      return res.redirect("/account/sign-in");
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.signIn = (req, res) => {
  res.render("sign-in");
};

exports.signUp = (req, res) => {
  res.render("sign-up");
};
