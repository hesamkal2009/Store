//#region //! Default Imports

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallBegan } from "./_actions/api";
import moment from "moment";
import config from "../config.json";

//#endregion

//#region //* Custom Imports

//* Any Custom Imports related to Action Wrappers and Selectors goes here

//#endregion

//#region //* Action Wrappers

export const getUsers = () => (dispatch, getState) => {
	const { lastFetched } = getState().entities.users;

	const diffInMinutes = moment().diff(moment(lastFetched), "seconds");
	if (diffInMinutes > 10) return;

	return dispatch(
		apiCallBegan({
			url: config.users.urls.get,
			onStart: usersRequested.type,
			onSuccess: usersReceived.type,
			onError: usersRequestFailed.type,
		})
	);
};

//#endregion

//#region //* Selector - Memoization Done by reselect

// The functions below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.user.value)`
export const getUsersCount = (state) => state.users.length;

//#endregion

//! *****
//! *****
//! *****

//#region //! State Initialization

const initialState = {
	loading: false,
	list: [],
	lastFetched: Date.now(),
};

//#endregion

//* ---
//! NO NEED TO USE THESE THUNKS WHEN YOU GOT AN API MIDDLEWARE
//* ---
//#region //! Async Only Thunks

export const doActionAsync = createAsyncThunk(
	"user/fetchCount",
	async (params) => {
		const response = await customApiCall(params);
		// The response we return becomes the `fulfilled` action payload
		return response.data;
	}
);

const customApiCall = (params) => {
	return new Promise((resolve) =>
		setTimeout(() => resolve({ data: params }), 500)
	);
};

//#endregion

//#region //! Custom Thunks - To Perform Sync & Async Operations

export const doAction = (params) => (dispatch, getState) => {
	const currentValue = getUsers(getState());
	dispatch(usersReceived());
};

//#endregion

//#region //! Slice

const user = createSlice({
	name: "user",

	initialState,

	reducers: {
		usersRequested: (users, action) => {
			users.loading = action.payload;
		},
		usersReceived: (users, action) => {
			users.list = action.payload;
			users.loading = false;
		},
		usersRequestFailed: (users, action) => {
			users.loading = false;
		},
	},

	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(doActionAsync.pending, (users) => {
				users.loading = true;
			})
			.addCase(doActionAsync.fulfilled, (users, action) => {
				users.loading = false;
				users.list += action.payload;
			});
	},
});

//#endregion

//#region //! Exports

export const { usersRequested, usersReceived, usersRequestFailed } =
	user.actions;
export default user.reducer;

//#endregion
