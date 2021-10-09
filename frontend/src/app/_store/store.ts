import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "../_middlewares/logger";
import api from "../_middlewares/api";
import reducer from "./reducers";

export const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(
				logger(
					"I got params as incoming argument, if you forget writing parenthesis, NEXT MIDDLEWARE WON'T GET CALL"
				)
			) // ! I got params as incoming argument, if you forget writing parenthesis, NEXT MIDDLEWARE WON'T GET CALL
			.concat(api)
			.concat(thunk),
	devTools: process.env.NODE_ENV !== "production",
});

export const getState = store.getState;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
