import validator from "validator";

import { Messages } from "./messages";

export class FormAccount {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
    this.errors = [];
    this.messages = new Messages(".messages-account");
  }

  init() {
    this.events();
    this.messages.init();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.errors = [];
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;

    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');

    if (!emailInput.value || !validator.isEmail(emailInput.value)) this.errors.push("E-mail inválido!");
    if (passwordInput.value.length < 6 || passwordInput.value.length > 12) this.errors.push("Senha precisa estar entre 6 e 12 caracteres!");

    if (this.errors.length === 0) {
      el.submit();
    } else {
      this.messages.showErrors(this.errors);
    }
  }
}
