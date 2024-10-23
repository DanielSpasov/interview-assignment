import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm } from 'antd';
import { FC, memo } from 'react';

import { Post as IPost } from '../../types/Post';

type PostProps = {
  onClick: () => void;
  onDelete: (id: number) => Promise<void>;
} & IPost;

const Post: FC<PostProps> = ({ title, body, id, onClick, onDelete }) => {
  return (
    <Card title={title} hoverable>
      <Card.Meta description={body} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          gap: '.5em',
          marginTop: '10px'
        }}
      >
        <Button onClick={onClick} icon={<EditOutlined />}>
          Edit
        </Button>

        <Popconfirm
          title="Are you sure you want to delete this post?"
          onConfirm={() => onDelete(id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
};

export default memo(Post);
