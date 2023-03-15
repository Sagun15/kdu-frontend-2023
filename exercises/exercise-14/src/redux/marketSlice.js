import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initState = {
  productsList: [],
  loadingProducts: false,
  responseStatus: 'pending',
  status: false
};

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async (arg, thunkApi) => {
    thunkApi.dispatch(marketSlice.actions.setLoading(true));
    const response = await axios.get("https://fakestoreapi.com/products");

    return response.data;
  }
);

const marketSlice = createSlice({
  name: "products",
  initialState: initState,
  reducers: {
    setProductsList: (state, action) => {
      state.productsList = action.payload;
    },

    setLoading: (state, action) => {
      state.loadingProducts = action.payload;
    },

    setSnackbar: (state, action) => {
        state.responseStatus = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loadingProducts = false;
      state.status = false;
      state.responseStatus = 'Failed to fetch product details.';
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsList = action.payload;
      state.loadingProducts = false;
      state.status = true;
      state.responseStatus = 'Product details are fetched successfully';
    });
  },
});

export const { setProductsList, setSnackbar } = marketSlice.actions;

export default marketSlice.reducer;
