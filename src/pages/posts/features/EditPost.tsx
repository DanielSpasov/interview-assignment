import { ChangeEvent, FC, useContext, useMemo, useState } from 'react';
import { Button, Form, message, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import FormControls from '../../../shared/components/FormControls/FromControls';
import Textarea from '../../../shared/components/Textarea/Textarea';
import Input from '../../../shared/components/Input/Input';
import { Post } from '../../../shared/types/Post';
import { PostsContext } from '../postsContext';

export const EditPost: FC<{ post: Post }> = ({ post }) => {
  const { updatePost } = useContext(PostsContext);

  const [editedPost, setEditedPost] = useState<Post>(post);
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    await updatePost({ postId: editedPost.id, data: editedPost });
    setOpen(false);
  };

  const handleRevert = () => {
    setEditedPost(post);
    message.info('Changes reverted.');
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditedPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isChanged = useMemo(
    () => editedPost.title !== post.title || editedPost.body !== post.body,
    [editedPost, post]
  );

  return (
    <>
      <Button onClick={() => setOpen(true)} icon={<EditOutlined />}>
        Edit
      </Button>

      <Modal
        title="Edit Post"
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
      >
        <Form>
          <Input
            label="Title"
            name="title"
            onChange={handleChange}
            value={editedPost.title}
          />

          <Textarea
            label="Body"
            name="body"
            onChange={handleChange}
            value={editedPost.body}
          />
        </Form>

        <FormControls
          disableRevert={!isChanged}
          disableSubmit={!isChanged}
          onSubmit={handleSubmit}
          onRevert={handleRevert}
          onCancel={() => {
            setEditedPost(post);
            setOpen(false);
          }}
        />
      </Modal>
    </>
  );
};
