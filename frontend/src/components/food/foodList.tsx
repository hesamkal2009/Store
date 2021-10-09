import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/_hooks";
import {
	getPaginatedFoods,
	selectActivePaginatedFoods,
	selectPaginatedFoodsActive,
} from "../../app/foodSlice";
import { getState, RootState } from "../../app/_store/store";

export interface IFoodProps {}

const Food = (props: IFoodProps) => {
	const foods = useAppSelector((state: RootState) => state.entities.food);

	const foodItems = useAppSelector((state: RootState): any => state);

	const foodsActive = selectActivePaginatedFoods()(getState());
	const activeFoods = selectPaginatedFoodsActive()(foodItems);

	const dispatch = useAppDispatch();
	useEffect(() => {
		getPaginatedFoods(1, 1)(dispatch, getState());
	}, []);

	return (
		<div>
			<h1>This Is Food!!!</h1>
			<ul>
				{foodsActive?.map((fc) => (
					<li key={fc.name}>
						{fc.name} - {fc.price} - {fc.foodInventoryStatus?.name}-{" "}
						{fc.foodCategoryId}
					</li>
				))}
				<hr />
				{activeFoods?.map((fc) => (
					<li key={fc.name}>
						{fc.name} - {fc.price} - {fc.foodInventoryStatus?.name}-{" "}
						{fc.foodCategoryId}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Food;
