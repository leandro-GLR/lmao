// Sign Up, Login, VerifyEmail

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { del, get, post, put } from "../configs/axios";

const initialState = {
  logged: false,
  currentUser: {},
  status: "",
  message: "",
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    const login = await post("/api/auth/login", credentials);
    if (!login.success) return rejectWithValue(login);
    return login;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (user, { rejectWithValue }) => {
    console.log(user);
    const signUp = await post("/api/auth/signup", user);
    if (!signUp.success) return rejectWithValue(signUp);
    return signUp;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (noData, { rejectWithValue }) => {
    console.log("logout");
    const logout = await get("/api/auth/logout");
    if (!logout.success) return rejectWithValue(logout);
    return logout;
  }
);

export const validate = createAsyncThunk(
  "auth/validate",
  async (noData, { rejectWithValue }) => {
    const validate = await get("/api/auth/validate");
    if (!validate.success) return rejectWithValue(validate);
    return validate;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      return {
        ...state,
        logged: false,
        currentUser: {},
        status: "login pending",
        message: "loading...",
      };
    },
    [login.fulfilled]: (state, action) => {
      return {
        ...state,
        logged: action.payload.success,
        currentUser: action.payload.data,
        status: "login fulfilled",
        message: "logged",
      };
    },
    [login.rejected]: (state, action) => {
      return {
        ...state,
        logged: action.payload.success,
        currentUser: {},
        status: "login rejected",
        message: action.payload.message,
      };
    },
    [signUp.pending]: (state, action) => {
      return {
        ...state,
        logged: false,
        currentUser: {},
        status: "sign up pending",
        message: "loading...",
      };
    },
    [signUp.fulfilled]: (state, action) => {
      return {
        ...state,
        logged: false,
        currentUser: {},
        status: action.payload.success ? "sign up fulfilled" : "",
        message: "pending email verification",
      };
    },
    [signUp.rejected]: (state, action) => {
      return {
        ...state,
        logged: false,
        currentUser: {},
        status: "sign up rejected",
        message: action.payload.message,
      };
    },

    [logout.pending]: (state, action) => {
      return {
        ...state,
        logged: true,
        status: "logout pending",
      };
    },
    [logout.fulfilled]: (state, action) => {
      return {
        ...state,
        logged: !action.payload.success,
        currentUser: {},
        status: "logout fulfilled",
      };
    },
    [logout.rejected]: (state, action) => {
      return {
        ...state,
        status: "logout rejected",
        message: action.payload.message,
      };
    },
    [validate.pending]: (state, action) => {
      return {
        ...state,
        status: "validate pending",
      };
    },
    [validate.fulfilled]: (state, action) => {
      return {
        ...state,
        logged: action.payload.success,
        currentUser: action.payload.data,
        status: "validate fulfilled",
      };
    },
    [validate.rejected]: (state, action) => {
      return {
        ...state,
        status: "validate rejected",
      };
    },
  },
});

export const { cleanUpToast } = authSlice.actions; // Esto se utiliza en el dispatch
export default authSlice.reducer; // Esto en el store
