import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import searchReducer from "../features/search/SearchSlice";
import productsReducer from "../features/products/ProductsSlice";
import categoryReducer from "../features/category/CategorySlice";
import cartReducer from "../features/cart/CartSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  search: searchReducer,
  products: productsReducer,
  categories: categoryReducer,
  cart: persistReducer(persistConfig, cartReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store);
