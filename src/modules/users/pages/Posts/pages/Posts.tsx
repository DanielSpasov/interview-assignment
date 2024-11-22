import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Form, message, Modal, Row, Typography } from 'antd';

import FormControls from '../../../../../shared/components/FormControls';
import { Dispatch } from '../../../../../shared/stores/configureStore';
import PageLayout from '../../../../../shared/components/PageLayout';
import Textarea from '../../../../../shared/components/Textarea';
import { Post as IPost } from '../../../../../shared/types/Post';
import Input from '../../../../../shared/components/Input/Input';
import Post from '../../../../../shared/components/Post';

import { getUser, selectUsersState, STATUS } from '../../../usersSlice';
import UserData from '../../../features/UserData';
import { PostsContext } from '../postsContext';

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
    if (!user) dispatch(getUser(Number(id)));
    (async () => await fetchPosts(Number(id)))();
  }, [dispatch, fetchPosts, id, user]);

  console.log('rerender');

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleRevert = useCallback(() => {
    const originalPost = posts.find(post => post.id === editedPost?.id);
    if (!originalPost) return;

    setEditedPost(originalPost);
    message.info('Changes reverted.');
  }, [editedPost?.id, posts]);

  const handleSubmit = useCallback(async () => {
    if (!editedPost?.id) return;

    await updatePost(editedPost.id, editedPost as IPost);
    setShowModal(false);
    setEditedPost({});
  }, [editedPost, updatePost]);

  const isChanged = useMemo(() => {
    if (!editedPost?.id) return false;

    const originalPost = posts.find(post => post.id === editedPost?.id);
    if (!originalPost) return false;

    return (
      editedPost?.title !== originalPost?.title ||
      editedPost?.body !== originalPost?.body
    );
  }, [editedPost, posts]);

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

      <Modal
        title="Edit Post"
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditedPost({});
        }}
        footer={null}
      >
        <Form>
          <Input
            label="Title"
            name="title"
            onChange={handleInputChange}
            value={editedPost?.title}
          />

          <Textarea
            label="Body"
            name="body"
            onChange={handleInputChange}
            value={editedPost?.body}
          />
        </Form>

        <FormControls
          disableRevert={!isChanged}
          disableSubmit={!isChanged}
          onSubmit={handleSubmit}
          onRevert={handleRevert}
          onCancel={() => {
            setEditedPost({});
            setShowModal(false);
          }}
        />
      </Modal>
    </PageLayout>
  );
};

export default Posts;
