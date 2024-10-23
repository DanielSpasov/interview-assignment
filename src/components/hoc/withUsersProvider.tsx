import { ComponentType, FC } from 'react';
import { Provider } from 'react-redux';

import { store } from '../../stores';

const withUsersProvider = (Component: ComponentType) => {
  const WithUsersProvider: FC = props => {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  };

  return WithUsersProvider;
};

export default withUsersProvider;
