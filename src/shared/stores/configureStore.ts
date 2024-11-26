import { configureStore } from '@reduxjs/toolkit';

import { usersReducer } from '../../pages/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
