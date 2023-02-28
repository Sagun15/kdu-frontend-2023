import { configureStore } from "@reduxjs/toolkit";
import itemReducer from "./itemReducer";
import searchReducer from "./searchReducer";

const reduxStore = configureStore({
    reducer: {
        item: itemReducer,
        search: searchReducer
    },
});

export default reduxStore;