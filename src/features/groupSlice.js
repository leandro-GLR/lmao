import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { del, get, post, put } from "../configs/axios";

const initialState = {
  allGroups: [],
  status: "",
  message: "",
  loading: false,
};

export const allGroups = createAsyncThunk(
  "group/allGroups",
  async (noData, { rejectWithValue }) => {
    const allGroups = await get("/api/groups/allGroups");
    if (!allGroups.success) return rejectWithValue(allGroups);
    return allGroups;
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: {
    [allGroups.pending]: (state, action) => {
      return {
        ...state,
        allGroups: [],
        loading: true,
        status: "allGroups pending",
        message: "loading...",
      };
    },
    [allGroups.fulfilled]: (state, action) => {
      return {
        ...state,
        allGroups: action.payload.data,
        status: "allGroups fulfilled",
        loading: !action.payload.success,
      };
    },
    [allGroups.rejected]: (state, action) => {
      return {
        ...state,
        users: [],
        status: "allGroups rejected",
        success: action.payload.success,
        message: action.payload.message,
        loading: action.payload.success,
      };
    },
  },
});

export const {} = groupSlice.actions; // Esto se utiliza en el dispatch
export default groupSlice.reducer; // Esto en el store
