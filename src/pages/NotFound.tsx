import { Typography } from 'antd';

import PageLayout from '../components/core/PageLayout';

const { Title } = Typography;

const NotFound = () => {
  return (
    <PageLayout title="Page not Found">
      <Title style={{ textAlign: 'center' }}>Page not found</Title>
    </PageLayout>
  );
};

export default NotFound;
