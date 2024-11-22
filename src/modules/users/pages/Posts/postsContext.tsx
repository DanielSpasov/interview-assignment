import { createContext, FC, ReactNode, useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

import { Post } from '../../../../shared/types/Post';

type PostsContextState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: (userId: number) => Promise<void>;
  updatePost: (postId: number, updatedData: Post) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
};

export const PostsContext = createContext<PostsContextState>({
  posts: [],
  loading: true,
  error: null,
  fetchPosts: async () => {},
  updatePost: async () => {},
  deletePost: async () => {}
});

export const PostsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (userId: number) => {
    try {
      setError(null);
      setLoading(true);

      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      setPosts(res.data);
    } catch (err) {
      message.error('Failed to fetch Posts.');
      if (err instanceof AxiosError) {
        setError(err.message);
        return;
      }
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePost = useCallback(async (postId: number, updatedData: Post) => {
    try {
      setError(null);

      await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
        updatedData
      );

      setPosts(prev =>
        prev.map(post =>
          post.id === postId ? { ...post, ...updatedData } : post
        )
      );
      message.success('Post updated successfully.');
    } catch (err) {
      message.error('Failed to update Post.');
      if (err instanceof AxiosError) {
        setError(err.message);
        return;
      }
      setError('Something went wrong.');
    }
  }, []);

  const deletePost = useCallback(async (postId: number) => {
    try {
      setError(null);

      await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );

      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
      message.success('Post deleted successfully.');
    } catch (err) {
      message.error('Failed to delete Post.');
      if (err instanceof AxiosError) {
        setError(err.message);
        return;
      }
      setError('Something went wrong.');
    }
  }, []);

  return (
    <PostsContext.Provider
      value={{ fetchPosts, updatePost, deletePost, posts, loading, error }}
    >
      {children}
    </PostsContext.Provider>
  );
};
