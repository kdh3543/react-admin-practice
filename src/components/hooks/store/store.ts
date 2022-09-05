import { configureStore } from "@reduxjs/toolkit";
import deleteSlice from "./slice/deleteSlice";

const store = configureStore({
  reducer: {
    openDelete:deleteSlice.reducer
  }
})
export default store;