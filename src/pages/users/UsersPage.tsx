import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Collapse } from 'antd';

import { Dispatch, RootState } from '../../shared/stores/configureStore';
import PageLayout from '../../shared/components/PageLayout/PageLayout';

import { selectUsersState, fetchUsers, STATUS } from './usersSlice';
import EditUser from './features/EditUser/EditUser';

const Users = () => {
  const { users, status, error } = useSelector((state: RootState) =>
    selectUsersState(state)
  );
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <PageLayout title="Users" loading={status === STATUS.LOADING} error={error}>
      {users && (
        <Collapse
          items={users.map(user => ({
            id: user.id.toString(),
            label: (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {user.name}
                <Link to={`/users/${user.id}/posts`}>See Posts</Link>
              </div>
            ),
            children: <EditUser id={user.id} key={user.id} />
          }))}
          accordion
        />
      )}
    </PageLayout>
  );
};

export default Users;
