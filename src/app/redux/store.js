import { configureStore } from "@reduxjs/toolkit";
import converterReducer from "./converterSlice";
import compressReducer from "./compressSlice";

export const store = configureStore({
    reducer: {
        converter: converterReducer,
        compress: compressReducer
    }
})