import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    accountId: '',
    shareId: '', 
  },
  reducers: {
    loginUser: (state, action) => {
      state.accountId = action.payload.accountId
    }
  }
})

export const loginUser = userSlice.actions.loginUser;
export default userSlice.reducer