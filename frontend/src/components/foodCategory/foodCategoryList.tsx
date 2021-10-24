import { ListGroup, Image, Badge } from "react-bootstrap";

import iconAllFoods from "../../assets/images/iconAllFoods.png";
import iconInternational from "../../assets/images/iconInternational.png";
import iconKebabrice from "../../assets/images/iconKebabrice.png";
import iconKhoresht from "../../assets/images/iconKhoresht.png";
import { FoodCategoryDto } from "../../services/web-api-client";

import "./foodCategoryList.scss";
import { FoodDto } from "./../../services/web-api-client";

const FoodCategory = (props: any) => {
	const { filterChange } = props;

	const handleFilterChange = (categoryId: number) => {
		filterChange(categoryId);
	};

	return (
		<>
			<ListGroup>
				<label className="pointer" key="all">
					<ListGroup.Item
						className="d-flex justify-content-between align-items-start mb-1"
						onClick={(e) => handleFilterChange(0)}
					>
						<Image
							src={iconAllFoods}
							alt="Select All Foods In Menu"
						/>
						<Badge bg="secondary" pill>
							1
						</Badge>
						<div className="ms-2 me-auto">
							<div className="fw-bold text-primary">
								All Items On The Menu
							</div>
							Displays all items on the menu.
						</div>
						<Badge bg="primary" pill>
							{props.foodList.length} Items
						</Badge>
					</ListGroup.Item>
				</label>
				{props.foodCategoryList?.map((fc: FoodCategoryDto) => (
					<label className="pointer" key={fc.id}>
						<ListGroup.Item
							className="d-flex justify-content-between align-items-start mb-1"
							onClick={(e) => handleFilterChange(fc.id)}
						>
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
								{fc.id + 1}
							</Badge>
							<div className="ms-2 me-auto">
								<div className="fw-bold text-primary">
									{fc.name}
								</div>
								{fc.description}
							</div>
							<Badge bg="primary" pill>
								{
									props.foodList.filter(
										(food: FoodDto) =>
											food.foodCategoryId === fc.id
									).length
								}
							</Badge>
						</ListGroup.Item>
					</label>
				))}
			</ListGroup>
		</>
	);
};

export default FoodCategory;
