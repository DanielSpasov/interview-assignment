import axios, { AxiosError } from 'axios';
import { useCallback } from 'react';
import { message } from 'antd';

import { Post } from '../../../shared/types/Post';

export const useUpdatePost = () => {
  const handleUpdate = useCallback(
    async (post: Post, onSuccessCallback: (post: Post) => void) => {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          post
        );

        if (onSuccessCallback) onSuccessCallback(post);
        message.success('Post updated successfully.');
      } catch (err) {
        message.error(
          err instanceof AxiosError ? err.message : 'Something went wrong.'
        );
      }
    },
    []
  );

  return { handleUpdate };
};
