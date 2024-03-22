const CategoriesModel = require("../models/CategoriesModel");

exports.index = async (req, res) => {
  const categories = await new CategoriesModel().getAllFromIdUser(req.session.user._id);

  res.render("index", { categories });
  return;
};
