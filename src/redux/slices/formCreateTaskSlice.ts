import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITaskItem, typeTaskState } from '../../interfaces/interfaces';
import { AppThunk } from '../store';
import axios from 'axios';

interface ICreateTaskState {
  title: string;
  author: string;
  state: typeTaskState;
  categoriesOrder: Array<string>;
  items: ITaskItem[];
  isLoading: boolean;
}

const initialState: ICreateTaskState = {
  title: '',
  author: '',
  categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
  state: 'DRAFT',
  items: [],
  isLoading: false,
};
const url = process.env.REACT_APP_URI_DB;

const formCreateTask = createSlice({
  name: 'formCreateTask',
  initialState,
  reducers: {
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setCategoriesOrder(state, action: PayloadAction<Array<string>>) {
      state.categoriesOrder = action.payload;
    },
    setItems(state, action: PayloadAction<ITaskItem[]>) {
      state.items = action.payload;
    },
    setState(state, action: PayloadAction<typeTaskState>) {
      state.state = action.payload;
    },
    sendStart(state) {
      state.isLoading = true;
    },
    sendFinish(state) {
      state = initialState;
    },
  },
});

export const {
  sendFinish,
  sendStart,
  setAuthor,
  setCategoriesOrder,
  setItems,
  setState,
  setTitle,
} = formCreateTask.actions;

export default formCreateTask.reducer;

export const sendTask = (value): AppThunk => async (dispatch) => {
  dispatch(sendStart());
  const response = await axios.post(`${url}tasks`, value);
  if (response.data) {
    // TODO обработка ошибок
    console.log('RESPONSE:', response.data);
  }
  dispatch(sendFinish());
};
