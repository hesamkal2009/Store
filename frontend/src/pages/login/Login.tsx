import React from "react";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "../../services/authService";
import { getCurrentUser } from "./../../services/authService";

class Login extends React.Component<RouteComponentProps<{}>> {
	state = {
		userName: "hesamkal2009@gmail.com",
		password: "!Admin1!",
	};

	handleInputChange = (e: any) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleLogin = (e: any) => {
		e.preventDefault();
		const { userName, password } = this.state;
		login(userName, password);
	};

	render() {
		if (getCurrentUser()) {
			this.props.history.push("/home");
		}
		return (
			!getCurrentUser() && (
				<>
					<div className="container">
						<div className="row">
							<div className="col-md-4 offset-md-4">
								<div className="login-form bg-light mt-4 p-4">
									<form
										action=""
										method=""
										className="row g-3"
									>
										<h4>Welcome Back</h4>
										<div className="col-12">
											<label>Username</label>
											<input
												type="text"
												name="userName"
												className="form-control"
												placeholder="Username"
												value={this.state.userName}
												onChange={(e) =>
													this.handleInputChange(e)
												}
											/>
										</div>
										<div className="col-12">
											<label>Password</label>
											<input
												type="password"
												name="password"
												className="form-control"
												placeholder="Password"
												value={this.state.password}
												onChange={(e) =>
													this.handleInputChange(e)
												}
											/>
										</div>
										{/* <div className="col-12">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="rememberMe"
												onChange={(e) =>
													this.handleInputChange(e)
												}
											/>
											<label
												className="form-check-label"
												htmlFor="rememberMe"
											>
												{" "}
												Remember me
											</label>
										</div>
									</div> */}
										<div className="col-12">
											<button
												type="submit"
												className="btn btn-success float-end"
												onClick={(e) =>
													this.handleLogin(e)
												}
											>
												<span className="btn-label">
													<FontAwesomeIcon
														icon={[
															"fas",
															"user-plus",
														]}
													/>{" "}
												</span>
												Login
											</button>
										</div>
									</form>
									<hr className="mt-4" />
									<div className="col-12">
										<p className="text-center mb-0">
											Have not account yet?{" "}
											<NavLink to="/register">
												<button
													type="button"
													className="btn btn-labeled btn-primary btn-sm"
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
												</button>
											</NavLink>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)
		);
	}
}

export default Login;
