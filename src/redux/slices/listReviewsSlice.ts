import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { IReview } from '../../interfaces/interfaces';
import axios from 'axios';

interface IListReviewsState {
  isLoading: boolean;
  reviews: IReview[];
}

const initialState: IListReviewsState = {
  isLoading: false,
  reviews: [],
};

const url = process.env.REACT_APP_URI_DB;

const listReviews = createSlice({
  name: 'listReviews',
  initialState,
  reducers: {
    setFetchStart(state) {
      state.isLoading = true;
    },
    setReviews(state, action: PayloadAction<IReview[]>) {
      state.isLoading = false;
      state.reviews = action.payload;
    },
  },
});

export const { setFetchStart, setReviews } = listReviews.actions;

export default listReviews.reducer;

export const fetchReviews = (): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}reviews`);
  if (!response.data) {
    //TODO обработка ошибок
    dispatch(setReviews([]));
    return;
  }
  dispatch(setReviews([...response.data]));
};
