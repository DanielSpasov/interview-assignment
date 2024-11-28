import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { message } from 'antd';

import { fetchUsers, selectUsersState } from '../users/usersSlice';
import { Dispatch } from '../../shared/stores/configureStore';
import { STATUS } from '../../shared/utils/constants';
import { User } from '../../shared/types/User';
import { Post } from '../../shared/types/Post';

type PostsContextState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: (userId: string) => Promise<void>;
  updatePost: (postId: number, updatedData: Post) => Promise<void>;
  deletePost: (postId: number) => Promise<void>;
  user?: User;
};

const initialState = {
  posts: [],
  loading: true,
  error: null,
  fetchPosts: async () => {},
  updatePost: async () => {},
  deletePost: async () => {}
};

export const PostsContext = createContext<PostsContextState>(initialState);

export const PostsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { id = '0' } = useParams();

  const { users, status } = useSelector(selectUsersState);
  const dispatch = useDispatch<Dispatch>();

  const [user, setUser] = useState<User>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // useEffect(() => {
  //   setUser(users.find(user => user.id === Number(id)));
  // }, [users, user?.id, id]);

  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async (userId: string) => {
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

  useEffect(() => {
    (async () => {
      if (id === '0' || !users.length) return;

      if (!user || user?.id !== Number(id)) {
        setUser(users.find(user => user.id === Number(id)));
        await fetchPosts(id);
      }
    })();
  }, [fetchPosts, id, user, users]);

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
      value={{
        fetchPosts,
        updatePost,
        deletePost,
        posts,
        loading: loading || status === STATUS.LOADING,
        error,
        user
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};
