import { Alert, Col, Row, Typography } from 'antd';
import { useContext } from 'react';

import { PostsContext } from '../postsContext';
import Post from '../components/Post';

const List = () => {
  const { posts, user, error } = useContext(PostsContext);

  if (error) {
    return (
      <Alert
        message="Failed to fetch posts."
        description={error}
        type="error"
      />
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {posts.length ? (
        posts.map(post => (
          <Col key={post.id} xs={24} sm={12} md={8}>
            <Post post={post} />
          </Col>
        ))
      ) : (
        <Typography.Paragraph style={{ margin: '0 auto' }}>
          {user?.username} has no posts.
        </Typography.Paragraph>
      )}
    </Row>
  );
};

export default List;
