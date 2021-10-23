import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Table } from "react-bootstrap";
import { addCommas, removeNonNumeric } from "../../library/utils/number";
import "./cart.scss";

export interface ICartProps {}

const Cart: React.FC<ICartProps> = (props) => {
	return (
		<Row className="cart">
			<Col>
				<h4 className="fancy-text">Your Shopping Cart</h4>
				<hr />
				<Table>
					<thead>
						<tr>
							<th className="fancy-text-sm text-center"></th>
							<th className="fancy-text-sm text-center">Name</th>
							<th className="fancy-text-sm text-center">
								Unit Price
							</th>
							<th className="fancy-text-sm text-center">
								Quantity
							</th>
							<th className="fancy-text-sm text-center">
								Items Price
							</th>
						</tr>
					</thead>
					<tbody className="text-center">
						<tr>
							<td>
								<Button
									variant="danger"
									size="sm"
									className="cart__button"
								>
									<FontAwesomeIcon
										icon={["fas", "times-circle"]}
									/>
								</Button>
							</td>
							<td>Shandiz</td>
							<td>{addCommas(removeNonNumeric("1800000"))}</td>
							<td>
								{" "}
								<Button
									variant="secondary"
									size="sm"
									className="cart__button"
								>
									<FontAwesomeIcon
										icon={["fas", "minus-circle"]}
									/>
								</Button>{" "}
								3{" "}
								<Button
									variant="secondary"
									size="sm"
									className="cart__button"
								>
									<FontAwesomeIcon
										icon={["fas", "plus-circle"]}
									/>
								</Button>
							</td>
							<td>
								{addCommas(
									removeNonNumeric(
										(parseInt("1800000") * 2).toString()
									)
								)}
							</td>
						</tr>
					</tbody>
				</Table>
				<hr />
				<h4 className="fancy-text">Account</h4>
				<div className="mt-4 mb-4">
					<span className="fancy-text-sm">Tax (9%): </span>
					<span>
						{addCommas(
							removeNonNumeric(parseInt("36000").toString())
						)}
					</span>
				</div>
				<div className="mt-4 mb-4">
					<span className="fancy-text-md">Total: </span>
					<span>
						{addCommas(
							removeNonNumeric(
								(parseInt("1800000") * 2 + 360000).toString()
							)
						)}
					</span>
				</div>
				<p>**Excluding delivery costs**</p>
			</Col>
		</Row>
	);
};

export default Cart;
