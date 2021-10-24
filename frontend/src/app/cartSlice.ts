//#region //! Default Imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";

//#endregion

export interface CartDto {
	items: Array<CartItemDto>;
	taxPrice: number;
	totalPrice: number;
}

export interface CartItemDto {
	id: number;
	name: string;
	unitPrice: number;
	quantity: number;
	itemsPrice: number;
}

//#region //! State Initialization

const initialState: CartDto = {
	items: [],
	taxPrice: 0,
	totalPrice: 0,
};

//#endregion

//#region //! Slice

const cart = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItemToCart(state: CartDto, action: PayloadAction<CartItemDto>) {
			const itemIndex = state.items.findIndex(
				(cartItem: CartItemDto) => cartItem.id === action.payload.id
			);
			if (itemIndex === -1) {
				state.items.push(action.payload);
			} else {
				state.items = state.items.map((cartItem, index) =>
					cartItem.id === action.payload.id
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: { ...cartItem }
				);
			}

			calculatePrices(state);
		},
		removeItemFromCart(state: CartDto, action: PayloadAction<number>) {
			state.items = state.items.filter(
				(o: CartItemDto) => o.id !== action.payload
			);
			calculatePrices(state);
		},
		increaseQuantityOfAnItem(
			state: CartDto,
			action: PayloadAction<number>
		) {
			const itemIndex = state.items.findIndex(
				(cartItem) => cartItem.id === action.payload
			);

			if (itemIndex === -1) {
				console.error(
					`item with id of ${action.payload} doesn't exists in ${state.items}`
				);
				return;
			} else {
				state.items = state.items.map((cartItem, index) =>
					index === itemIndex
						? { ...cartItem, quantity: cartItem.quantity + 1 }
						: { ...cartItem }
				);
			}
			calculatePrices(state);
		},
		decreaseQuantityOfAnItem(
			state: CartDto,
			action: PayloadAction<number>
		) {
			const itemIndex = state.items.findIndex(
				(cartItem) => cartItem.id === action.payload
			);

			if (itemIndex === -1) {
				console.error(
					`item with id of ${action.payload} doesn't exists in ${state.items}`
				);
				return;
			} else {
				let item = _.cloneDeep(state.items).find(
					(cartItem) => cartItem.id === action.payload
				);

				if (item?.quantity === 1) {
					state.items = state.items.filter(
						(o: CartItemDto) => o.id !== action.payload
					);
					calculatePrices(state);
					return;
				}

				state.items = state.items.map((cartItem, index) =>
					index === itemIndex
						? {
								...cartItem,
								quantity:
									cartItem.quantity - 1 > 0
										? cartItem.quantity - 1
										: cartItem.quantity,
						  }
						: { ...cartItem }
				);
			}
			calculatePrices(state);
		},
	},
});

//#endregion

//#region //! Exports

export const {
	addItemToCart,
	removeItemFromCart,
	increaseQuantityOfAnItem,
	decreaseQuantityOfAnItem,
} = cart.actions;

export default cart.reducer;

//#endregion

function calculatePrices(state: CartDto) {
	let totalPrice = 0;
	state.items.forEach((o) => (totalPrice += o.quantity * o.unitPrice));
	state.taxPrice = totalPrice * 0.09;
	state.totalPrice = totalPrice;
}
