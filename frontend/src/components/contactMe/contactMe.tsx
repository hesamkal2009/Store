import React from "react";
import { Col, Row } from "react-bootstrap";
import "./contactMe.scss";

export interface IContactMeProps {}

const ContactMe: React.FC<IContactMeProps> = (props) => {
	return (
		<>
			<Row className="contactMe">
				<Col>
					<form action=""></form>
				</Col>
			</Row>
		</>
	);
};

export default ContactMe;
