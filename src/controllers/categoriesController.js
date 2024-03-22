const CategoriesModel = require("../models/CategoriesModel");

exports.index = async (req, res) => {
  const categories = await new CategoriesModel().getAllFromIdUser(req.session.user._id);

  res.render("categories", { categories });
  return;
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const category = await new CategoriesModel().del(req.params.id);
  if (!category) return res.render("404");

  req.flash("success", "Categoria apagada com sucesso.");
  req.session.save(() => res.redirect("/categories"));
  return;
};

exports.form = (edit) => async (req, res) => {
  let data = null;
  
  if (edit) {
    data = await new CategoriesModel().get(req.params.id);

    if (!data) {
      res.render("404");
      return;
    }
  }

  res.render("categories-form", { data });
  return;
};

exports.register = async (req, res) => {
  try {
    const categoriesModel = new CategoriesModel(req.body);
    await categoriesModel.set(req.session.user._id);

    if (categoriesModel.errors.length > 0) {
      req.flash("errors", categoriesModel.errors);
      req.session.save(() => {
        return res.redirect("/categories/add");
      });
      return;
    }

    req.flash("success", "Sua categoria foi criada co sucesso.");
    req.session.save(() => {
      return res.redirect("/categories");
    });
  } catch(e) {
    console.log(e);
    res.render("404");
  }
}

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return;

    const categoriesModel = new CategoriesModel(req.body);
    await categoriesModel.up(req.params.id);

    if (categoriesModel.errors.length > 0) {
      req.flash("errors", categoriesModel.errors);
      req.session.save(() => res.redirect(`/categories/${req.params.id}`));
      return;
    }

    req.flash("success", "Categoria editada com sucesso.");
    req.session.save(() => res.redirect(`/categories/${categoriesModel.category._id}`));
  } catch(e) {
    console.log(e);
    res.render("404");
  }
}
