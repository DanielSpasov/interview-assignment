import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Form, message, Modal, Row, Typography } from 'antd';
import { UndoOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import PageLayout from '../components/core/PageLayout';
import Textarea from '../components/common/Textarea';
import UserData from '../components/common/UserData';
import Input from '../components/common/Input';
import Post from '../components/common/Post';

import withUsersProvider from '../components/hoc/withUsersProvider';
import withPostsProvider from '../components/hoc/withPostsProvider';

import { useAppDispatch, useAppSelector } from '../stores';
import { getUser, STATUS } from '../stores/users';
import { PostsContext } from '../contexts/Posts';

import { Post as IPost } from '../types/Post';

const { Title } = Typography;

const Posts = () => {
  const { id = '0' } = useParams();

  const [editedPost, setEditedPost] = useState<Partial<IPost>>({});
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();

  const {
    users: [user],
    status
  } = useAppSelector(store => store.users);

  const { posts, loading, fetchPosts, updatePost, deletePost } =
    useContext(PostsContext);

  useEffect(() => {
    (async () => {
      await fetchPosts(Number(id));
      await dispatch(getUser(id));
    })();
  }, [dispatch]);

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
  }, [editedPost]);

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
    <PageLayout title="Posts" loading={status === STATUS.LOADING || loading}>
      <Title style={{ textAlign: 'center' }}>{user?.name}&apos;s posts</Title>

      <Card style={{ margin: '1em 0' }}>
        <UserData id={Number(id)} />
      </Card>

      <Row gutter={[16, 16]}>
        {posts.map(post => (
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
        ))}
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

        <div
          style={{
            justifyContent: 'end',
            display: 'flex',
            gap: '.5em'
          }}
        >
          <Button
            type="default"
            danger
            icon={<CloseOutlined />}
            onClick={() => {
              setEditedPost({});
              setShowModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="default"
            icon={<UndoOutlined />}
            onClick={handleRevert}
            disabled={!isChanged}
          >
            Revert
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!isChanged}
            icon={<CheckOutlined />}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default withPostsProvider(withUsersProvider(Posts));
