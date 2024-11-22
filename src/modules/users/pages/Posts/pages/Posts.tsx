import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';

import { Dispatch } from '../../../../../shared/stores/configureStore';
import PageLayout from '../../../../../shared/components/PageLayout';
import { Post as IPost } from '../../../../../shared/types/Post';
import Post from '../../../../../shared/components/Post';

import { fetchUsers, selectUsersState, STATUS } from '../../../usersSlice';
import UserData from '../../../features/UserData';
import { PostsContext } from '../postsContext';
import { EditPost } from './features/EditPost';

const { Paragraph } = Typography;

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

  const { posts, loading, fetchPosts, updatePost, deletePost } =
    useContext(PostsContext);

  useEffect(() => {
    if (status === STATUS.IDLE) dispatch(fetchUsers());
  }, [dispatch, status, id]);

  useEffect(() => {
    (async () => await fetchPosts(Number(id)))();
  }, [fetchPosts, id]);

  return (
    <PageLayout
      title={`${user?.name}'s posts`}
      loading={status === STATUS.LOADING || loading}
      error={error}
    >
      <Card style={{ margin: '1em 0' }}>
        <UserData id={Number(id)} />
      </Card>

      <Row gutter={[16, 16]}>
        {posts.length ? (
          posts.map(post => (
            <Col key={post.id} xs={24} sm={12} md={8}>
              <Post
                {...post}
                onDelete={deletePost}
                onClick={() => {
                  setShowModal(true);
                  setEditedPost(post);
                }}
              />
            </Col>
          ))
        ) : (
          <Paragraph style={{ margin: '0 auto' }}>
            {user?.name} has no posts.
          </Paragraph>
        )}
      </Row>

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
