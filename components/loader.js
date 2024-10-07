export const mountLoader = (text = 'LOADING...') => {
  unmountLoader();

  const loader = document.createElement('div');
  loader.className = 'page-loader';
  loader.innerHTML = text;

  document.querySelector('.page-content').appendChild(loader);
};

export const unmountLoader = () => {
  document.querySelector('.page-loader')?.remove();
};
