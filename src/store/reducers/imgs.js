import { createSlice } from "@reduxjs/toolkit";

const imgSlice = createSlice({
  name: 'imgs',
  initialState: {
    isEmpty: true,
    imgsArr: [],
    imgObjectsArr: [],
    profileImg: null
  },
  reducers: {
    pushImg: (state, action) => {
      if (state.isEmpty) {
        state.isEmpty = false
        state.imgsArr.push(action.payload.img)
        state.imgObjectsArr.push(action.payload.imgObject)
      } else {
        if (state.imgsArr.length < 5) {
          state.imgsArr.push(action.payload.img)
          state.imgObjectsArr.push(action.payload.imgObject)
        }
      }
    },
    clearImgsArr: (state, action) => {
      state.isEmpty = true
      state.imgsArr = []
      state.imgObjectsArr = []
    },
    setProfileImg: (state, action) => {
      state.profileImg = action.payload.profileImg
    },
    setImgs: (state, action) => {
      state.imgsArr= action.payload.imgsUrlArr
      state.imgObjectsArr = []
    }
  }
})

export const pushImg = imgSlice.actions.pushImg;
export const clearImgsArr = imgSlice.actions.clearImgsArr;
export const setProfileImg = imgSlice.actions.setProfileImg;
export const setImgs = imgSlice.actions.setImgs;
export default imgSlice.reducer