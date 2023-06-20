import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export interface CategoryState {
  categories: string[];
  loading: boolean;
  activeCategory: string[];
}

const initialState: CategoryState = {
  categories: [],
  loading: false,
  activeCategory: [],
};

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(config.getCategoryPath);
    return response.data;
  }
);

export const categorySlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string[]>) => {
      state.loading = !state.loading;
      state.categories = action.payload;
    },
    setCategoryToDefault: (state) => {
      state.loading = !state.loading;
      state.categories = state.activeCategory;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
        state.activeCategory = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
export const categoryAction = categorySlice.actions;
