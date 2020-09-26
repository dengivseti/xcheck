import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { ITask } from '../../interfaces/interfaces';
import axios from 'axios';

interface ITaskState {
  isLoading: boolean;
  tasks: ITask[];
  task: ITask | null;
}

const initialState: ITaskState = {
  isLoading: false,
  tasks: [],
  task: null,
};

const url = process.env.REACT_APP_URI_DB;

const tasks = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getFetchStart(state) {
      state.isLoading = true;
    },
    getFetchFinish(state) {
      state.isLoading = false;
    },
    setTasks(state, action: PayloadAction<ITask[]>) {
      state.isLoading = false;
      state.tasks = action.payload;
    },
    setTask(state, action: PayloadAction<ITask>) {
      state.isLoading = false;
      state.task = action.payload;
    },
    clearTask(state) {
      state.task = null;
    },
  },
});

export const {
  getFetchStart,
  setTasks,
  setTask,
  getFetchFinish,
  clearTask,
} = tasks.actions;

export default tasks.reducer;

export const fetchTasks = (): AppThunk => async (dispatch) => {
  dispatch(getFetchStart());
  const response = await axios.get(`${url}tasks`);
  if (!response.data) {
    dispatch(setTasks([]));
    return;
  }
  dispatch(setTasks([...response.data]));
};

export const fetchTask = (id: string): AppThunk => async (dispatch) => {
  dispatch(getFetchStart());
  const response = await axios.get(`${url}tasks/${id}`);
  if (!response.data) {
    return;
  }
  dispatch(setTask(response.data));
};

export const saveTask = (task: ITask): AppThunk => async (dispatch) => {
  dispatch(getFetchStart());
  let response;
  if (!task.id) {
    response = await axios.post(`${url}tasks`, task);
  } else {
    response = await axios.patch(`${url}tasks/${task.id}`, task);
  }
  if (!response.data) {
    console.log('RESPONSE:', response.data);
  }
  dispatch(clearTask());
  dispatch(getFetchFinish());
};
