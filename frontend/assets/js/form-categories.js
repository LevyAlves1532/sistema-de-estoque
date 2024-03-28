import { Messages } from "./messages";

function formatarString(str) {
  // Remove acentos
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Converte para minúsculas
  str = str.toLowerCase();
  
  // Remove caracteres especiais e substitui espaços por underline
  str = str.replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
  
  return str;
}

export class  FormCategories {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
    this.errors = [];
    this.messages = new Messages(".messages-categories");
  }

  init() {
    this.events();
    this.messages.init();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener("click", (e) => {
      const el = e.target;
      if (el.name === "name") {
        el.addEventListener("keyup", e => this.loadSlug(e.target.value));
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
    const nameInput = el.querySelector('input[name="name"]');
    const slugInput = el.querySelector('input[name="slug"]');

    if (nameInput.value.length < 3 || nameInput.value.length > 20) this.errors.push("O nome da categoria precisa ter entre 3 à 20 caracteres!");
    if (slugInput.value.includes(" ") || /[A-Z]/.test(slugInput.value) 
      || /[^\w\s-]/.test(slugInput.value.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))) this.errors.push("Slug invalído!");

    if (this.errors.length === 0) {
      el.submit();
    } else {
      this.messages.showErrors(this.errors);
    }
  }

  loadSlug(value) {
    const slug = formatarString(value);
    this.form.querySelector('input[name="slug"]').value = slug;
  }
}
