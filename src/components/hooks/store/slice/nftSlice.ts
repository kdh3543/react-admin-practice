import { createSlice } from "@reduxjs/toolkit";

export default function slice() {
  const deleteSlice = createSlice({
    name: 'deleteSlice',
    initialState: { value: false },
    reducers: {
      open: (state, action) => {
        state.value = action.payload
      }
    }
  });
  const registerSlice = createSlice({
    name: 'registerSlice',
    initialState: { value: false },
    reducers: {
      open: (state, action) => {
        state.value = action.payload
      }
    }
  })

  return {deleteSlice, registerSlice}
}



 