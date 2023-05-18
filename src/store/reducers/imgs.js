import { createSlice } from "@reduxjs/toolkit";

const imgSlice = createSlice({
  name: 'imgs',
  initialState: {
    isEmpty: true,
    imgsArr: [],
  },
  reducers: {
    pushImg: (state, action) => {
      if (state.isEmpty) {
        state.isEmpty = false
        state.imgsArr.push(action.payload.img)
      } else {
        if (imgsArr.length < 5) {
          state.imgsArr.push(action.payload.img)
        }
      }
    },
    clearImgsArr: (state, action) => {
      state.isEmpty = true
      state.imgsArr = []
    }
  }
})

export const pushImg = imgSlice.actions.pushImg;
export const clearImgsArr = imgSlice.actions.clearImgsArr;
export default imgSlice.reducer