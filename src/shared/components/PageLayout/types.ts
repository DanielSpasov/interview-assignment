import { ReactNode } from 'react';

export type PageLayoutProps = {
  title: string;
  loading?: boolean;
  error?: string | null;
  children?: ReactNode;
};
