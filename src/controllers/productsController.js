exports.index = (req, res) => {
  res.render("products");
};

exports.form = (edit) => (req, res) => {
  let data = null;
  if (edit) data = { image: "https://casasfreire.agilecdn.com.br/celular-motorola-moto-e13-64g-verde_136928.png", title: "Motorola Moto E13 64G Verde", price: 1280.00, inventory: 16 };

  res.render("products-form", { data });
};

exports.delete = (req, res) => {
  res.redirect("/products");
};
