import { FC, memo } from 'react';
import { Card } from 'antd';

import { Post as IPost } from '../../../shared/types/Post';
import { DeletePost } from '../features/DeletePost';
import { EditPost } from '../features/EditPost';

const Post: FC<{ post: IPost }> = ({ post }) => {
  return (
    <Card title={post.title} hoverable>
      <Card.Meta description={post.body} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          gap: '.5em',
          marginTop: '10px'
        }}
      >
        <EditPost post={post} />
        <DeletePost id={post.id} />
      </div>
    </Card>
  );
};

export default memo(Post);
