import { configureStore } from "@reduxjs/toolkit";

import authReducer from './reducers/auth'
import imgReducer from './reducers/imgs'
import selectReducer from './reducers/select'

export const store = configureStore({
  reducer:{
    auth: authReducer,
    imgs: imgReducer,
    selection: selectReducer
  }
});