import React from "react";
import { Col, Row } from "react-bootstrap";
import "./motivation.scss";

export interface IMotivationProps {}

const Motivation: React.FC<IMotivationProps> = (props) => {
	return (
		<Row className="motivation">
			<Col className="text-center">
				<p>Let's Free two birds with one key</p>
				<p>This project was created with two goals in mind</p>
				<p>
					The first goal was to demonstrate my practical knowledge of
					programming
				</p>
				<p>
					but it was not such a good enough motivation to create this,
					So I decided to do a bit more
				</p>
				<p>
					And the second goal was to introduce a bit Persian Culture
					and Foods
				</p>
			</Col>
		</Row>
	);
};

export default Motivation;
