import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';

import { Dispatch } from '../../shared/stores/configureStore';
import PageLayout from '../../shared/components/PageLayout/PageLayout';
import { PostsContext } from '../../shared/contexts/posts';
import { Post as IPost } from '../../shared/types/Post';

import { fetchUsers, selectUsersState, STATUS } from '../users/usersSlice';
import EditUser from '../users/features/EditUser/EditUser';
import List from '../../pages/posts/sections/List';
import EditPost from './features/EditPost';

const Posts = () => {
  const { id = '0' } = useParams();

  const [editedPost, setEditedPost] = useState<Partial<IPost>>({});
  const [showModal, setShowModal] = useState(false);

  const { users, error, status } = useSelector(selectUsersState);
  const dispatch = useDispatch<Dispatch>();

  const user = useMemo(
    () => users.find(user => user.id === Number(id)),
    [id, users]
  );

  const { posts, loading, fetchPosts, updatePost, deletePost, userId } =
    useContext(PostsContext);

  useEffect(() => {
    if (status === STATUS.IDLE) dispatch(fetchUsers());
  }, [dispatch, status, id]);

  useEffect(() => {
    (async () => {
      if (userId === id) return;
      await fetchPosts(id);
    })();
  }, [fetchPosts, id, userId]);

  return (
    <PageLayout
      title={`${user?.name}'s posts`}
      loading={status === STATUS.LOADING || loading}
      error={error}
    >
      <Card style={{ margin: '1em 0' }}>
        <EditUser id={Number(id)} />
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
