/** Composante Header de Timtools */
export default class Header {
  /**
   * method constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;
    this.scrollPosition = 0;
    this.scrollLimit = this.element.dataset.pourcentage || 0.1;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;

    this.init();
    this.initNavMobile();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    const hidding = document.querySelector('[data-autohide]');
    if (hidding) {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  /**
   * Méthode qui vérifie que le scroll est effectuer dans la page
   *  * @param {HTMLElement} event - Élément sur lequel il y a eu un évènement
   */
  onScroll(event) {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirectionState();
  }

  /**
   * Méthode qui transforme l'état du Header
   */
  setHeaderState() {
    const scrollHeight = document.scrollingElement.scrollHeight;

    // Gestion des différentes classes lorsqu'on veut avoir
    // Enlève ou met une classe pour changer l'état du header
    if (this.scrollPosition > scrollHeight * this.scrollLimit) {
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }

  /**
   * Méthode qui identifie la direction du scroll
   */
  setDirectionState() {
    // Gestion des différentes classes lorsqu'on veut avoir
    // Enlève ou met une classe pour passer la direction du scroll
    if (this.scrollPosition >= this.lastScrollPosition) {
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      this.html.classList.remove('is-scrolling-down');
      this.html.classList.add('is-scrolling-up');
    }
  }

  /**
   * Méthode d'initialisation du nav mobile
   */
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  /**
   * Méthode d'état du boutton du menu mobile
   */
  onToggleNav() {
    // Enlève ou met une classe pour changer l'état du bouton du menu
    this.html.classList.toggle('nav-is-active');
  }
}
