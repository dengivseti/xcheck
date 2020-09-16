import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from './slices/tasksSlice';
import requestsReducer from './slices/requestsSlice';

import gradeReducer from './slices/GradeSlice';
import reviewsReducer from './slices/reviewsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  requests: requestsReducer,
  reviews: reviewsReducer,
  grade: gradeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
