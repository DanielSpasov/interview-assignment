import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../../shared/stores/configureStore';
import { Dispatch } from '../../shared/stores/configureStore';
import { STATUS } from '../../shared/utils/constants';
import { User } from '../../shared/types/User';

const initialState = {
  users: [] as User[],
  status: STATUS.IDLE,
  error: null as string | null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setLoading: state => {
      state.status = STATUS.LOADING;
      state.error = null;
    },
    setUsers: (state, action) => {
      state.status = STATUS.SUCCESS;
      state.users = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.status = STATUS.ERROR;
      state.error = action.payload.error.message ?? 'Something went wrong.';
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(
        user => user.id === action.payload.id
      );

      if (index !== -1) {
        state.users[index] = {
          ...state.users[index],
          ...action.payload.updatedUser
        };
      }
    }
  }
});

export const { updateUser, setLoading, setUsers, setError } =
  usersSlice.actions;

export const fetchUsers =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    if (getState().users.status !== STATUS.IDLE) return;

    dispatch(setLoading());
    try {
      const res = await axios.get<User[]>(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch(setUsers(res.data));
    } catch (error) {
      dispatch(setError({ error }));
    }
  };

export const { reducer: usersReducer } = usersSlice;

export const selectUsersState = (state: RootState) => state.users;
