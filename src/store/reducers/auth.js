import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false, 
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token
      state.isAuthenticated = !!action.payload.token
      
      if (action.payload.token) {
         AsyncStorage.setItem('token', action.payload.token).then(()=>{console.log('finish')})
      } else {console.log('null 인데요')}
    },
    logout: (state) => {
      state.token = null
      state.isAuthenticated = false
    }
  }
})

export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;
export default authSlice.reducer