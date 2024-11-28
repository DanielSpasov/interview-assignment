import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { message } from 'antd';

import { Post } from '../../../shared/types/Post';

export type UpdateProps = { postId: number; data: Post };
type HandleUpdateProps = UpdateProps & {
  onSuccessCallback: (props: UpdateProps) => void;
};

export const useUpdatePost = () => {
  const handleUpdate = useCallback(
    async ({ data, postId, onSuccessCallback }: HandleUpdateProps) => {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${postId}`,
          data
        );

        if (onSuccessCallback) onSuccessCallback({ data, postId });
        message.success('Post updated successfully.');
      } catch (err) {
        if (err instanceof AxiosError) {
          message.error(err.message);
          return;
        }
        message.error('Something went wrong.');
      }
    },
    []
  );

  return { handleUpdate };
};
