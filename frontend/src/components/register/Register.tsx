import React from "react";
import { RouteComponentProps } from "react-router";
import { Col, Row, FloatingLabel, Form, Button } from "react-bootstrap";
import {
	RegisterCommand,
	UserManagerClient,
} from "../../services/web-api-client";
import * as config from "../../config.json";
import agentInstance from "../../services/httpService";
import { toast } from "react-toastify";
import { login, getCurrentUser } from "../../services/authService";
import "./register.scss";

class Register extends React.Component<RouteComponentProps<{}>> {
	prevLocation: any = this.props.location.state;
	state = {
		email: "",
		userName: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		claims: null,
		roles: null,
	};

	handleInputChange = (e: any) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleRegister = async (e: any) => {
		e.preventDefault();
		const { email, userName, password, confirmPassword, phoneNumber } =
			this.state;

		if (
			password === "" ||
			confirmPassword === "" ||
			password !== confirmPassword
		) {
			toast.warn(
				"Entered password and confirm password does not match!",
				{
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
			return;
		}

		const command: RegisterCommand = {
			email,
			userName,
			password,
			phoneNumber,
		};

		const userManagerService = new UserManagerClient(
			config.serviceUrl,
			agentInstance
		);

		let result;
		try {
			result = await userManagerService.register(command);
			if (result !== undefined) {
				toast.success("Magical, Your Account Created Successfully!", {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				toast.success("You'll redirected to home in a jiffy!", {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});

				login(email, password, false);
			}
		} catch (error) {
			console.log(error);
			toast.error(
				"Ooops! Sending message failed, You might want to try it again!",
				{
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
		}
	};

	render() {
		if (getCurrentUser()) {
			this.props.history.push(
				this.prevLocation ? this.prevLocation.pathname : "/"
			);
		}
		return (
			!getCurrentUser() && (
				<Row className="register mt-5 mb-5">
					<Col lg={{ span: 6, offset: 3 }}>
						<div className="register__form mt-4 p-4">
							<Form className="row g-3">
								<h4>Create an account in seconds!</h4>

								<div className="col-6">
									<FloatingLabel
										controlId="floatingInput"
										label="User Name"
										className="mb-3"
									>
										<Form.Control
											type="text"
											placeholder="UserName"
											name="userName"
											value={this.state.userName}
											onChange={(e) =>
												this.handleInputChange(e)
											}
										/>
									</FloatingLabel>
								</div>

								<div className="col-6">
									<FloatingLabel
										controlId="floatingInput"
										label="Email address"
										className="mb-3"
									>
										<Form.Control
											type="email"
											placeholder="name@example.com"
											name="email"
											value={this.state.email}
											onChange={(e) =>
												this.handleInputChange(e)
											}
										/>
									</FloatingLabel>
								</div>

								<div className="col-6">
									<FloatingLabel
										controlId="floatingPassword"
										label="Phone Number"
									>
										<Form.Control
											type="text"
											name="phoneNumber"
											placeholder="Phone Number"
											value={this.state.phoneNumber}
											onChange={(e) =>
												this.handleInputChange(e)
											}
										/>
									</FloatingLabel>
								</div>

								<hr className="mt-4" />

								<div className="col-6">
									<FloatingLabel
										controlId="floatingInput"
										label="Password"
										className="mb-3"
									>
										<Form.Control
											type="password"
											placeholder="Password"
											name="password"
											value={this.state.password}
											onChange={(e) =>
												this.handleInputChange(e)
											}
										/>
									</FloatingLabel>
								</div>

								<div className="col-6">
									<FloatingLabel
										controlId="floatingInput"
										label="Confirm Password"
										className="mb-3"
									>
										<Form.Control
											type="password"
											placeholder="Confirm Password"
											name="confirmPassword"
											value={this.state.confirmPassword}
											onChange={(e) =>
												this.handleInputChange(e)
											}
										/>
									</FloatingLabel>
								</div>

								<hr className="mt-4" />

								<div className="col-12">
									<Button
										type="submit"
										className="float-end"
										onClick={(e) => this.handleRegister(e)}
									>
										Register
									</Button>
								</div>
							</Form>
						</div>
					</Col>
				</Row>
			)
		);
	}
}

export default Register;
