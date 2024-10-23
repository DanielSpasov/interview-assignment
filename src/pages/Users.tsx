import { Button, Collapse, Typography } from 'antd';
import { useEffect } from 'react';

import PageLayout from '../components/core/PageLayout';
import UserData from '../components/common/UserData';

import withUsersProvider from '../components/hoc/withUsersProvider';

import { useAppDispatch, useAppSelector } from '../stores';
import { fetchUsers } from '../stores/users';

const { Title } = Typography;

const Users = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <PageLayout title="Users">
      <Title style={{ textAlign: 'center' }}>Users</Title>

      {data && (
        <Collapse
          items={data.map(user => ({
            id: user.id.toString(),
            label: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {user.name}{' '}
                <Button type="link" href={`/users/${user.id}/posts`}>
                  See Posts
                </Button>
              </div>
            ),
            children: <UserData id={user.id} key={user.id} />
          }))}
          accordion
        />
      )}
    </PageLayout>
  );
};

export default withUsersProvider(Users);
