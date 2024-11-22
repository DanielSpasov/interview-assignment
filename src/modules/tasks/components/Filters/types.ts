import { Dispatch, SetStateAction } from 'react';

export type FiltersProps = {
  title: string;
  userId: string;
  completion: string;
  setTitle: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<string>>;
  setCompletion: Dispatch<SetStateAction<string>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
