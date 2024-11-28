import { useContext } from 'react';
import { Card } from 'antd';

import PageLayout from '../../shared/components/PageLayout/PageLayout';
import { PostsContext } from './postsContext';

import EditUser from '../../shared/features/EditUser/EditUser';
import List from '../../pages/posts/sections/List';

const Posts = () => {
  const { loading, user, error } = useContext(PostsContext);

  return (
    <PageLayout title={`${user?.name}'s posts`} loading={loading} error={error}>
      <Card style={{ margin: '1em 0' }}>
        {user && <EditUser user={user} />}
      </Card>

      <List />
    </PageLayout>
  );
};

export default Posts;
