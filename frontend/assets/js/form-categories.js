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
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;

    this.form.addEventListener("click", (e) => {
      const el = e.target;
      if (el.name === "name") {
        el.addEventListener("keyup", e => this.loadSlug(e.target.value));
      }
    });
  }

  loadSlug(value) {
    const slug = formatarString(value);
    this.form.querySelector('input[name="slug"]').value = slug;
  }
}
