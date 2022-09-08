import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice/nftSlice";

const store = configureStore({
  reducer: {
    openDelete: slice().deleteSlice.reducer,
    openRegister: slice().registerSlice.reducer
  }
})
export default store;