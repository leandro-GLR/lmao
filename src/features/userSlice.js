import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { del, get, post, put } from "../configs/axios";

const initialState = {
  users: [],
  status: "",
  message: "",
  loading: false,
};

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (noData, { rejectWithValue }) => {
    const getUsers = await get("/api/users/getUsers");
    if (!getUsers.success) return rejectWithValue(getUsers);
    return getUsers;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    const deleteUser = await del(`/api/users/deleteUser/${userId}`);
    if (!deleteUser.success) return rejectWithValue(deleteUser);
    return deleteUser;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userData, userId }, { rejectWithValue }) => {
    const updateUser = await put(`/api/users/updateUser/${userId}`, userData);
    if (!updateUser.success) return rejectWithValue(updateUser);
    return updateUser;
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    const createUser = await post(`/api/users/createUser`, userData);
    if (!createUser.success) return rejectWithValue(createUser);
    return createUser;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      console.log(`setUsers`);
      console.log(action.payload);
      state.users = action.payload;
    },
  },
  extraReducers: {
    [getUsers.pending]: (state, action) => {
      return {
        ...state,
        users: [],
        loading: true,
        status: "getUsers pending",
        message: "loading...",
      };
    },
    [getUsers.fulfilled]: (state, action) => {
      const users = action.payload.data.map((user) => {
        return { ...user, key: user.ID };
      });
      return {
        ...state,
        users,
        status: "getUsers fulfilled",
        loading: !action.payload.success,
      };
    },
    [getUsers.rejected]: (state, action) => {
      return {
        ...state,
        users: [],
        status: "getUsers rejected",
        success: action.payload.success,
        message: action.payload.message,
        loading: action.payload.success,
      };
    },
    [deleteUser.pending]: (state, action) => {
      return {
        ...state,

        loading: true,
        status: "deleteUser pending",
        message: "loading...",
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      // remove user from state
      console.log(action.payload);
      const users = state.users.filter(
        (user) => user.ID !== action.payload.data.ID
      );
      console.log(JSON.stringify(users));
      return {
        ...state,
        users,
        status: "deleteUser fulfilled",
        loading: !action.payload.success,
      };
    },
    [deleteUser.rejected]: (state, action) => {
      return {
        ...state,
        status: "deleteUser rejected",
        success: action.payload.success,
        message: action.payload.message,
        loading: action.payload.success,
      };
    },
    [updateUser.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        status: "updateUser pending",
        message: "loading...",
      };
    },
    [updateUser.fulfilled]: (state, action) => {
      /*  const updatedUsers = state.users.map((user) =>
        user.ID === action.payload.data.ID ? action.payload.data : user
      );
      console.log(JSON.stringify(updatedUsers)); */
      // Update user in state
      const users = state.users.map((user) => {
        if (user.ID === action.payload.data.ID) {
          return { ...action.payload.data, key: user.ID };
        }
        return user;
      });

      return {
        ...state,
        users,
        status: "updateUser fulfilled",
        loading: !action.payload.success,
      };
    },
    [updateUser.rejected]: (state, action) => {
      return {
        ...state,
        status: "updateUser rejected",
        success: action.payload.success,
        message: action.payload.message,
        loading: action.payload.success,
      };
    },
    [createUser.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
        status: "createUser pending",
        message: "loading...",
      };
    },
    [createUser.fulfilled]: (state, action) => {
      console.log(action.payload);
      // create user add to array users
      const users = [
        ...state.users,
        { ...action.payload.data, key: action.payload.data.ID },
      ];
      console.log(JSON.stringify(users));

      return {
        ...state,
        users,
        status: "createUser fulfilled",
        loading: !action.payload.success,
      };
    },
    [createUser.rejected]: (state, action) => {
      return {
        ...state,
        status: "createUser rejected",
        success: action.payload.success,
        message: action.payload.message,
        loading: action.payload.success,
      };
    },
  },
});

export const { setUsers } = userSlice.actions; // Esto se utiliza en el dispatch
export default userSlice.reducer; // Esto en el store
