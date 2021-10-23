import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/_hooks";
import {
	getPaginatedFoods,
	selectActivePaginatedFoods,
	selectPaginatedFoodsActive,
} from "../../app/foodSlice";
import { getState, RootState } from "../../app/_store/store";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import koobideh from "../../assets/images/koobideh.jpg";
import soltani from "../../assets/images/soltani.jpg";
import shandiz from "../../assets/images/shandiz.jpg";
import salad from "../../assets/images/salad.jpg";
import frenchFries from "../../assets/images/frenchFries.jpg";
import sohan from "../../assets/images/sohan.jpg";
import chocolate from "../../assets/images/chocolate.jpg";
import { chdir } from "process";
import { addCommas, removeNonNumeric } from "../../library/utils/number";

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

	return (
		<div>
			<Row>
				{foodsActive?.map((fc) => (
					<>
						<Col
							md={{ span: 3 }}
							xs={{ span: 6 }}
							className="mt-4 mb-4"
							key={fc.name}
						>
							<Card style={{ width: "20rem" }}>
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
										className="pull-right"
									>
										{fc.foodInventoryStatus?.name}
									</Badge>
									<Button variant="secondary">
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
					</>
				))}
			</Row>
		</div>
	);
};

export default Food;
