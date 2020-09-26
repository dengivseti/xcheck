import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import axios from 'axios';
import { IReviewRequest } from '../../interfaces/interfaces';
import { fetchTask, getFetchFinish, getFetchStart } from './tasksSlice';

interface IRequestsState {
  isLoading: boolean;
  requests: IReviewRequest[];
  request: IReviewRequest | null;
}

const initialState: IRequestsState = {
  isLoading: false,
  requests: [],
  request: null,
};

const url = process.env.REACT_APP_URI_DB;

const requests = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setFetchStart(state) {
      state.isLoading = true;
    },
    setFetchFinish(state) {
      state.isLoading = false;
    },
    clearRequest(state) {
      state.request = null;
    },
    setRequests(state, action: PayloadAction<IReviewRequest[]>) {
      state.isLoading = false;
      state.requests = action.payload;
    },
    setRequest(state, action: PayloadAction<IReviewRequest>) {
      state.isLoading = false;
      state.request = action.payload;
    },
  },
});

export const {
  setFetchStart,
  setRequests,
  clearRequest,
  setRequest,
} = requests.actions;

export default requests.reducer;

export const fetchRequests = (): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}requests`);
  if (!response.data) {
    dispatch(setRequests([]));
    return;
  }
  dispatch(setRequests([...response.data]));
};

export const fetchRequest = (id: string): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}requests/${id}`);
  if (!response.data) {
    return;
  }
  await fetchTask(response.data.idTask);
  dispatch(setRequest(response.data));
};

export const saveRequest = (request: IReviewRequest): AppThunk => async (
  dispatch
) => {
  dispatch(getFetchStart());
  let response;
  if (!request.id) {
    response = await axios.post(`${url}requests`, request);
  } else {
    response = await axios.patch(`${url}requests/${request.id}`, request);
  }
  if (!response.data) {
    console.log('RESPONSE:', response.data);
  }
  dispatch(clearRequest());
  dispatch(getFetchFinish());
};
