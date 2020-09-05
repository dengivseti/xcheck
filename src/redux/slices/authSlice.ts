import { createSlice } from '@reduxjs/toolkit';
import {
  SET_LOGINED,
  SET_ROLE,
  SET_USER,
} from '../../utils/constants/reducers';

interface authState {
  isLoading: true | false;
  isLogined: true | false;
  user: string | null;
  role: string;
}

const initialState: authState = {
  isLoading: false,
  isLogined: false,
  user: null,
  role: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    [SET_USER]: (state, action) => {
      state.user = action.payload;
    },
    [SET_LOGINED]: (state, action) => {
      state.isLogined = action.payload;
    },
    [SET_ROLE]: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUser, setLogined, setRole } = authSlice.actions;
export default authSlice.reducer;
