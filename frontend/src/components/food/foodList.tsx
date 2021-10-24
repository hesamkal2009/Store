import React from "react";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import koobideh from "../../assets/images/koobideh.jpg";
import soltani from "../../assets/images/soltani.jpg";
import shandiz from "../../assets/images/shandiz.jpg";
import salad from "../../assets/images/salad.jpg";
import frenchFries from "../../assets/images/frenchFries.jpg";
import sohan from "../../assets/images/sohan.jpg";
import chocolate from "../../assets/images/chocolate.jpg";
import { addCommas, removeNonNumeric } from "../../library/utils/number";
import { FoodDto } from "../../services/web-api-client";
import "./foodlist.scss";

const Food = (props: any) => {
	const pictureProvider = (foodName: string | undefined) => {
		switch (foodName) {
			case "Koobideh":
				return koobideh;
			case "Soltani":
				return soltani;
			case "Shandiz":
				return shandiz;
			case "Salad":
				return salad;
			case "French Fries":
				return frenchFries;
			case "Sohan":
				return sohan;
			case "Chocolate":
				return chocolate;
			default:
				return koobideh;
		}
	};

	const foodlistFilter = (selectedFilter: number): Array<FoodDto> => {
		return selectedFilter === 0
			? props.foodList
			: props.foodList.filter(
					(o: FoodDto) => o.foodCategoryId === selectedFilter
			  );
	};

	const handleAddToCart = (foodId: number) => {
		props.addToCart(foodId);
	};

	return (
		<div>
			<Row>
				{foodlistFilter(props.selectedFilter)?.map((fc: FoodDto) => (
					<React.Fragment key={fc.name}>
						<Col
							md={{ span: 3, offset: 2 }}
							sm={{ span: 4, offset: 3 }}
							xs={{ span: 9, offset: 2 }}
							className="mt-4 mb-4"
						>
							<Card className="foodList__card">
								<Card.Img
									variant="top"
									src={pictureProvider(fc.name)}
								/>
								<Card.Body>
									<Card.Title>{fc.name}</Card.Title>
									<Card.Text>{fc.name}</Card.Text>
									<Badge
										bg={
											fc.foodInventoryStatus?.name ===
											"Available"
												? "success"
												: fc.foodInventoryStatus
														?.name === "RunningLow"
												? "warning"
												: "danger"
										}
										className="pull-right foodList__badge"
									>
										{fc.foodInventoryStatus?.name}
									</Badge>
									<Button
										variant="dark"
										disabled={
											fc.foodInventoryStatus?.name ===
											"RanOut"
										}
										onClick={() => handleAddToCart(fc.id)}
									>
										<FontAwesomeIcon
											icon={["fas", "plus-circle"]}
										/>{" "}
										{addCommas(
											removeNonNumeric(
												fc.price.toString()
											)
										)}{" "}
										Rials
									</Button>
								</Card.Body>
							</Card>
						</Col>
					</React.Fragment>
				))}
			</Row>
		</div>
	);
};

export default Food;
