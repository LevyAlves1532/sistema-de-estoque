import validator from "validator";

import { Messages } from "./messages";

const typeImages = ["image/png","image/jpg","image/jpeg"];

export class FormProducts {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
    this.errors = [];
    this.messages = new Messages(".messages-products");
  }

  init() {
    this.events();
    this.messages.init();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener("click", (e) => {
      const el = e.target;

      if (el.name === "image") {
        el.addEventListener("change", this.loadImage);
      }
    });

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.errors = [];
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;

    const imageInput = el.querySelector('input[name="image"]');
    const titleInput = el.querySelector('input[name="title"]');
    const priceInput = el.querySelector('input[name="price"]');
    const categoriesSelect = el.querySelector('select[name="categories"]');
    const inventoryInput = el.querySelector('input[name="inventory"]');

    if (!imageInput.files[0]) this.errors.push("Selecione uma imagem para o produto!");
    if (imageInput.files[0] && !typeImages.includes(imageInput.files[0].type)) this.errors.push("Este tipo de arquivo não é permitido (*.png, *.jpg)!");
    if (titleInput.value.length < 6 || titleInput.value.length > 50) this.errors.push("O título deve ter entre 6 a 50 caracteres!");
    if (!priceInput.value || isNaN(priceInput.value)) this.errors.push("Preço inválido");
    if (!categoriesSelect.value) this.errors.push("Selecione uma categoria");
    if (!inventoryInput.value || isNaN(inventoryInput.value)) this.errors.push("Estoque inválido");
    
    if (this.errors.length === 0) {
      el.submit();
    } else {
      this.messages.showErrors(this.errors);
    }
  }

  loadImage(e) {
    const previewImageURL = URL.createObjectURL(e.target.files[0]);
    this.form.querySelector("img").src = previewImageURL;
  }
}
