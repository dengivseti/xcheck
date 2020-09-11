import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import crossCheckTaskReducer from './slices/crossCheckTaskSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  crossCheckTask: crossCheckTaskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
