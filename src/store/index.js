import { configureStore } from "@reduxjs/toolkit";
import userCartReducer from "./userCartSlice";

export default configureStore({
  reducer: {
    userCart: userCartReducer,
  },
});
