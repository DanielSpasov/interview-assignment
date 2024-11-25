import { Dispatch, SetStateAction } from 'react';

import { Post } from '../../../../../../shared/types/Post';

export type EditPostProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updatePost: (id: number, data: Post) => Promise<void>;
  editedPost: Partial<Post>;
  setEditedPost: Dispatch<SetStateAction<Partial<Post>>>;
  originalPost?: Post;
};
