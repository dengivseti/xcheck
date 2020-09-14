import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { ITask } from '../../interfaces/interfaces';
import axios from 'axios';

interface IListTaskState {
  isLoading: boolean;
  tasks: ITask[];
}

const initialState: IListTaskState = {
  isLoading: false,
  tasks: [],
};

const url = process.env.REACT_APP_URI_DB;

const listTasks = createSlice({
  name: 'listTasks',
  initialState,
  reducers: {
    getFetchStart(state) {
      state.isLoading = true;
    },
    setTasks(state, action: PayloadAction<ITask[]>) {
      state.isLoading = false;
      state.tasks = action.payload;
    },
  },
});

export const { getFetchStart, setTasks } = listTasks.actions;

export default listTasks.reducer;

export const fetchListTasks = (): AppThunk => async (dispatch) => {
  dispatch(getFetchStart());
  const res = await axios.get(`${url}tasks`);
  if (!res.data) {
    //TODO обработка ошибок
    dispatch(setTasks([]));
    return;
  }
  dispatch(setTasks([...res.data]));
};
