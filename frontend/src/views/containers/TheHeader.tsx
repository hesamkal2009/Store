import React from "react";
import { getCurrentUser, logout } from "../../services/authService";
import { RouteComponentProps } from "react-router-dom";
import {
	Badge,
	Button,
	Image,
	Nav,
	Navbar,
	NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import fakeLogo from "../../assets/images/fakeLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../app/_hooks";
import { RootState } from "../../app/_store/store";
import Modal from "./../../library/components/modal";
import Cart from "../../components/cart/cart";

const TheHeader: React.FC<RouteComponentProps<{}>> = (props) => {
	const user = getCurrentUser();

	const cartItemLength = useAppSelector(
		(state: RootState) => state.entities.cart.items.length
	);

	const handleRedirectToLoginPage = () => {
		props.history.push("/login", { from: props.location });
	};

	const handleLogout = (): void => {
		return logout();
	};

	const label = (
		<>
			<FontAwesomeIcon icon={["fas", "shopping-cart"]} />{" "}
			<Badge bg="light" text="dark">
				{cartItemLength}
			</Badge>{" "}
			<span className="visually-hidden">Items in cart</span>
		</>
	);
	return (
		<header>
			<Navbar id="header__navbar" expand="lg">
				<LinkContainer to="/">
					<Navbar.Brand id="header__logo">
						<Image
							id="header__logo-image"
							src={fakeLogo}
							className="pull-left"
						/>
					</Navbar.Brand>
				</LinkContainer>
				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="ms-auto my-2 my-lg-0" navbarScroll>
						<LinkContainer to="/home">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/about">
							<Nav.Link>About</Nav.Link>
						</LinkContainer>
						{!user && (
							<>
								<LinkContainer to="/register">
									<Nav.Link>Register</Nav.Link>
								</LinkContainer>
							</>
						)}
						<LinkContainer to="/admin/dashboard">
							<Nav.Link>Protected Page</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/shop">
							<Nav.Link>Order</Nav.Link>
						</LinkContainer>
						<Modal
							buttonLabel={label}
							title="Shopping Cart"
							variant="secondary"
							cssClass="header__cart-button"
						>
							<Cart />
						</Modal>

						{!user ? (
							<Button
								id="header__login-button"
								variant="secondary"
								onClick={() => handleRedirectToLoginPage()}
							>
								Login / Register
							</Button>
						) : (
							<NavDropdown
								title={user?.email}
								id="adminDropdown"
								className={
									props.location.pathname === "/profile" ||
									props.location.pathname === "/logout"
										? "dropdown__text-active"
										: ""
								}
							>
								{/* <LinkContainer to="/profile">
									<NavDropdown.Item>
										Profile
									</NavDropdown.Item>
								</LinkContainer>
								<NavDropdown.Divider /> */}
								<LinkContainer to="#">
									<NavDropdown.Item
										onClick={() => handleLogout()}
									>
										Logout
									</NavDropdown.Item>
								</LinkContainer>
							</NavDropdown>
						)}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

export default TheHeader;
