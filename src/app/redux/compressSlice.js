import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: [],
  quality: 50,
  status: "idle",
  downloadList: null,
};

export const compressSlice = createSlice({
  name: "compress",
  initialState,
  reducers: {
    setCompressImages: (state, action) => {
      state.images = action.payload;
    },
    setQuality: (state, action) => {
      state.quality = action.payload;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    addDownload: (state, action) => {
      state.downloadList = action.payload;
    },
    resetCompression: (state) => {
      state.images = [];
      state.status = "idle";
      state.downloadList = null;
    },
  },
});

export const { setCompressImages, setQuality, updateStatus, addDownload, resetCompression } =
  compressSlice.actions;
export default compressSlice.reducer;
