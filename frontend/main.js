import "core-js/stable";
import "regenerator-runtime/runtime";

import './assets/css/style.css';

import { FormCategories } from "./assets/js/form-categories";
import { FormProducts } from "./assets/js/form-products";

(function() {
  const formCategories = new FormCategories(".form-categories");
  formCategories.init();

  const formProducts = new FormProducts(".form-products");
  formProducts.init();
})()
