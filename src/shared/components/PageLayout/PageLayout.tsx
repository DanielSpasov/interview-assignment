import { FC, useEffect, ReactNode } from 'react';
import { Alert, Typography } from 'antd';

import Navbar from '../Navbar/Navbar';

export type PageLayoutProps = {
  title: string;
  loading?: boolean;
  error?: string | null;
  children?: ReactNode;
};

const { Title } = Typography;

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

export default PageLayout;
