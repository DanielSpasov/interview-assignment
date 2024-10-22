import { FC, memo, ReactNode, useEffect } from 'react';

import Navbar from './Navbar';

type PageLayoutProps = {
  title: string;
  children?: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <Navbar />

      <div>{children}</div>
    </div>
  );
};

export default memo(PageLayout);
