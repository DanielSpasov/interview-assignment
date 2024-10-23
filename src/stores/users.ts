import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';

import { User } from '../types/User';

export const STATUS = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR'
};

export const fetchUsers = createAsyncThunk<User[]>(
  'users/fetchUsers',
  async () => {
    const res = await axios.get<User[]>(
      'https://jsonplaceholder.typicode.com/users'
    );
    return res.data;
  }
);

export const getUser = createAsyncThunk<User[], string>(
  'users/getUser',
  async id => {
    const res = await axios.get<User>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return [res.data];
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
    status: STATUS.LOADING,
    error: null as string | null
  },
  reducers: {
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
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.error.message ?? 'Something went wrong.';
        message.error('Failed to fetch Users.');
      })
      .addCase(getUser.pending, state => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.error.message ?? 'Something went wrong.';
        message.error('Failed to fetch User.');
      });
  }
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;
