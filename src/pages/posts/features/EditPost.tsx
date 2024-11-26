import { FC, memo, useCallback, useMemo } from 'react';
import { Dispatch, SetStateAction } from 'react';
import { Form, message, Modal } from 'antd';

import FormControls from '../../../shared/components/FormControls/FromControls';
import Textarea from '../../../shared/components/Textarea/Textarea';
import Input from '../../../shared/components/Input/Input';
import { Post } from '../../../shared/types/Post';

export type EditPostProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updatePost: (id: number, data: Post) => Promise<void>;
  editedPost: Partial<Post>;
  setEditedPost: Dispatch<SetStateAction<Partial<Post>>>;
  originalPost?: Post;
};

const EditPost: FC<EditPostProps> = ({
  open,
  setOpen,
  updatePost,
  editedPost,
  setEditedPost,
  originalPost
}) => {
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
          onChange={e =>
            setEditedPost(prev => ({ ...prev, title: e.target.value }))
          }
          value={editedPost?.title}
        />

        <Textarea
          label="Body"
          name="body"
          onChange={e =>
            setEditedPost(prev => ({ ...prev, body: e.target.value }))
          }
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
