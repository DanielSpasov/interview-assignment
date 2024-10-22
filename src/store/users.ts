import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = STATUS.SUCCESS;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = STATUS.ERROR;
        state.error = action.error.message ?? 'Something went wrong.';
      });
  }
});

export const { updateUser } = usersSlice.actions;

export default usersSlice.reducer;
