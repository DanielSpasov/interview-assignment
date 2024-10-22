import { useEffect } from 'react';
import { Button, Collapse, Typography } from 'antd';

import PageLayout from '../components/core/PageLayout';
import UserData from '../components/UserData';

import { useAppDispatch, useAppSelector } from '../store';
import { fetchUsers } from '../store/users';

const { Title } = Typography;

const Users = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(state => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <PageLayout title="Users">
      <Title>Users</Title>

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

export default Users;
