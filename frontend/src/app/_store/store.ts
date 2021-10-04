import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import api from "../_middlewares/api";
import reducer from "./reducers";

export const store: any = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api).concat(thunk),
	devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
