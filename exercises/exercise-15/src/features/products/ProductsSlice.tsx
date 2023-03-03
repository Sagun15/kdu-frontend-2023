import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";

export interface ProductItemState {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

export interface ProductState {
  product: { category: string; products: ProductItemState[] };
}

export interface ProductArrayState {
  products: { category: string; products: ProductItemState[] }[];
  loading: boolean;
}

const initialState: ProductArrayState = {
  products: [],
  loading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkApi) => {
    thunkApi.dispatch(productsSlice.actions.resetProducts());
    const { data } = await axios.get(config.getCategoryPath);
    data.map(async (category: string) => {
      const response = await axios.get(
        config.getProductsPath + category + "?limit=3"
      );
      thunkApi.dispatch(
        productsSlice.actions.setProducts({ category, products: response.data })
      );
    });
  }
);

export const fetchSpecificProducts = createAsyncThunk(
  "products/fetchSpecificProducts",
  async (category: string, thunkApi) => {
    thunkApi.dispatch(productsSlice.actions.resetProducts());
    const response = await axios.get(config.getProductsPath + category);
    thunkApi.dispatch(
      productsSlice.actions.setProducts({ category, products: response.data })
    );
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (
      state,
      action: PayloadAction<{ category: string; products: ProductItemState[] }>
    ) => {
      const category = action.payload.category;
      const products = action.payload.products;
      state.products = [...state.products, { category, products }];
    },
    resetProducts: (state) => {
      state.products = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productsSlice.reducer;
export const productsAction = productsSlice.actions;
