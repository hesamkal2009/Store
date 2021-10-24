import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row, Table } from "react-bootstrap";
import { addCommas, removeNonNumeric } from "../../library/utils/number";
import { useSelector } from "react-redux";
import { RootState } from "../../app/_store/store";
import { useAppDispatch } from "./../../app/_hooks";
import {
	CartDto,
	CartItemDto,
	decreaseQuantityOfAnItem,
	increaseQuantityOfAnItem,
	removeItemFromCart,
} from "../../app/cartSlice";
import "./cart.scss";

export interface ICartProps {}

const Cart: React.FC<ICartProps> = (props) => {
	const cartInfo: CartDto = useSelector(
		(state: RootState) => state.entities.cart
	);

	const dispatch = useAppDispatch();

	const deleteCartItem = (cartItemId: number) => {
		dispatch(removeItemFromCart(cartItemId));
	};

	const increaseCartItemQuantity = (cartItemId: number) => {
		dispatch(increaseQuantityOfAnItem(cartItemId));
	};

	const decreaseCartItemQuantity = (cartItemId: number) => {
		dispatch(decreaseQuantityOfAnItem(cartItemId));
	};

	return (
		<Row className="cart">
			<Col>
				<h4 className="fancy-text">
					Your Shopping Cart - {cartInfo.items.length} item
				</h4>

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
						{cartInfo.items && cartInfo.items.length > 0 ? (
							cartInfo?.items.map((cartItem: CartItemDto) => (
								<React.Fragment key={cartItem.id}>
									<tr>
										<td>
											<Button
												variant="danger"
												size="sm"
												className="cart__button"
												onClick={() =>
													deleteCartItem(cartItem.id)
												}
											>
												<FontAwesomeIcon
													icon={[
														"fas",
														"times-circle",
													]}
												/>
											</Button>
										</td>
										<td>{cartItem.name.toString()}</td>
										<td>
											{addCommas(
												removeNonNumeric(
													cartItem.unitPrice.toString()
												)
											)}
										</td>
										<td>
											{" "}
											<Button
												variant="secondary"
												size="sm"
												className="cart__button"
												onClick={() =>
													decreaseCartItemQuantity(
														cartItem.id
													)
												}
											>
												<FontAwesomeIcon
													icon={[
														"fas",
														"minus-circle",
													]}
												/>
											</Button>{" "}
											{cartItem.quantity}{" "}
											<Button
												variant="secondary"
												size="sm"
												className="cart__button"
												onClick={() =>
													increaseCartItemQuantity(
														cartItem.id
													)
												}
											>
												<FontAwesomeIcon
													icon={[
														"fas",
														"plus-circle",
													]}
												/>
											</Button>
										</td>
										<td>
											{addCommas(
												removeNonNumeric(
													(
														cartItem.unitPrice *
														cartItem.quantity
													).toString()
												)
											)}
										</td>
									</tr>
								</React.Fragment>
							))
						) : (
							<tr>
								<td
									colSpan={5}
									className="text-center fancy-text-md"
								>
									{" "}
									Your cart is empty!
								</td>
							</tr>
						)}
					</tbody>
				</Table>
				<hr />
				<h4 className="fancy-text">Account</h4>
				<div className="mt-4 mb-4">
					<span className="fancy-text-sm">Tax (9%): </span>
					<span>
						{addCommas(
							removeNonNumeric(cartInfo.taxPrice.toString())
						)}
					</span>
				</div>
				<div className="mt-4 mb-4">
					<span className="fancy-text-md">Total: </span>
					<span>
						{addCommas(
							removeNonNumeric(cartInfo.totalPrice.toString())
						)}
					</span>
				</div>
				<p>**Excluding delivery costs**</p>
			</Col>
		</Row>
	);
};

export default Cart;
