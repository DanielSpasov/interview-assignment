import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';

export const useFetchPosts = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async (userId: string) => {
    try {
      setError(null);
      setLoading(true);

      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      return res.data;
    } catch (err) {
      setError(
        err instanceof AxiosError ? err.message : 'Something went wrong.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchPosts };
};
