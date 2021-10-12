import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { login } from "../../services/authService";
import { getCurrentUser } from "../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row, FloatingLabel, Form, Button } from "react-bootstrap";
import "./Login.scss";

class Login extends React.Component<RouteComponentProps<{}>> {
	prevLocation: any = this.props.location.state;
	state = {
		userName: "hesamkal2009@gmail.com",
		password: "!Admin1!",
		rememberMe: false,
	};

	handleInputChange = (e: any) => {
		if (e.target.name === "rememberMe") {
			this.setState({ [e.target.name]: !this.state.rememberMe });
			return;
		}

		this.setState({ [e.target.name]: e.target.value });
	};

	handleLogin = (e: any) => {
		e.preventDefault();
		const { userName, password, rememberMe } = this.state;
		login(userName, password, rememberMe, this.prevLocation?.pathname);
	};

	render() {
		if (getCurrentUser()) {
			this.props.history.push(
				this.prevLocation ? this.prevLocation.pathname : "/"
			);
		}
		return (
			!getCurrentUser() && (
				<section>
					<Row>
						<Col lg={{ span: 4, offset: 4 }}>
							<div className="login__form mt-4 p-4">
								<Form className="row g-3">
									<h4>Welcome Back!</h4>
									<div className="col-12">
										<FloatingLabel
											controlId="floatingInput"
											label="Email address"
											className="mb-3"
										>
											<Form.Control
												type="email"
												placeholder="name@example.com"
												name="userName"
												value={this.state.userName}
												onChange={(e) =>
													this.handleInputChange(e)
												}
											/>
										</FloatingLabel>
									</div>
									<div className="col-12">
										<FloatingLabel
											controlId="floatingPassword"
											label="Password"
										>
											<Form.Control
												type="password"
												name="password"
												value={this.state.password}
												onChange={(e) =>
													this.handleInputChange(e)
												}
												placeholder="Password"
											/>
										</FloatingLabel>
									</div>
									<div className="col-12">
										<Form.Group
											className="mb-3"
											controlId="formBasicCheckbox"
										>
											<Form.Check
												type="checkbox"
												id="rememberMe"
												name="rememberMe"
												checked={this.state.rememberMe}
												onChange={(e) =>
													this.handleInputChange(e)
												}
												label="Remember me?"
											/>
										</Form.Group>
									</div>
									<div className="col-12">
										<Button
											type="submit"
											className="float-end"
											onClick={(e) => this.handleLogin(e)}
										>
											<span className="btn-label">
												<FontAwesomeIcon
													icon={[
														"fas",
														"sign-in-alt",
													]}
												/>{" "}
											</span>
											Login
										</Button>
									</div>
								</Form>
								<hr className="mt-4" />
								<div className="col-12">
									<p className="text-center mb-0">
										Not Registered yet?{" "}
										<NavLink to="/register">
											<Button
												type="button"
												variant="secondary"
												className="btn-sm"
											>
												<span className="btn-label">
													<FontAwesomeIcon
														icon={[
															"fas",
															"user-plus",
														]}
													/>{" "}
												</span>
												Register
											</Button>
										</NavLink>
									</p>
								</div>
							</div>
						</Col>
					</Row>
				</section>
			)
		);
	}
}

export default Login;
