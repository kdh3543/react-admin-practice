import { createSlice } from "@reduxjs/toolkit";

export default function memberSlice() {
  // const setSlice = createSlice({
  //   name: 'setSlice',
  //   initialState: { value: '' },
  //   reducers: {
  //     set: (state, action) => {
  //       console.log(action)
  //       state.value = action.payload
  //     }
  //   }
  // })

  const loginSuccessSlice = createSlice({
    name: 'loginSuccessSlice',
    initialState: { value: false },
    reducers: {
      success: (state, action) => {
        state.value = action.payload
      }
    }
  })

  return {loginSuccessSlice}
}