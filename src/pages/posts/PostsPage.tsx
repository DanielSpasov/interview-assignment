import { useContext, useState } from 'react';
import { Card } from 'antd';

import PageLayout from '../../shared/components/PageLayout/PageLayout';
import { Post as IPost } from '../../shared/types/Post';
import { PostsContext } from './postsContext';

import EditUser from '../../shared/features/EditUser/EditUser';
import List from '../../pages/posts/sections/List';
import EditPost from './features/EditPost';

const Posts = () => {
  const [editedPost, setEditedPost] = useState<Partial<IPost>>({});
  const [showModal, setShowModal] = useState(false);

  const { posts, loading, updatePost, deletePost, user, error } =
    useContext(PostsContext);

  return (
    <PageLayout title={`${user?.name}'s posts`} loading={loading} error={error}>
      <Card style={{ margin: '1em 0' }}>
        {user && <EditUser user={user} />}
      </Card>

      <List
        posts={posts}
        onDelete={deletePost}
        onEdit={post => {
          setShowModal(true);
          setEditedPost(post);
        }}
        username={user?.name}
      />

      <EditPost
        open={showModal}
        setOpen={setShowModal}
        updatePost={updatePost}
        editedPost={editedPost}
        setEditedPost={setEditedPost}
        originalPost={posts.find(post => post.id === editedPost?.id)}
      />
    </PageLayout>
  );
};

export default Posts;
