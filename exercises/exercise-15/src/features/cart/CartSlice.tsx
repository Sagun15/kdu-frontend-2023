import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface CartItemState {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartItems {
  items: CartItemState[];
  totalPrice: number;
  loading: boolean;
  responseStatus: string;
  status: boolean;
}

const initialState: CartItems = {
  items: [],
  totalPrice: 0,
  loading: false,
  responseStatus: "",
  status: false,
};

function placeOrder(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export const placeItemsOrder = createAsyncThunk(
  "cart/placeOrder",
  async (arg, thunkApi) => {
    await placeOrder(2000);
    thunkApi.dispatch(cartSlice.actions.setToDefault());
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemState>) => {
      const existingItem = state.items.filter(
        (item) => item.id === action.payload.id
      );
      if (existingItem?.length > 0) {
        existingItem[0].quantity += action.payload.quantity;
      } else {
        state.items = [...state.items, action.payload];
      }
      state.totalPrice += action.payload.price;
    },
    setToDefault: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const existingItem = state.items.filter(
        (item) => item.id === action.payload.id
      );
      existingItem[0].quantity += action.payload.quantity;
      if (existingItem[0].quantity <= 0) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.totalPrice -= existingItem[0].price;
      } else {
        if (action.payload.quantity > 0) {
          state.totalPrice += existingItem[0].price;
        } else {
          state.totalPrice -= existingItem[0].price;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeItemsOrder.pending, (state) => {
        state.loading = true;
        state.responseStatus = "";
      })
      .addCase(placeItemsOrder.fulfilled, (state) => {
        state.loading = false;
        state.status = true;
        state.responseStatus = "Order placed successfully";
      })
      .addCase(placeItemsOrder.rejected, (state) => {
        state.loading = false;
        state.status = false;
        state.responseStatus = "Order couldn't be placed";
      });
  },
});

export default cartSlice.reducer;
export const cartAction = cartSlice.actions;
