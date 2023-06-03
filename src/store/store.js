import { configureStore } from "@reduxjs/toolkit";

import authReducer from './reducers/auth'
import imgReducer from './reducers/imgs'

export const store = configureStore({
  reducer:{
    auth: authReducer,
    imgs: imgReducer
  }
});