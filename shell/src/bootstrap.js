// Example dynamic import from React microfrontend
import('reactApp/App').then(({ default: mount }) => {
  mount('#react-root');
});
