import { ChangeEvent, FC, memo, useCallback, useMemo } from 'react';
import { Form, message, Modal } from 'antd';

import FormControls from '../../../../../../shared/components/FormControls';
import Textarea from '../../../../../../shared/components/Textarea';
import Input from '../../../../../../shared/components/Input/Input';
import { Post } from '../../../../../../shared/types/Post';

import { EditPostProps } from './types';

const EditPost: FC<EditPostProps> = ({
  open,
  setOpen,
  updatePost,
  editedPost,
  setEditedPost,
  originalPost
}) => {
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setEditedPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [setEditedPost]
  );

  const handleRevert = useCallback(() => {
    if (!originalPost) return;

    setEditedPost(originalPost);
    message.info('Changes reverted.');
  }, [originalPost, setEditedPost]);

  const handleSubmit = useCallback(async () => {
    if (!editedPost?.id) return;

    await updatePost(editedPost.id, editedPost as Post);
    setOpen(false);
    setEditedPost({});
  }, [editedPost, updatePost, setEditedPost, setOpen]);

  const isChanged = useMemo(() => {
    if (!editedPost?.id || !originalPost) return false;

    return (
      editedPost?.title !== originalPost?.title ||
      editedPost?.body !== originalPost?.body
    );
  }, [editedPost, originalPost]);

  return (
    <Modal
      title="Edit Post"
      open={open}
      onCancel={() => {
        setOpen(false);
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
          setOpen(false);
        }}
      />
    </Modal>
  );
};

export default memo(EditPost);
