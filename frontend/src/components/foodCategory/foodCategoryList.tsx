import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/_hooks";
import {
	getFoodCategorys,
	selectPaginatedListOfFoodCategorysActive,
	selectActivePaginatedListOfFoodCategorys,
} from "../../app/foodCategorySlice";
import { getState, RootState } from "../../app/_store/store";
import { ListGroup, Image, Badge } from "react-bootstrap";
import iconInternational from "../../assets/images/iconInternational.png";
import iconKebabrice from "../../assets/images/iconKebabrice.png";
import iconKhoresht from "../../assets/images/iconKhoresht.png";

import "./foodCategoryList.scss";

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
	}, [dispatch]);

	return (
		<>
			<ListGroup>
				{foodCategorysActive?.map((fc) => (
					<label className="pointer" key={fc.id}>
						<ListGroup.Item className="d-flex justify-content-between align-items-start mb-1">
							<Image
								src={
									fc.id === 1
										? iconKebabrice
										: fc.id === 2
										? iconKhoresht
										: iconInternational
								}
								alt={fc.name}
							/>
							<Badge bg="secondary" pill>
								{fc.id}
							</Badge>
							<div className="ms-2 me-auto">
								<div className="fw-bold text-primary">
									{fc.name}
								</div>
								{fc.description}
							</div>
							<Badge bg="primary" pill>
								14 Items
							</Badge>
						</ListGroup.Item>
					</label>
				))}
			</ListGroup>
		</>
	);
};

export default FoodCategory;
