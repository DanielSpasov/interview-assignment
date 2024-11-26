import { Provider } from 'react-redux';

import Router from './Router';

import { PostsProvider } from './pages/posts/postsContext';
import { store } from './shared/stores/configureStore';

const App = () => {
  return (
    <main>
      <PostsProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </PostsProvider>
    </main>
  );
};

export default App;
