import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    images: [],
    convertedImages: [],
    format: "",
    status: 'idle',
}

const converterSlice = createSlice({
    name: 'converter',
    initialState,
    reducers: {
      setImages: (state, action) => {
        state.images = action.payload
      },
      setFormat: (state, action) => {
        state.format = action.payload;
      },
      setStatus: (state, action) => {
        state.status = action.payload
      },
      setConvertedImages: (state, action) => {
        state.convertedImages = action.payload
      },
      resetConverter: (state) => {
        state.images = [];
        state.convertedImages = [];
        state.format = '';
        state.status = 'idle';
      }
    }
})

export const {setImages, setFormat, setStatus, setConvertedImages, resetConverter} = converterSlice.actions

export default converterSlice.reducer;


