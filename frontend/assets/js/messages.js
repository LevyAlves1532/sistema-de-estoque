export class Messages {
  constructor(messagesClass) {
    this.messages = document.querySelector(messagesClass);
  }

  init() {
    this.renderInit();
  }

  renderInit() {
    if (!this.messages) return;

    const row = document.createElement("div");
    row.classList.add("row");

    row.innerHTML = '<div class="col my-3"></div>';

    this.messages.appendChild(row);
  }

  showErrors(errors = []) {
    const col = this.messages.querySelector(".col");
    col.innerHTML = "";

    const alert = document.createElement("div");
    alert.classList.add("alert", "alert-danger");

    if (errors.length > 0) {
      alert.innerHTML = errors.join("<br/>");
      col.appendChild(alert);
    }
  }
}
