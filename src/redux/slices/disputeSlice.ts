import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import axios from 'axios';
import { IDispute, typeDispute } from '../../interfaces/interfaces';
import { fetchReview } from './reviewsSlice';

interface IDisputesState {
  isLoading: boolean;
  disputes: IDispute[];
  dispute: IDispute | null;
}

const initialState: IDisputesState = {
  isLoading: false,
  disputes: [],
  dispute: null,
};

const url = process.env.REACT_APP_URI_DB;

const disputes = createSlice({
  name: 'disputes',
  initialState,
  reducers: {
    setFetchStart(state) {
      state.isLoading = true;
    },
    setFetchFinish(state) {
      state.isLoading = false;
    },
    clearDispute(state) {
      state.dispute = null;
    },
    setDisputes(state, action: PayloadAction<IDispute[]>) {
      state.isLoading = false;
      state.disputes = action.payload;
    },
    setDispute(state, action: PayloadAction<IDispute>) {
      state.isLoading = false;
      state.dispute = action.payload;
    },
    addDispute(state, action: PayloadAction<IDispute>) {
      state.disputes = [...state.disputes, action.payload];
    },
    editDisputeState(
      state,
      action: PayloadAction<{ state: typeDispute; id: number }>
    ) {
      const { id } = action.payload;
      const dispute = state.disputes.find((dispute) => dispute.id === id);
      dispute.state = action.payload.state;
    },
  },
});

export const {
  setFetchFinish,
  setFetchStart,
  clearDispute,
  setDispute,
  setDisputes,
  addDispute,
  editDisputeState,
} = disputes.actions;

export default disputes.reducer;

export const fetchDisputes = (): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}disputes/`);
  if (!response.data) {
    dispatch(setDisputes([]));
    return;
  }
  dispatch(setDisputes([...response.data]));
};

export const fetchDispute = (id: string): AppThunk => async (dispatch) => {
  dispatch(setFetchStart());
  const response = await axios.get(`${url}disputes/${id}`);
  if (!response.data) {
    return;
  }
  await dispatch(fetchReview(response.data.idReview));
  dispatch(setDispute(response.data));
};

export const saveDispute = (dispute: IDispute): AppThunk => async (
  dispatch
) => {
  dispatch(setFetchStart());
  let response;
  if (!dispute.id) {
    response = await axios.post(`${url}disputes`, dispute);
  } else {
    response = await axios.patch(`${url}disputes/${dispute.id}`, dispute);
  }
  if (response.data) {
    console.log('RESPONSE:', response.data);
  }
  dispatch(clearDispute());
  dispatch(setFetchFinish());
};

export const editDispute = (state: typeDispute, id: number): AppThunk => async (
  dispatch
) => {
  await axios.patch(`${url}disputes/${id}`, { state: state });
  dispatch(editDisputeState({ state, id }));
};
