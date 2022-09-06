import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice/deleteSlice";

const store = configureStore({
  reducer: {
    openDelete: slice().deleteSlice.reducer,
  }
  
})
export default store;