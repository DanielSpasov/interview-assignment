import { Outlet } from 'react-router-dom';

import { PostsProvider } from '../../../pages/posts/postsContext';

const PostsLayout = () => {
  return (
    <PostsProvider>
      <Outlet />
    </PostsProvider>
  );
};

export default PostsLayout;
