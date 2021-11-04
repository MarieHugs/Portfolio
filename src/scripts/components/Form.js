export default class From {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */

  constructor(element) {
    this.element = element;
    this.formElements = this.element.elements;

    this.init();
  }
  /**
   * methode d'initialisation
   */
  init() {
    this.element.setAttribute('novalidate', '');

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required) {
        input.addEventListener('input', this.validateInput.bind(this));
      }
    }

    this.element.addEventListener('submit', this.onSubmit.bind(this));
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.validate()) {
      console.log('success');

      this.showConfirmation();
      this.xhrRequest();
    } else {
      console.log('fail');
    }
  }

  /**
   * method description
   * @param {boolean} validate - status de la validation
   */
  validate() {
    let isValid = true;

    for (let i = 0; i < this.formElements.length; i++) {
      const input = this.formElements[i];

      if (input.required && !this.validateInput(input)) {
        isValid = false;
      }
    }

    return isValid;
  }

  validateInput(event) {
    const input = event.currentTarget || event;

    if (input.validity.valid) {
      this.removeError(input);
    } else {
      this.addError(input);
    }

    return input.validity.valid;
  }

  addError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.add('error');
  }

  removeError(input) {
    const container =
      input.closest('[data-input-container]') || input.closest('.input');
    container.classList.remove('error');
  }

  showConfirmation() {
    this.element.classList.add('is-sent');
  }

  xhrRequest(){
    let xhr = new XMLHttpRequest();
      xhr.open('POST', 'mail.php', true);
      xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = xhr.response;
          console.log(response);
        }
      };

      let formData = new FormData(this.element);
      xhr.send(formData);
  }
}
