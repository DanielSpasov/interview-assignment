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

import { fetchUsers, selectUsersState } from '../users/usersSlice';
import { Dispatch } from '../../shared/stores/configureStore';
import { STATUS } from '../../shared/utils/constants';
import { User } from '../../shared/types/User';
import { Post } from '../../shared/types/Post';

import { useUpdatePost } from './hooks/useUpdatePost';
import { useFetchPosts } from './hooks/useFetchPosts';
import { useDeletePost } from './hooks/useDeletePost';

type PostsContextState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  fetchPosts: (userId: string) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
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

  const { fetchPosts, error, loading } = useFetchPosts();
  const { handleDelete } = useDeletePost();
  const { handleUpdate } = useUpdatePost();

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      if (id === '0' || !users.length) return;

      if (!user || user?.id !== Number(id)) {
        setUser(users.find(user => user.id === Number(id)));
        const userPosts = await fetchPosts(id);
        setPosts(userPosts);
      }
    })();
  }, [fetchPosts, id, user, users]);

  const onUpdatePostSuccess = useCallback((post: Post) => {
    setPosts(prev =>
      prev.map(old => (old.id === post.id ? { ...old, ...post } : old))
    );
  }, []);

  const updatePost = useCallback(
    async (post: Post) => await handleUpdate(post, onUpdatePostSuccess),
    [onUpdatePostSuccess, handleUpdate]
  );

  const onDeletePostSuccess = useCallback((postId: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  }, []);

  const deletePost = useCallback(
    (postId: number) => handleDelete(postId, onDeletePostSuccess),
    [onDeletePostSuccess, handleDelete]
  );

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
