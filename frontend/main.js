import "core-js/stable";
import "regenerator-runtime/runtime";

import './assets/css/style.css';

import { FormCategories } from "./assets/js/form-categories";

(function() {
  const formCategories = new FormCategories(".form-categories");
  formCategories.init();
})()
