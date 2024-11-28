import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { FC, useContext } from 'react';

import { PostsContext } from '../postsContext';

export const DeletePost: FC<{ id: number }> = ({ id }) => {
  const { deletePost } = useContext(PostsContext);

  return (
    <Popconfirm
      title="Are you sure you want to delete this post?"
      onConfirm={() => deletePost(id)}
      okText="Yes"
      cancelText="No"
    >
      <Button danger icon={<DeleteOutlined />}>
        Delete
      </Button>
    </Popconfirm>
  );
};
