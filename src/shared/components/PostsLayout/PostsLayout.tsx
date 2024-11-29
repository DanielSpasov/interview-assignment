import { Outlet } from 'react-router-dom';

import { PostsProvider } from '../../../pages/posts/postsContext';

export const PostsLayout = () => {
  return (
    <PostsProvider>
      <Outlet />
    </PostsProvider>
  );
};
