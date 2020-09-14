import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import axios from 'axios';
import {
  IReviewRequest,
  ITaskItem,
  ITaskOrderItems,
  typeGrade,
  typeReviewRequest,
} from '../../interfaces/interfaces';

interface IRequestState {
  type: typeGrade;
  isLoading: boolean;
  idTask: string | number;
  url: string;
  idRequest?: string | number;
  crossCheckSessionId: null | string;
  titleTask: string;
  author: string;
  state: typeReviewRequest;
  selfGrade: ITaskOrderItems;
  items: ITaskItem[];
  score: number;
}

interface IfetchProps {
  idTask: string;
  titleTask: string;
  items: ITaskItem[];
}

const initialState: IRequestState = {
  type: 'SELFGRADE',
  isLoading: false,
  url: '',
  idTask: '',
  crossCheckSessionId: '',
  titleTask: '',
  author: ',',
  state: 'DRAFT',
  selfGrade: {},
  items: [],
  score: 0,
  idRequest: 0,
};
const url = process.env.REACT_APP_URI_DB;
const formCreateRequest = createSlice({
  name: 'formCreateRequest',
  initialState,
  reducers: {
    setClear(state) {
      state.url = '';
      state.crossCheckSessionId = '';
      state.titleTask = '';
      state.selfGrade = {};
      state.items = [];
      state.score = 0;
      state.state = 'DRAFT';
    },
    setFetchStart(state) {
      state.isLoading = true;
    },
    setFetchFinish(state) {
      state.isLoading = false;
    },
    setAuthor(state, action: PayloadAction<string>) {
      state.author = action.payload;
    },
    setCrossCheckSessionId(state, action: PayloadAction<string>) {
      state.crossCheckSessionId = action.payload;
    },
    setItemTask(state, action: PayloadAction<IfetchProps>) {
      const { idTask, items, titleTask } = action.payload;
      state.isLoading = false;
      state.idTask = idTask;
      state.titleTask = titleTask;
      state.items = items;
    },
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    setState(state, action: PayloadAction<typeReviewRequest>) {
      state.state = action.payload;
    },
    setSelfGrade(state, action: PayloadAction<ITaskOrderItems>) {
      state.selfGrade = action.payload;
    },
    setType(state, action: PayloadAction<typeGrade>) {
      state.type = action.payload;
    },
    setIdRequest(state, action: PayloadAction<string>) {
      state.idRequest = action.payload;
    },
  },
});

export const {
  setFetchStart,
  setState,
  setAuthor,
  setCrossCheckSessionId,
  setFetchFinish,
  setSelfGrade,
  setItemTask,
  setUrl,
  setType,
  setIdRequest,
  setClear,
} = formCreateRequest.actions;
export default formCreateRequest.reducer;

export const fetchTask = (id: string): AppThunk => async (dispatch) => {
  dispatch(setClear());
  dispatch(setFetchStart());
  const responseTask = await axios.get(`${url}tasks/${id}`);
  if (!responseTask.data) {
    // TODO если не вернулись данные
    dispatch(setFetchFinish());
    return;
  }
  const findRequest = await axios.get(`${url}requests?idTask=${id}`);
  if (findRequest.data && findRequest.data.length) {
    console.log(findRequest.data[0]);
    dispatch(setState(findRequest.data[0].state));
    dispatch(setUrl(findRequest.data[0].url));
    dispatch(setSelfGrade(findRequest.data[0].selfGrade));
    dispatch(setType('EDIT'));
    dispatch(setIdRequest(findRequest.data[0].id));
  }

  dispatch(
    setItemTask({
      items: responseTask.data.items,
      titleTask: responseTask.data.title,
      idTask: responseTask.data.id,
    })
  );
};

export const sendReviewRequest = (
  value: IReviewRequest,
  type: typeGrade,
  idRequest = 0
): AppThunk => async (dispatch) => {
  let response;
  if (type === 'EDIT' && idRequest) {
    console.log('обновляес таск', idRequest);
    response = await axios.patch(`${url}requests/${idRequest}`, value);
  } else {
    response = await axios.post(`${url}requests`, value);
  }

  if (!response.data) {
    //TODO обработать ошибки
    return;
  }

  dispatch(setClear());
};
