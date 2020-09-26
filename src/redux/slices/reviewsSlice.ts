import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { IReview } from '../../interfaces/interfaces';
import axios from 'axios';
import { fetchRequest } from './requestsSlice';

interface IReviewsState {
  isLoading: boolean;
  reviews: IReview[];
  review: IReview | null;
}

const initialState: IReviewsState = {
  isLoading: false,
  reviews: [],
  review: null,
};

const url = process.env.REACT_APP_URI_DB;

const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setFetchStart(state) {
      state.isLoading = true;
    },
    setFetchFinish(state) {
      state.isLoading = false;
    },
    setReviews(state, action: PayloadAction<IReview[]>) {
      state.isLoading = false;
      state.reviews = action.payload;
    },
    setReview(state, action: PayloadAction<IReview>) {
      state.isLoading = false;
      state.review = action.payload;
    },
    clearReview(state) {
      state.review = null;
    },
  },
});

export const {
  setFetchStart,
  setReviews,
  setReview,
  setFetchFinish,
  clearReview,
} = reviews.actions;

export default reviews.reducer;

export const fetchReviews = (): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}reviews`);
  if (!response.data) {
    dispatch(setReviews([]));
    return;
  }
  dispatch(setReviews([...response.data]));
};

export const fetchReview = (id: string): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}reviews/${id}`);
  if (!response.data) {
    return;
  }
  await dispatch(fetchRequest(response.data.idRequest));
  dispatch(setReview(response.data));
};

export const saveReview = (review: IReview): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  let response;
  if (!review.id) {
    response = await axios.post(`${url}reviews`, review);
  } else {
    response = await axios.patch(`${url}reviews/${review.id}`, review);
  }
  if (!response.data) {
    console.log('RESPONSE:', response.data);
  }
  dispatch(setFetchFinish());
};

export const fetchReviewsUser = (user: string): AppThunk => async (
  dispatch
) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}reviews?author=${user}`);
  if (!response.data) {
    dispatch(setReviews([]));
    return;
  }
  dispatch(setReviews([...response.data]));
};
