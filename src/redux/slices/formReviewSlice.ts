import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import axios from 'axios';
import {
  IReview,
  ITaskOrderItems,
  typeGrade,
  typeReview,
} from '../../interfaces/interfaces';
import { fetchTask } from './formCreateRequestSlice';

interface IReviewState {
  isLoading: boolean;
  idTask: string;
  idRequest: string;
  id: string;
  crossCheckSessionId: null | string;
  author: string;
  state: typeReview;
  grade: ITaskOrderItems;
  score: number;
  type: typeGrade;
}

interface IPayloadProps {
  idTask: string;
  idRequest: string;
  id: string;
  crossCheckSessionId: null | string;
  author: string;
  state: typeReview;
  grade: ITaskOrderItems;
  score: number;
}

const initialState: IReviewState = {
  isLoading: false,
  idTask: '',
  idRequest: '',
  crossCheckSessionId: '',
  author: '',
  state: 'PUBLISHED',
  grade: {},
  score: 0,
  type: 'REVIEW',
  id: '',
};

const url = process.env.REACT_APP_URI_DB;
const formCreateReview = createSlice({
  name: 'formCreateReview',
  initialState,
  reducers: {
    setFetchStart(state) {
      state.isLoading = true;
    },
    setFetchFinish(state) {
      state.isLoading = false;
    },
    setStateReview(state, action: PayloadAction<typeReview>) {
      state.state = action.payload;
    },
    setType(state, action: PayloadAction<typeGrade>) {
      state.type = action.payload;
    },
    setIdTask(state, action: PayloadAction<string>) {
      state.idTask = action.payload;
    },
    setClear(state) {
      state = initialState;
    },
    setValues(st, action: PayloadAction<IPayloadProps>) {
      const {
        author,
        crossCheckSessionId,
        grade,
        id,
        idRequest,
        idTask,
        score,
        state,
      } = action.payload;
      st.isLoading = false;
      st.author = author;
      st.crossCheckSessionId = crossCheckSessionId;
      st.grade = grade;
      st.id = id;
      st.idRequest = idRequest;
      st.idTask = idTask;
      st.score = score;
      st.state = state;
      st.type = 'EDIT';
    },
  },
});

export const {
  setStateReview,
  setType,
  setValues,
  setFetchStart,
  setIdTask,
  setFetchFinish,
  setClear,
} = formCreateReview.actions;

export default formCreateReview.reducer;

export const sendReview = (
  value: IReview,
  type: typeGrade,
  idRequest = 0
): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  let response;
  if (type === 'EDIT' && idRequest) {
    response = await axios.patch(`${url}reviews/${idRequest}`, value);
  } else {
    response = await axios.post(`${url}reviews`, value);
  }
  if (!response.data) {
    //TODO обработать ошибки
    return;
  }
  dispatch(setFetchFinish());
};

export const fetchRequest = (id: string, user: string): AppThunk => async (
  dispatch
) => {
  dispatch(setClear());
  dispatch(setFetchStart());
  const responseReview = await axios.get(`${url}requests/${id}`);
  if (!responseReview.data) {
    // TODO если не вернулись данные
    dispatch(setFetchFinish());
    return;
  }
  const response = await axios.get(
    `${url}reviews?idRequest=${id}&author=${user}`
  );
  console.log(
    'user',
    user,
    'responseReview.data.author',
    responseReview.data.author
  );
  if (response.data && response.data.length) {
    dispatch(setValues(response.data[0]));
    dispatch(fetchTask(response.data[0].idTask, responseReview.data.author));
    return;
  }
  dispatch(setIdTask(responseReview.data.idTask));
  dispatch(setType('REVIEW'));
  await dispatch(
    fetchTask(responseReview.data.idTask, responseReview.data.author)
  );
  dispatch(setFetchFinish());
};
