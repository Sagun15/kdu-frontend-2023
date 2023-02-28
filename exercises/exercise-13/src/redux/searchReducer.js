import {createSlice} from "@reduxjs/toolkit";

const initState = {
  searchValue: "",
};

const searchSlice = createSlice({
    name: 'search',
    initialState: initState,
    reducers: {
        setSearch: (state, action) => {
            state.searchValue = action.payload;
        }
    }
})

export const {setSearch} = searchSlice.actions;
export default searchSlice.reducer;