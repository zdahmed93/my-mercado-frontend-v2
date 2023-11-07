import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import itemsSlice from "./itemsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        items: itemsSlice
    }
})