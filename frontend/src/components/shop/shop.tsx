import React from "react";
import { Col, Row } from "react-bootstrap";
import Cart from "../cart/cart";
import Food from "../food/foodList";
import FoodCategory from "../foodCategory/foodCategoryList";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/_hooks";
import { getFoodCategorys } from "../../app/foodCategorySlice";
import { getPaginatedFoods } from "../../app/foodSlice";
import { getState, RootState } from "../../app/_store/store";
import { addItemToCart, CartItemDto } from "../../app/cartSlice";
import { FoodDto } from "../../services/web-api-client";
import { toast } from "react-toastify";

export interface IShopProps {}

const Shop: React.FC<IShopProps> = (props) => {
	//#region //* Fetching Data Through Redux

	const dispatch = useAppDispatch();
	useEffect(() => {
		getFoodCategorys()(dispatch, getState());
		getPaginatedFoods(1, 1)(dispatch, getState());
	}, [dispatch]);

	const foodCategoryList = useAppSelector(
		(state: RootState): any => state.entities.foodCategory.items
	);

	const foodList: FoodDto[] = useAppSelector(
		(state: RootState): any => state.entities.food.items
	);

	//#endregion

	let [selectedFilterItem, setSelectedFilterItem] = useState(0);

	const handleFilterChange = (selectedFilter: number) => {
		setSelectedFilterItem(selectedFilter);
	};

	const handleAddToCart = (foodId: number) => {
		const food = foodList.find((food: FoodDto) => food.id === foodId);
		if (!food) {
			toast.error("Something went wrong!");
		} else {
			const payload: CartItemDto = {
				id: food.id,
				name: food.name !== undefined ? food.name : "",
				unitPrice: food.price,
				quantity: 1,
				itemsPrice: food.price * 1,
			};
			dispatch(addItemToCart(payload));
		}
	};

	return (
		<>
			<Row className="mt-5 mb-5">
				<Col lg={{ span: 4 }} md={{ span: 12 }} className="mt-4">
					<FoodCategory
						foodCategoryList={foodCategoryList}
						foodList={foodList}
						filterChange={handleFilterChange}
					/>
					<Col className="mt-4">
						<Cart />
					</Col>
				</Col>
				<Col>
					<Food
						foodList={foodList}
						selectedFilter={selectedFilterItem}
						addToCart={handleAddToCart}
					/>
				</Col>
			</Row>
		</>
	);
};

export default Shop;
