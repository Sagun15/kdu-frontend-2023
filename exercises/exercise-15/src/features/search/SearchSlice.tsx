import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: "",
};

export const searchSlice = createSlice({
  /*
    The name of the slice.
    */
  name: "search",
  /**
    The initial state of the slice.
    */
  initialState,
  reducers: {
    /*
    Sets the query string in the search state.
    @param state The current state of the slice.
    @param action The payload action containing the query string.
    */
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const searchAction = searchSlice.actions;
