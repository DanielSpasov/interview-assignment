import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';

export const useFetchPosts = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async (userId: string) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
      );

      return res.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.message);
        return;
      }
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, fetchPosts };
};
