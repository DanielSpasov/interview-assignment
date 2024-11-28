import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { message } from 'antd';

export const useDeletePost = () => {
  const handleDelete = useCallback(
    async (postId: number, onSuccessCallback?: (postId: number) => void) => {
      try {
        await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

        if (onSuccessCallback) onSuccessCallback(postId);

        message.success('Post deleted successfully.');
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

  return { handleDelete };
};
