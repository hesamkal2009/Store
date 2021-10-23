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

class TheHeader extends React.Component<RouteComponentProps<{}>> {
	private readonly user = getCurrentUser();

	handleRedirectToLoginPage() {
		this.props.history.push("/login", this.props.location);
	}

	handleLogout(): void {
		return logout();
	}

	render() {
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
							{!this.user && (
								<LinkContainer to="/register">
									<Nav.Link>Register</Nav.Link>
								</LinkContainer>
							)}
							<LinkContainer to="/shop">
								<Nav.Link>Order</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/cart">
								<Nav.Link>
									<Button variant="secondary">
										<FontAwesomeIcon
											icon={["fas", "shopping-cart"]}
										/>{" "}
										<Badge bg="light" text="dark">
											9
										</Badge>
										<span className="visually-hidden">
											Items in cart
										</span>
									</Button>
								</Nav.Link>
							</LinkContainer>

							{!this.user ? (
								<Button
									id="header__login-button"
									variant="secondary"
									onClick={() =>
										this.handleRedirectToLoginPage()
									}
								>
									Login / Register
								</Button>
							) : (
								<NavDropdown
									title={this.user?.email}
									id="adminDropdown"
									className={
										this.props.location.pathname ===
											"/profile" ||
										this.props.location.pathname ===
											"/logout"
											? "dropdown__text-active"
											: ""
									}
								>
									<LinkContainer to="/profile">
										<NavDropdown.Item>
											Profile
										</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Divider />
									<LinkContainer to="#">
										<NavDropdown.Item
											onClick={() => this.handleLogout()}
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
	}
}

export default TheHeader;
