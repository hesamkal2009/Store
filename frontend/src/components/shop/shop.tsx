import React from "react";
import { Col, Row } from "react-bootstrap";
import Cart from "../Cart/cart";
import Food from "../food/foodList";
import FoodCategory from "../foodCategory/foodCategoryList";

export interface IShopProps {}

const Shop: React.FC<IShopProps> = (props) => {
	return (
		<>
			<Row className="mt-5 mb-5">
				<Col md={{ span: 3 }} className="mt-4">
					<FoodCategory />
					<Col className="mt-4">
						<Cart />
					</Col>
				</Col>
				<Col>
					<Food />
				</Col>
			</Row>
		</>
	);
};

export default Shop;
