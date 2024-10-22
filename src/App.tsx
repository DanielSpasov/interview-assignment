import { Provider } from 'react-redux';

import { store } from './store';
import Router from './Router';

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
