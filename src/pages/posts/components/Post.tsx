import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FC, memo, MouseEventHandler } from 'react';
import { Button, Card, Popconfirm } from 'antd';

import { Post as IPost } from '../../../shared/types/Post';

export type PostProps = {
  onEdit: MouseEventHandler<HTMLButtonElement>;
  onDelete: (id: number) => Promise<void>;
} & IPost;

const Post: FC<PostProps> = ({ title, body, id, onEdit, onDelete }) => {
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
        <Button onClick={onEdit} icon={<EditOutlined />}>
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
