import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

interface IAuthState {
  user: null | IUser;
  token: null | string;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUsers, logout } = authSlice.actions;

export default authSlice.reducer;
