import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fakeLogo from "../../assets/images/fakeLogo.png";
import { Navbar, Image, Nav, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class TheFooter extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<footer>
				<div className="dimmer">
					<Row>
						<Col md="3">
							<div className="mb-50">
								<LinkContainer to="/home">
									<Navbar.Brand id="footer__logo">
										<Image
											id="footer__logo-image"
											src={fakeLogo}
										/>
									</Navbar.Brand>
								</LinkContainer>
							</div>
						</Col>

						<Col>
							<div className="col-xl-2 col-lg-2 col-md-5 col-sm-6">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Navigation</h4>
										<hr className="mt-4" />
										<ul>
											<li>
												<LinkContainer to="/">
													<Nav.Link>Home</Nav.Link>
												</LinkContainer>
											</li>
											<li>
												<LinkContainer to="/login">
													<Nav.Link>Login</Nav.Link>
												</LinkContainer>
											</li>
											<li>
												<LinkContainer to="/register">
													<Nav.Link>
														Registration
													</Nav.Link>
												</LinkContainer>
											</li>
											<li>
												<LinkContainer to="/about">
													<Nav.Link>About</Nav.Link>
												</LinkContainer>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</Col>

						<Col>
							<div className="col-xl-2 col-lg-2 col-md-5 col-sm-6">
								<div className="single-footer-caption mb-50">
									<div className="footer-tittle">
										<h4>Useful Links</h4>
										<hr className="mt-4" />
										<ul>
											<li>
												<Nav.Link
													href="https://iran.1stquest.com/blog/5-persian-customs-to-know-before-visiting-iran/"
													target="_blank"
												>
													Customs
												</Nav.Link>
											</li>
											<li>
												<Nav.Link
													href="https://iran.1stquest.com/blog/the-most-delicious-iranian-cuisine-should-not-be-missed/"
													target="_blank"
												>
													Cuisines
												</Nav.Link>
											</li>
											<li>
												<Nav.Link
													href="https://www.mypersiancorner.com/12-traditions-and-customs-only-iranians-will-understand/"
													target="_blank"
												>
													Traditions
												</Nav.Link>
											</li>
											<li>
												<Nav.Link
													href="https://www.mypersiancorner.com/7-tales-of-iranian-hospitality/"
													target="_blank"
												>
													Hospitality
												</Nav.Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</Col>
					</Row>

					<Row className="footer__copyright">
						<Col>
							<hr className="mt-4" />
							<p>
								Copyright ©{new Date().getFullYear()} All rights
								reserved | This template is made with{" "}
								<FontAwesomeIcon icon={["fas", "heart"]} /> by{" "}
								<a
									className="signature"
									href="https://hesamkalhor.com"
									target="_blank"
									rel="noreferrer"
								>
									Hesam Kalhor
								</a>{" "}
								<a
									href="https://twitter.com/Hkalhor"
									target="_blank"
									rel="noreferrer"
								>
									<FontAwesomeIcon
										icon={["fab", "twitter"]}
										className="fa-1x"
									/>
								</a>{" "}
								|{" "}
								<a
									href="https://github.com/hesamkal2009"
									target="_blank"
									rel="noreferrer"
								>
									<FontAwesomeIcon
										icon={["fab", "github-alt"]}
										className="fa-1x"
									/>
								</a>
							</p>
						</Col>
					</Row>
				</div>
			</footer>
		);
	}
}

export default TheFooter;
