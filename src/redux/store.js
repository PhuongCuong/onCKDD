import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";

const store = configureStore({
    reducer: {
        dataAPI: dataSlice
    }
})

export default store;