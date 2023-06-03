import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: 'routes',
  initialState: {
    prevRoute: null,
    currRoute: null,
    nextRoute: null,
  },
  reducers: {
    setRoute: (state, action) => {
      state.prevRoute = action.payload.prevRoute?action.payload.prevRoute:state.prevRoute
      state.currRoute = action.payload.currRoute?action.payload.currRoute:state.currRoute
      state.nextRoute = action.payload.nextRoute?action.payload.nextRoute:state.nextRoute
    },
  }
})

export const setRoute = routeSlice.actions.setRoute;
export default routeSlice.reducer