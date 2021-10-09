import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/_hooks";
import {
	getFoodCategorys,
	selectPaginatedListOfFoodCategorysActive,
	selectActivePaginatedListOfFoodCategorys,
} from "../../app/foodCategorySlice";
import { getState, RootState } from "../../app/_store/store";

export interface IFoodCategoryProps {}

const FoodCategory = (props: IFoodCategoryProps) => {
	const foodCategorys = useAppSelector(
		(state: RootState) => state.entities.foodCategory
	);

	const foodCategoryItems = useAppSelector((state: RootState): any => state);

	const foodCategorysActive =
		selectPaginatedListOfFoodCategorysActive(true)(foodCategorys);
	const activeFoodCategorys =
		selectActivePaginatedListOfFoodCategorys(true)(foodCategoryItems);

	const dispatch = useAppDispatch();
	useEffect(() => {
		getFoodCategorys()(dispatch, getState());
	}, []);

	return (
		<div>
			<h1>This Is Food Categroy!!!</h1>
			<ul>
				{foodCategorysActive?.map((fc) => (
					<li key={fc.id}>
						{fc.id}) {fc.name} - {fc.description}
					</li>
				))}
				<hr />
				{activeFoodCategorys?.map((fc) => (
					<li key={fc.id}>
						{fc.id}) {fc.name} - {fc.description}
					</li>
				))}
			</ul>
		</div>
	);
};

export default FoodCategory;
