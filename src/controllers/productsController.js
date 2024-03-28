const multer = require("multer");

const CategoriesModel = require("../models/CategoriesModel");
const ProductsModel = require("../models/ProductsModel");

const parser = multer({ dest: "../../public/assets/uploads/" });

exports.index = async (req, res) => {
  const productsModel = new ProductsModel();
  const products = await productsModel.getAllFromIdUser(req.session.user._id);

  res.render("products", { 
    products: products.map(product => {
      product.price = Number(product.price).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      return product;
    }),
  });
};

exports.delete = async (req, res) => {
  if (!req.params.id) return res.render("404");

  const product = await new ProductsModel().del(req.params.id);
  if (!product) return res.render("404");

  req.flash("success", "Produto apagado com sucesso.");
  req.session.save(() => res.redirect("/products"));
  return;
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return;
    let newImage = req.file ? req.file.filename : null;

    const productsModel = new ProductsModel(req.body);
    const product = await productsModel.get(req.params.id);

    if (product) {
      await productsModel.up(req.params.id, product.image, newImage);
    }

    if (productsModel.errors.length > 0) {
      req.flash("errors", productsModel.errors);
      req.session.save(() => res.redirect(`/products/${req.params.id}`));
      return;
    }

    req.flash("success", "Produto editado com sucesso.");
    req.session.save(() => res.redirect(`/products/${productsModel.product._id}`));
  } catch(e) {
    console.log(e);
    res.render("404");
  }
};

exports.form = (edit) => async (req, res) => {
  let data = null;

  const categories = await new CategoriesModel().getAllFromIdUser(req.session.user._id);

  if (edit) {
    data = await new ProductsModel().get(req.params.id);

    if (!data) {
      res.render("404");
      return;
    }
  }

  res.render("products-form", { data, categories });
};

exports.register = async (req, res) => {
  if (req.file) {
    try {
      const productsModel = new ProductsModel(req.body);
      await productsModel.set(req.session.user._id, req.file.filename);
    
      if (productsModel.errors.length > 0) {
        req.flash("errors", productsModel.errors);
        req.session.save(() => {
          return res.redirect("/products/add");
        });
        return;
      }
    
      req.flash("success", "Seu produto foi criado com sucesso.");
      req.session.save(() => {
        return res.redirect("/products");
      });;
    } catch(e) {
      console.log(e);
      res.render("404");
    }
  } else {
    req.flash("errors", ["Precisa ser enviado a imagem do produto"]);
    req.session.save(() => {
      return res.redirect("/products/add");
    });
  }
};
