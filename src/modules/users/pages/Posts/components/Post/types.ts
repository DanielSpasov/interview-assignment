import { Post } from '../../types/Post';

export type PostProps = {
  onClick: () => void;
  onDelete: (id: number) => Promise<void>;
} & Post;
