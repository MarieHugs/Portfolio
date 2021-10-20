/** Composante Scrolly de Timtools */
export default class Scrolly {
  /**
   * Méthode constructeur
   * @param {HTMLElement} element - Élément HTML sur lequel la composante est instanciée
   */
  constructor(element) {
    this.element = element;

    // définit la zone d'affichage
    this.options = {
      rootMargin: '0px 0px 0px 0px',
    };
    this.init();
  }

  /**
   * Méthode d'initialisation
   */
  init() {
    this.observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options
    );

    const items = this.element.querySelectorAll('[data-scrolly]');

    // Permet de cibler chaque élément pour tous les observer
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      this.observer.observe(item);
    }
  }

  /**
   * Méthode d'observation de l'intersection entre les éléments et la zone d'affichage
   */
  watch(entries) {
    // Permet de naviguer à travers tous les éléments que l'ont veux ciblé
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      // Gestion des différentes classes lorsqu'on veut avoir
      // Enlève ou met une classe pour changer l'état de l'élément ciblé
      if (entry.isIntersecting) {
        target.classList.add('is-active');
        this.observer.unobserve(target);
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
