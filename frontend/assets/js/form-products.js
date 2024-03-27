export class FormProducts {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener("click", (e) => {
      const el = e.target;

      if (el.name === "image") {
        el.addEventListener("change", this.loadImage);
      }
    });
  }

  loadImage(e) {
    const previewImageURL = URL.createObjectURL(e.target.files[0]);
    this.form.querySelector("img").src = previewImageURL;
  }
}
