import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { typeRoles } from '../../interfaces/interfaces';
import { AppThunk } from '../store';

interface authState {
  isLoading: boolean;
  isAuth: boolean;
  user: string | null;
  role: typeRoles | null;
}

const initialState: authState = {
  isLoading: false,
  isAuth: false,
  user: null,
  role: null,
};
const storageName = 'userData';
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setStartLoading(state) {
      state.isLoading = true;
    },
    setFinishLoading(state) {
      state.isLoading = false;
    },
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    setLogined(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setRole(state, action: PayloadAction<typeRoles>) {
      state.role = action.payload;
    },
  },
});

export const {
  setUser,
  setLogined,
  setRole,
  setFinishLoading,
  setStartLoading,
} = authSlice.actions;
export default authSlice.reducer;

export const checkAuth = (): AppThunk => async (dispatch) => {
  dispatch(setStartLoading());
  const data = await JSON.parse(localStorage.getItem(storageName));
  if (data && data.user) {
    dispatch(setUser(data.user));
    dispatch(setRole(data.role));
    dispatch(setLogined(true));
  } else {
    dispatch(setLogined(false));
  }
  dispatch(setFinishLoading());
};

export const login = (user: string, role: typeRoles): AppThunk => async (
  dispatch
) => {
  dispatch(setStartLoading());
  localStorage.setItem(
    storageName,
    JSON.stringify({
      user,
      role,
    })
  );
  dispatch(setUser(user));
  dispatch(setRole(role));
  dispatch(setFinishLoading());
  dispatch(setLogined(true));
};
export const logout = (): AppThunk => async (dispatch) => {
  dispatch(setStartLoading());
  localStorage.removeItem(storageName);
  dispatch(setUser(null));
  dispatch(setRole(null));
  dispatch(setLogined(false));
  dispatch(setFinishLoading());
};
