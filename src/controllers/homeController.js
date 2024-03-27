const CategoriesModel = require("../models/CategoriesModel");
const ProductsModel = require("../models/ProductsModel");

exports.index = async (req, res) => {
  const categories = await new CategoriesModel().getAllFromIdUser(req.session.user._id);

  let products;

  if (req.query.cs) {
    const category = await new CategoriesModel().getFromSlug(req.query.cs);
    products = await new ProductsModel().getAllFromCategory(req.session.user._id, category._id);
  } else {
    products = await new ProductsModel().getAllFromIdUser(req.session.user._id);
  }

  console.log(products);

  res.render("index", { 
    categories, 
    products: products.map(product => {
      product.price = Number(product.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return product;
    }), 
  });
  return;
};
