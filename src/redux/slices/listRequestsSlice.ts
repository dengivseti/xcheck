import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import axios from 'axios';
import { IReviewRequest } from '../../interfaces/interfaces';

interface IListRequestsState {
  isLoading: boolean;
  requests: IReviewRequest[];
}

const initialState: IListRequestsState = {
  isLoading: false,
  requests: [],
};

const url = process.env.REACT_APP_URI_DB;

const listRequests = createSlice({
  name: 'listRequests',
  initialState,
  reducers: {
    setFetchStart(state) {
      state.isLoading = true;
    },
    setRequests(state, action: PayloadAction<IReviewRequest[]>) {
      state.isLoading = false;
      state.requests = action.payload;
    },
  },
});

export const { setFetchStart, setRequests } = listRequests.actions;

export default listRequests.reducer;

export const fetchRequests = (): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}requests`);
  if (!response.data) {
    //TODO обработка ошибок
    dispatch(setRequests([]));
    return;
  }
  dispatch(setRequests([...response.data]));
};
