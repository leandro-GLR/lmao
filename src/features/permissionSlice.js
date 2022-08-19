import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { del, get, post, put } from "../configs/axios";

const initialState = {
  groupPermissions: [],
  sectorPermissions: [],
  premisePermissions: [],
  programPermissions: [],
  allGroups: [],
  allSectors: [],
  allPremises: [],
  allPrograms: [],

  disabled: false,

  userSelected: {},
};

export const allPermissions = createAsyncThunk(
  "permission/allPermissions",
  async (userId, { rejectWithValue }) => {
    const allPermissions = await get(
      `/api/permissions/allPermissions/${userId}`
    );

    if (!allPermissions.success) return rejectWithValue(allPermissions);
    return allPermissions;
  }
);

export const deleteGroupPermissions = createAsyncThunk(
  "permission/deleteGroupPermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const deleteGroupPermissions = await put(
      `/api/groups/permission/delete/${userId}`,
      { groupIds: moveKeys }
    );
    if (!deleteGroupPermissions.success)
      return rejectWithValue(deleteGroupPermissions);
    return { success: deleteGroupPermissions.success, data: newTargetKeys };
  }
);

export const createGroupPermissions = createAsyncThunk(
  "permission/createGroupPermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const createGroupPermissions = await post(
      `/api/groups/permission/create/${userId}`,
      { groupIds: moveKeys }
    );
    if (!createGroupPermissions.success)
      return rejectWithValue(createGroupPermissions);
    return { success: createGroupPermissions.success, data: newTargetKeys };
  }
);

export const deleteSectorPermissions = createAsyncThunk(
  "permission/deleteSectorPermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const deleteSectorPermissions = await put(
      `/api/sectors/permission/delete/${userId}`,
      {
        sectorIds: moveKeys,
      }
    );
    if (!deleteSectorPermissions.success)
      return rejectWithValue(deleteSectorPermissions);
    return { success: deleteSectorPermissions.success, data: newTargetKeys };
  }
);

export const createSectorPermissions = createAsyncThunk(
  "permission/createSectorPermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const createSectorPermissions = await post(
      `/api/sectors/permission/create/${userId}`,
      {
        sectorIds: moveKeys,
      }
    );
    if (!createSectorPermissions.success)
      return rejectWithValue(createSectorPermissions);
    return { success: createSectorPermissions.success, data: newTargetKeys };
  }
);

export const deletePremisePermissions = createAsyncThunk(
  "permission/deletePremisePermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const deletePremisePermissions = await put(
      `/api/premises/permission/delete/${userId}`,
      {
        premiseIds: moveKeys,
      }
    );
    if (!deletePremisePermissions.success)
      return rejectWithValue(deletePremisePermissions);
    return { success: deletePremisePermissions.success, data: newTargetKeys };
  }
);

export const createPremisePermissions = createAsyncThunk(
  "permission/createPremisePermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const createPremisePermissions = await post(
      `/api/premises/permission/create/${userId}`,
      {
        premiseIds: moveKeys,
      }
    );
    if (!createPremisePermissions.success)
      return rejectWithValue(createPremisePermissions);
    return { success: createPremisePermissions.success, data: newTargetKeys };
  }
);

export const deleteProgramPermissions = createAsyncThunk(
  "permission/deleteProgramPermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const deleteProgramPermissions = await put(
      `/api/programs/permission/delete/${userId}`,
      {
        programIds: moveKeys,
      }
    );
    if (!deleteProgramPermissions.success)
      return rejectWithValue(deleteProgramPermissions);
    return { success: deleteProgramPermissions.success, data: newTargetKeys };
  }
);

export const createProgramPermissions = createAsyncThunk(
  "permission/createProgramPermissions",
  async ({ moveKeys, newTargetKeys, userId }, { rejectWithValue }) => {
    const createProgramPermissions = await post(
      `/api/programs/permission/create/${userId}`,
      {
        programIds: moveKeys,
      }
    );
    if (!createProgramPermissions.success)
      return rejectWithValue(createProgramPermissions);
    return { success: createProgramPermissions.success, data: newTargetKeys };
  }
);

const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    setUserSelected: (state, action) => {
      state.userSelected = action.payload;
    },
  },
  extraReducers: {
    [allPermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [allPermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: false,
        groupPermissions: action.payload.data.userGroupIdsArray,
        sectorPermissions: action.payload.data.userSectorIdsArray,
        premisePermissions: action.payload.data.userPremiseIdsArray,
        programPermissions: action.payload.data.userProgramIdsArray,
        allGroups: action.payload.data.allGroupIdsWithKey,
        allSectors: action.payload.data.allSectorIdsWithKey,
        allPremises: action.payload.data.allPremiseIdsWithKey,
        allPrograms: action.payload.data.allProgramIdsWithKey,
      };
    },
    [allPermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: false,
      };
    },
    [deleteGroupPermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [deleteGroupPermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        groupPermissions: action.payload.data,
      };
    },
    [deleteGroupPermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
    [createGroupPermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [createGroupPermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        groupPermissions: action.payload.data,
      };
    },
    [createGroupPermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
    // sector
    [deleteSectorPermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [deleteSectorPermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        sectorPermissions: action.payload.data,
      };
    },
    [deleteSectorPermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
    [createSectorPermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [createSectorPermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        sectorPermissions: action.payload.data,
      };
    },
    [createSectorPermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
    // premise
    [deletePremisePermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [deletePremisePermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        premisePermissions: action.payload.data,
      };
    },
    [deletePremisePermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
    [createPremisePermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [createPremisePermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        premisePermissions: action.payload.data,
      };
    },
    [createPremisePermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
    // program
    [deleteProgramPermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [deleteProgramPermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        programPermissions: action.payload.data,
      };
    },
    [deleteProgramPermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
    [createProgramPermissions.pending]: (state, action) => {
      return {
        ...state,
        disabled: true,
      };
    },
    [createProgramPermissions.fulfilled]: (state, action) => {
      return {
        ...state,
        disabled: !action.payload.success,
        programPermissions: action.payload.data,
      };
    },
    [createProgramPermissions.rejected]: (state, action) => {
      return {
        ...state,
        disabled: action.payload.success,
      };
    },
  },
});

export const { setUserSelected } = permissionSlice.actions; // Esto se utiliza en el dispatch
export default permissionSlice.reducer; // Esto en el store
