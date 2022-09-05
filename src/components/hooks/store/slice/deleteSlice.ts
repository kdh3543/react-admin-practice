import { createSlice } from "@reduxjs/toolkit";

const deleteSlice = createSlice({
  name: 'deleteSlice',
  initialState: { value: false },
  reducers: {
    open: (state, action) => {
      console.log(action)
      state.value = action.payload
    }
  }
});

export default deleteSlice
export const {open} = deleteSlice.actions