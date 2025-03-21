import { configureStore } from "@reduxjs/toolkit";
import { authModalReducer } from "./features/modalSlice";
import { updateProfileReducer, userReducer } from "./features/userSlice";
import productReducer, { productDetailReducer } from "./features/productSlice";
import {
  deleteOrderReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./features/orderSlice";
import chatSlice from "./features/chatSlice";
export const store = configureStore({
  reducer: {
    authModal: authModalReducer.reducer,
    user: userReducer.reducer,
    updateProfile: updateProfileReducer.reducer,
    product: productReducer.reducer,
    productDetail: productDetailReducer.reducer,

    chat: chatSlice.reducer,

    order: orderReducer.reducer,
    newOrder: newOrderReducer.reducer,
    delOrder: deleteOrderReducer.reducer,
    orderDetails: orderDetailsReducer.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
