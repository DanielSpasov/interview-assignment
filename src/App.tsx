import { Provider } from 'react-redux';

import Router from './Router';

import { store } from './shared/stores/configureStore';

const App = () => {
  return (
    <main>
      <Provider store={store}>
        <Router />
      </Provider>
    </main>
  );
};

export default App;
