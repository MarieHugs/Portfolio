export default class Icons {
  static load(path) {
    path = path || 'assets/icons.svg';

    console.log('yup i work!')

    fetch(path)
      .then((res) => {
        return res.text();
      })
      .then((data) => {
        const svg = document.createElement('div');
        svg.style.display = 'none';
        svg.innerHTML = data;
        document.body.appendChild(svg);
      });
  }
}
