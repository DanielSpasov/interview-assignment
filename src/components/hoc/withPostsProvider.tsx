import { ComponentType, FC } from 'react';

import { PostsProvider } from '../../contexts/Posts';

const withPostsProvider = (Component: ComponentType) => {
  const WithPostsProvider: FC = props => {
    return (
      <PostsProvider>
        <Component {...props} />
      </PostsProvider>
    );
  };

  return WithPostsProvider;
};

export default withPostsProvider;
