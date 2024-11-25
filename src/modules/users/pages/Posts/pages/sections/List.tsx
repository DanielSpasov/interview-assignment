import { Col, Row, Typography } from 'antd';
import { FC, memo } from 'react';

import { Post as IPost } from '../../../../../../shared/types/Post';

import Post from '../../components/Post';

type ListProps = {
  posts: IPost[];
  onDelete: (postId: number) => void;
  onClick: (post: IPost) => void;
  username?: string;
};

const List: FC<ListProps> = ({ posts, onDelete, onClick, username }) => {
  return (
    <Row gutter={[16, 16]}>
      {posts.length ? (
        posts.map(post => (
          <Col key={post.id} xs={24} sm={12} md={8}>
            <Post {...post} onDelete={onDelete} onClick={onClick} />
          </Col>
        ))
      ) : (
        <Typography.Paragraph style={{ margin: '0 auto' }}>
          {username} has no posts.
        </Typography.Paragraph>
      )}
    </Row>
  );
};

export default memo(List);
