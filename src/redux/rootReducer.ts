import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import crossCheckTaskReducer from './slices/crossCheckTaskSlice';
import formCreateTaskReducer from './slices/formCreateTaskSlice';
import listTasksReducer from './slices/listTasksSlice';
import listRequestsReducer from './slices/listRequestsSlice';
import formCreateRequestReducer from './slices/formCreateRequestSlice';
import gradeReducer from './slices/GradeSlice';
import formReviewReducer from './slices/formReviewSlice';
import listReviewsReducer from './slices/listReviewsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  crossCheckTask: crossCheckTaskReducer,
  formCreateTask: formCreateTaskReducer,
  formCreateRequest: formCreateRequestReducer,
  formCreateReview: formReviewReducer,
  listTasks: listTasksReducer,
  listRequests: listRequestsReducer,
  listReviews: listReviewsReducer,
  grade: gradeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
