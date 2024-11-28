import { useContext } from 'react';
import { Card } from 'antd';

import PageLayout from '../../shared/components/PageLayout/PageLayout';
import { PostsContext } from './postsContext';

import EditUser from '../../shared/features/EditUser/EditUser';
import List from '../../pages/posts/sections/List';

const Posts = () => {
  const { loading, user, error } = useContext(PostsContext);

  return (
    <PageLayout title={`${user?.name}'s posts`} loading={loading} error={error}>
      <Card style={{ margin: '1em 0' }}>
        {user && <EditUser user={user} />}
      </Card>

      <List />

      {/* <EditPost
        open={showModal}
        setOpen={setShowModal}
        updatePost={updatePost}
        editedPost={editedPost}
        setEditedPost={setEditedPost}
        originalPost={posts.find(post => post.id === editedPost?.id)}
      /> */}
    </PageLayout>
  );
};

export default Posts;
