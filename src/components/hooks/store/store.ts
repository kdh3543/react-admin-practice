import { configureStore } from "@reduxjs/toolkit";
import nftSlice from "./slice/nftSlice";
import eventSlice from "./slice/eventSlice";

const store = configureStore({
  reducer: {
    openDelete: nftSlice().deleteSlice.reducer,
    openRegister: nftSlice().registerSlice.reducer,
    openPModal: eventSlice().openSlice.reducer,
  }
})
export default store;