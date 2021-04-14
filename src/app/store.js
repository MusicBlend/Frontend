import { configureStore } from '@reduxjs/toolkit';
import idReducer from '../Communities/idSlice';
import usernameReducer from '../Communities/usernameSlice'

export default configureStore({
  reducer: {
    id : idReducer,
    username : usernameReducer
  },
});
