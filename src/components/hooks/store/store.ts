import { configureStore } from "@reduxjs/toolkit";
import nftSlice from "./slice/nftSlice";
import eventSlice from "./slice/eventSlice";
import memberSlice from "./slice/memberSlice";

const store = configureStore({
  reducer: {
    openDelete: nftSlice().deleteSlice.reducer,
    openRegister: nftSlice().registerSlice.reducer,
    openPModal: eventSlice().openSlice.reducer,
    openImportModal: eventSlice().importSlice.reducer,
    loginSuccess: memberSlice().loginSuccessSlice.reducer
  }
})
export default store;