import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/Auth/slices/authSlice";
import modal from "../store/modal/modalSlice";
import themeReducer from "./theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: auth,
    modal: modal,
    theme: themeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
