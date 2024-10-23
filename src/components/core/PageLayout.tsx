import { FC, memo, ReactNode, useEffect } from 'react';
import { Alert, Typography } from 'antd';

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
    if (loading) {
      document.title = 'Loading...';
      return;
    }
    document.title = title;
  }, [title, loading]);

  return (
    <section>
      <Navbar />

      {loading ? (
        <Title style={{ textAlign: 'center' }}>Loading...</Title>
      ) : error ? (
        <Alert
          message="Something went wrong."
          description={error}
          type="error"
        />
      ) : (
        <>
          <Title style={{ textAlign: 'center' }}>{title}</Title>
          {children}
        </>
      )}
    </section>
  );
};

export default memo(PageLayout);
