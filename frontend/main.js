import "core-js/stable";
import "regenerator-runtime/runtime";

import './assets/css/style.css';

import { FormCategories } from "./assets/js/form-categories";
import { FormProducts } from "./assets/js/form-products";
import { FormAccount } from "./assets/js/form-account";
import { FormProfile } from "./assets/js/form-profile";

(function() {
  const formCategories = new FormCategories(".form-categories");
  formCategories.init();

  const formProducts = new FormProducts(".form-products");
  formProducts.init();

  const formProfile = new FormProfile(".form-profile");
  formProfile.init();

  const formAccount = new FormAccount(".form-account");
  formAccount.init();
})()
