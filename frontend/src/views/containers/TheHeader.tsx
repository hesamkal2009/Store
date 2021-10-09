import React from "react";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TheHeader extends React.Component<RouteComponentProps<{}>> {
	private readonly user = getCurrentUser();

	handleLogout(): void {
		return logout();
	}

	render() {
		return (
			<React.Fragment>
				<header className="row">
					<div className="col-12  py-3 bg-dark bg-gradient">
						<nav className="navbar navbar-expand-lg navbar-light navbar-dark">
							<NavLink className="navbar-brand" to="/">
								Best Store
							</NavLink>
							<button
								className="navbar-toggler"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContent"
								aria-controls="navbarSupportedContent"
								aria-expanded="false"
								aria-label="Toggle navigation"
							>
								<span className="navbar-toggler-icon"></span>
							</button>
							<div
								className="collapse navbar-collapse"
								id="navbarSupportedContent"
							>
								<ul className="navbar-nav me-auto mb-2 mb-lg-0">
									<li className="nav-item">
										<NavLink
											className="nav-link"
											to="/home"
										>
											Home
										</NavLink>
									</li>
									<li className="nav-item">
										<NavLink
											className="nav-link"
											to="/about"
										>
											About
										</NavLink>
									</li>
									{!this.user && (
										<>
											<li className="nav-item">
												<NavLink
													className="nav-link"
													to="/login"
												>
													Login
												</NavLink>
											</li>

											<li className="nav-item">
												<NavLink
													className="nav-link"
													to="/register"
												>
													Register
												</NavLink>
											</li>
										</>
									)}
									<li className="nav-item dropdown">
										<div
											className="nav-link dropdown-toggle"
											id="navbarDropdown"
											role="button"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											Tests Pages
										</div>
										<ul
											className="dropdown-menu bg-dark bg-gradient"
											aria-labelledby="navbarDropdown"
										>
											<li className="dropdown-item">
												<NavLink
													className="nav-link navbar-light navbar-dark"
													to="/food"
												>
													Food
												</NavLink>
											</li>
											<div className="dropdown-divider"></div>
											<li>
												<NavLink
													className="nav-link navbar-light navbar-dark"
													to="/foodCategory"
												>
													Food Category
												</NavLink>
											</li>
										</ul>
									</li>
								</ul>
								{this.user && (
									<>
										<div
											className={
												this.user?.PhoneNumberConfirmed
													? "badge bg-info me-3"
													: "badge bg-warning me-3"
											}
										>
											<FontAwesomeIcon
												icon={["fas", "user-circle"]}
											/>
											<span className="text-uppercase m-1">
												{this.user?.UserName}
											</span>
										</div>

										<button
											className="btn bt-danger bg-danger btn-sm text-white me-2"
											onClick={() => this.handleLogout()}
										>
											logout
										</button>
									</>
								)}

								<form className="d-flex">
									<input
										className="form-control me-2"
										type="search"
										placeholder="Search"
										aria-label="Search"
									/>
									<button
										className="btn btn-outline-success"
										type="submit"
									>
										Search
									</button>
								</form>
							</div>
						</nav>
					</div>
				</header>
			</React.Fragment>
		);
	}
}

export default TheHeader;
