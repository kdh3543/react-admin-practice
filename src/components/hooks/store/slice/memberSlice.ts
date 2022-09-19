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

  const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: { value: '' },
    reducers: {
      login: (state, action) => {
        state.value = action.payload
      }
    }
  })

  return {loginSlice}
}