import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// Async thunk to get cameras
export const getCameras = createAsyncThunk("user/getCameras", async (data) => {
  const cameraResponse = await api.camera.getCameras(data.systemId, data.token);
  if (cameraResponse?.data?.status === 200) {
    return cameraResponse?.data?.data?.cameras;
  }
  throw new Error("Error getting cameras!");
});

// Async thunk to delete a camera
export const deleteCamera = createAsyncThunk(
  "user/deleteCamera",
  async (data) => {
    const cameraResponse = await api.camera.deleteCamera(
      data.camId,
      data.token
    );
    if (cameraResponse?.data?.status === 200) {
      await api.local_camera.deleteCamera(data.camId);
      return data.camId;
    }
    throw new Error("Error deleting camera!");
  }
);

const initialState = {
  cameras: [],
  dataStatus: "",
};

export const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    clearCamera: (state) => {
      return { ...initialState };
    },
    addCamera: (state, { payload }) => {
      state.cameras.push(payload);
    },
    updateCameraRunningStatus: (state, { payload }) => {
      state.cameras = state.cameras.map((item) =>
        item.id === payload.id ? { ...item, status: payload.status } : item
      );
    },
    updateAllCameraRunningStatus: (state, { payload }) => {
      state.cameras = state.cameras.map((item) => ({
        ...item,
        status: payload,
      }));
    },
  },
  extraReducers: (builder) => {
    // For getting the cameras
    builder.addCase(getCameras.pending, (state) => {
      state.dataStatus = "loading";
    });
    builder.addCase(getCameras.fulfilled, (state, { payload }) => {
      state.dataStatus = "success";
      state.cameras = payload;
    });
    builder.addCase(getCameras.rejected, (state) => {
      state.dataStatus = "error";
    });

    // For deleting the cameras
    builder.addCase(deleteCamera.pending, (state) => {
      state.dataStatus = "loading";
    });
    builder.addCase(deleteCamera.fulfilled, (state, { payload }) => {
      state.dataStatus = "success";
      state.cameras = state.cameras.filter((item) => item.id !== payload);
    });
    builder.addCase(deleteCamera.rejected, (state) => {
      state.dataStatus = "error";
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  addCamera,
  clearCamera,
  updateCameraRunningStatus,
  updateAllCameraRunningStatus,
} = cameraSlice.actions;

export default cameraSlice.reducer;
