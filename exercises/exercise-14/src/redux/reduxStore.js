import { configureStore } from "@reduxjs/toolkit";
import marketSlice from "./marketSlice";

const reduxStore = configureStore({
  reducer: {
    products: marketSlice,
  },
});

export default reduxStore;
