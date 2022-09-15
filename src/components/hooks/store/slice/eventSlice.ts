import { createSlice } from "@reduxjs/toolkit";

export default function eventSlice() {
  const openSlice = createSlice({
    name: 'openSlice',
    initialState: { value: false },
    reducers: {
      open: (state, action) => {
        state.value = action.payload
      }
    }
  })

  return { openSlice }
}