import { createSlice } from "@reduxjs/toolkit";

const selectSlice = createSlice({
  name: 'selection',
  initialState: {
    room: null,
    roomNm: null,
    roomInviteCode: null,
    post: null,
    profileUrl: null,
  },
  reducers: {
    selectRoom: (state, action) => {
      state.room = action.payload.roomId
      state.roomNm = action.payload.roomNm
    },
    selectPost: (state, action) => {
      state.post = action.payload.postId
    },
    clearRoom: (state, action) => {
      state.room = null
      state.roomNm = null
    },
    clearPost: (state, action) => {
      state.post = null
    },
    setRoomInviteCode: (state, action) => {
      state.roomInviteCode = action.payload.roomInviteCode
    },
    selectProfileUrl: (state, action) => {
      state.profileUrl = action.payload.profileUrl
    }
  }
})

export const selectRoom = selectSlice.actions.selectRoom;
export const selectPost = selectSlice.actions.selectPost;
export const clearRoom = selectSlice.actions.clearRoom;
export const clearPost = selectSlice.actions.clearPost;
export const setRoomInviteCode = selectSlice.actions.setRoomInviteCode;
export const selectProfileUrl = selectSlice.actions.selectProfileUrl;
export default selectSlice.reducer