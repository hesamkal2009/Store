import React from "react";
import { RouteComponentProps } from "react-router";
import { Col, Row, FloatingLabel, Form, Button } from "react-bootstrap";
import {
	ContactMeClient,
	ContactMeCommand,
} from "../../services/web-api-client";
import * as config from "../../config.json";
import agentInstance from "../../services/httpService";
import { toast } from "react-toastify";
import "./contactMe.scss";

class ContactMe extends React.Component<RouteComponentProps<{}>> {
	state = {
		fullName: "",
		subject: "",
		phoneNumber: "",
		email: "",
		message: "",
	};

	handleInputChange = (e: any) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleContactMe = async (e: any) => {
		e.preventDefault();
		const { fullName, subject, email, message, phoneNumber } = this.state;

		const command: ContactMeCommand = {
			fullName,
			email,
			subject,
			phoneNumber,
			message,
		};

		const contactMeService = new ContactMeClient(
			config.serviceUrl,
			agentInstance
		);

		let result;
		try {
			result = await contactMeService.create(command);
			if (result !== undefined) {
				toast.success("Fabulous, Your message has been sent!", {
					position: toast.POSITION.TOP_RIGHT,
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
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
		return (
			<Row className="contactMe">
				<Col lg={{ span: 6, offset: 3 }}>
					<div className="contactMe__form mt-4 p-4">
						<Form className="row g-3">
							<h4>Let me know what you think!</h4>

							<div className="col-12">
								<FloatingLabel
									controlId="floatingInput"
									label="Full Name"
									className="mb-3"
								>
									<Form.Control
										type="text"
										placeholder="John Smith"
										name="fullName"
										value={this.state.fullName}
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

							<div className="col-12">
								<FloatingLabel
									controlId="floatingPassword"
									label="Subject"
								>
									<Form.Control
										type="text"
										name="subject"
										placeholder="Subject"
										value={this.state.subject}
										onChange={(e) =>
											this.handleInputChange(e)
										}
									/>
								</FloatingLabel>
							</div>

							<div className="col-12">
								<FloatingLabel
									controlId="floatingPassword"
									label="Message"
								>
									<Form.Control
										as="textarea"
										name="message"
										placeholder="Message"
										style={{
											height: "100px",
										}}
										value={this.state.message}
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
									onClick={(e) => this.handleContactMe(e)}
								>
									Send
								</Button>
							</div>
						</Form>
					</div>
				</Col>
			</Row>
		);
	}
}

export default ContactMe;
