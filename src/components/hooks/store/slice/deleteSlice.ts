import { createSlice } from "@reduxjs/toolkit";

export default function slice() {
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

  return {deleteSlice}
}



 