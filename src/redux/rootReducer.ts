import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import crossCheckTaskReducer from './slices/crossCheckTaskSlice';
import formCreateTaskReducer from './slices/formCreateTaskSlice';
import listTasksReducer from './slices/listTasksSlice';
import formCreateRequestReducer from './slices/formCreateRequestSlice';
import gradeReducer from './slices/GradeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  crossCheckTask: crossCheckTaskReducer,
  formCreateTask: formCreateTaskReducer,
  listTasks: listTasksReducer,
  formCreateRequest: formCreateRequestReducer,
  grade: gradeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
