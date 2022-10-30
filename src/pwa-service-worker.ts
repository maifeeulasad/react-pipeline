import { registerSW } from 'virtual:pwa-register';

const init = () => {
  if ('serviceWorker' in navigator) {
    registerSW();
  }
};

export { init };
