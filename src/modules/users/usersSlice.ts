import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../shared/stores/configureStore';
import { Dispatch } from '../../shared/stores/configureStore';
import { User } from '../../shared/types/User';

export const STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

const initialState = {
  users: [] as User[],
  status: STATUS.IDLE,
  error: null as string | null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loadingUsers: state => {
      state.status = STATUS.LOADING;
      state.error = null;
    },
    setUsers: (state, action) => {
      state.status = STATUS.SUCCESS;
      state.users = action.payload;
      state.error = null;
    },
    setUsersError: (state, action) => {
      state.status = STATUS.ERROR;
      state.error = action.payload.error.message ?? 'Something went wrong.';
    },
    updateUser: (state, action) => {
      const { id, updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);

      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          username: updatedUser.username,
          email: updatedUser.email,
          phone: updatedUser.phone,
          website: updatedUser.website,
          address: {
            city: updatedUser.city,
            street: updatedUser.street,
            suite: updatedUser.suite,
            zipcode: updatedUser.zipcode,
            geo: state.users[index].address.geo
          },
          company: {
            name: updatedUser.companyName,
            bs: updatedUser.businessService,
            catchPhrase: updatedUser.catchPhrase
          }
        };
      }
    }
  }
});

export const { updateUser, loadingUsers, setUsers, setUsersError } =
  usersSlice.actions;

export const fetchUsers =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    if (getState().users.status === STATUS.SUCCESS) return;

    dispatch(loadingUsers());
    try {
      const res = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch(setUsers(res.data));
    } catch (error) {
      dispatch(setUsersError({ error }));
    }
  };

export const { reducer: usersReducer } = usersSlice;

export const selectUsersState = (state: RootState) => state.users;
