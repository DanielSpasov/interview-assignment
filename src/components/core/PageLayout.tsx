import { FC, memo, ReactNode, useEffect } from 'react';
import { Typography } from 'antd';

import Navbar from './Navbar';

const { Title } = Typography;

type PageLayoutProps = {
  title: string;
  loading?: boolean;
  error?: string | null;
  children?: ReactNode;
};

const PageLayout: FC<PageLayoutProps> = ({
  title,
  children,
  loading,
  error
}) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <section>
      <Navbar />

      {loading ? (
        <Title style={{ textAlign: 'center' }}>Loading...</Title>
      ) : error ? (
        <Title style={{ textAlign: 'center' }}>{error}</Title>
      ) : (
        children
      )}
    </section>
  );
};

export default memo(PageLayout);
