//#region //! Default Imports
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "./_actions/api";
import {
	FoodCategoryDto,
	PaginatedListOfFoodCategoryDto,
} from "../services/web-api-client";
import config from "../config.json";
import moment from "moment";
import { AppDispatch, RootState } from "./_store/store";
import { logToConsole } from "./_actions/logger";
//#endregion

//#region //* Custom Imports

//* Any Custom Imports related to Action Wrappers and Selectors goes here

//#endregion

//* ---
//! NO NEED TO USE THESE THUNKS WHEN YOU GOT AN API MIDDLEWARE
//* ---
//#region //! Async Only Thunks

export const doActionAsync = createAsyncThunk(
	"food/fetchCount",
	async (params: any) => {
		const response: any = await customApiCall(params);
		// The response we return becomes the `fulfilled` action payload
		return response.data;
	}
);

const customApiCall = (params: any) => {
	return new Promise((resolve) =>
		setTimeout(() => resolve({ data: params }), 500)
	);
};

//#endregion

//#region //! Custom Thunks - To Perform Sync & Async Operations

export const doAction =
	(params: any) => (dispatch: AppDispatch, getState: Function) => {
		const currentValue = getFoodCategorys();
		const payload: PaginatedListOfFoodCategoryDto = {
			items: [],
			pageIndex: 1,
			totalPages: 1,
			totalCount: 0,
			hasPreviousPage: false,
			hasNextPage: false,
		};
		dispatch(foodCategorysReceived(payload));
	};

//#endregion

//#region //! State Initialization

const initialState: PaginatedListOfFoodCategoryDto = {
	items: [],
	pageIndex: 1,
	totalPages: 1,
	totalCount: 0,
	hasPreviousPage: false,
	hasNextPage: false,
};

//#endregion

//#region //! Mapper

function foodCategoryMapper(
	foodCategorys: PaginatedListOfFoodCategoryDto,
	action: PayloadAction<PaginatedListOfFoodCategoryDto>
) {
	foodCategorys.items = action.payload.items;
	foodCategorys.pageIndex = action.payload.pageIndex;
	foodCategorys.totalCount = action.payload.totalCount;
	foodCategorys.totalPages = action.payload.totalPages;
	foodCategorys.hasPreviousPage = action.payload.hasPreviousPage;
	foodCategorys.hasNextPage = action.payload.hasNextPage;
}
//#endregion

//#region //! Slice

const foodCategory = createSlice({
	name: "foodCategory",
	initialState,
	reducers: {
		foodCategoryPaginatedListQueried(
			foodCategorys,
			action: PayloadAction<PaginatedListOfFoodCategoryDto>
		) {
			foodCategoryMapper(foodCategorys, action);
		},
		foodCategorysRequested(
			foodCategorys,
			action: PayloadAction<PaginatedListOfFoodCategoryDto>
		) {},
		foodCategorysReceived(
			foodCategorys,
			action: PayloadAction<PaginatedListOfFoodCategoryDto>
		) {
			foodCategoryMapper(foodCategorys, action);
		},
		foodCategorysRequestFailed(
			foodCategorys,
			action: PayloadAction<PaginatedListOfFoodCategoryDto>
		) {},
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(doActionAsync.pending, (foodCategorys) => {
				foodCategorys.hasNextPage = true;
			})
			.addCase(
				doActionAsync.fulfilled,
				(
					foodCategorys,
					action: PayloadAction<PaginatedListOfFoodCategoryDto>
				) => {
					foodCategorys.hasNextPage = false;
					foodCategorys.items = action.payload.items;
				}
			)
			.addCase(doActionAsync.rejected, (foodCategorys, action) => {
				foodCategorys.hasNextPage = false; // raise event
			});
	},
});

//#endregion

//#region //* Action Wrappers

export const getFoodCategorys =
	() => (dispatch: AppDispatch, getState: RootState) => {
		const items = getState.entities.foodCategory.items;

		if (items && items.length >= 0) {
			const diffInMinutes = moment().diff(
				moment().add(-10, "minutes"),
				"minutes"
			);
			if (diffInMinutes < 10) return;
		}

		return dispatch(
			apiCallBegan({
				url: config.foodCategory.urls.get,
				onStart: foodCategorysRequested.type,
				onSuccess: foodCategorysReceived.type,
				onError: foodCategorysRequestFailed.type,
			})
		);
	};

//#endregion

//#region //* Selectors

const PaginatedListOfFoodCategorys = (
	state: PaginatedListOfFoodCategoryDto
): Array<FoodCategoryDto> | undefined => state.items;

export const selectPaginatedListOfFoodCategorysActive = (isActive: boolean) =>
	createSelector<
		PaginatedListOfFoodCategoryDto,
		FoodCategoryDto[] | undefined,
		FoodCategoryDto[] | undefined
	>(PaginatedListOfFoodCategorys, (items) =>
		items?.filter((fc) => fc.isActive === isActive)
	);

const selectPaginatedListOfFoodCategorys = (state: RootState) =>
	state.entities.foodCategory.items;

export const selectActivePaginatedListOfFoodCategorys = (isActive: boolean) =>
	createSelector(
		selectPaginatedListOfFoodCategorys,
		(fc): FoodCategoryDto[] | undefined =>
			fc?.filter((o) => o.isActive === isActive)
	);

//#endregion

//#region //! Exports

export const {
	foodCategoryPaginatedListQueried,
	foodCategorysReceived,
	foodCategorysRequestFailed,
	foodCategorysRequested,
} = foodCategory.actions;

export default foodCategory.reducer;

//#endregion
