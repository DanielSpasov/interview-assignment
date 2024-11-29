import { useContext } from 'react';
import { Card } from 'antd';

import { PostsContext } from './postsContext';

import PageLayout from '../../shared/components/PageLayout/PageLayout';
import EditUser from '../../shared/features/EditUser/EditUser';
import List from '../../pages/posts/sections/List';

const Posts = () => {
  const { loading, user } = useContext(PostsContext);

  return (
    <PageLayout title={`${user?.name}'s posts`} loading={loading}>
      <Card style={{ margin: '1em 0' }}>
        {user && <EditUser user={user} />}
      </Card>

      <List />
    </PageLayout>
  );
};

export default Posts;
