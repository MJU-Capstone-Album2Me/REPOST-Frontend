import { configureStore } from "@reduxjs/toolkit";

import userReducer from './reducers/user'
import imgReducer from './reducers/imgs'

export const store = configureStore({
  reducer:{
    user: userReducer,
    imgs: imgReducer
  }
});