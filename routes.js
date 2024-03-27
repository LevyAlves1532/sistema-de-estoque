const express = require("express");
const route = express.Router();

const middleware = require("./src/middlewares/middlewares");
const uploads = require("./src/middlewares/uploads");;

const homeController = require("./src/controllers/homeController");
const accountController = require("./src/controllers/accountController");
const categoriesController = require("./src/controllers/categoriesController");
const productsController = require("./src/controllers/productsController");

// HOME
route.get("/", middleware.isLogged, homeController.index);

// ACCOUNT
route.get("/account", middleware.isLogged, accountController.index);
route.get("/account/logout", middleware.isLogged, accountController.logout);
route.get("/account/sign-in", accountController.signIn);
route.post("/account/sign-in/user", accountController.login);
route.get("/account/sign-up", accountController.signUp);
route.post("/account/sign-up/user", accountController.register);

// CATEGORIES
route.get("/categories", middleware.isLogged, categoriesController.index);
route.get("/categories/add", middleware.isLogged, categoriesController.form(false));
route.post("/categories/add/form", middleware.isLogged, categoriesController.register);
route.get("/categories/:id", middleware.isLogged, categoriesController.form(true));
route.post("/categories/:id/edit", middleware.isLogged, categoriesController.edit);
route.get("/categories/:id/delete", middleware.isLogged, categoriesController.delete);

// PRODUCTS
route.get("/products", middleware.isLogged, productsController.index);
route.get("/products/add", middleware.isLogged, productsController.form(false));
route.post("/products/add/form", middleware.isLogged, uploads.single("image"), productsController.register);
route.get("/products/:id", middleware.isLogged, productsController.form(true));
route.post("/products/:id/edit", middleware.isLogged, uploads.single("image"), productsController.edit);
route.get("/products/:id/delete", middleware.isLogged, productsController.delete);

module.exports = route;
