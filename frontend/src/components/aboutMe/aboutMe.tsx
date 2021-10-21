import React from "react";
import { Col, Row } from "react-bootstrap";
import HesamKalhor from "../../assets/images/HesamKalhor.jpg";
import "./aboutMe.scss";

export interface IAboutMeProps {}

const AboutMe: React.FC<IAboutMeProps> = (props) => {
	return (
		<>
			<Row className="aboutMe">
				<Col md={{ span: 4 }}>
					<p>Hi, Welcome!</p>
					<p>
						I'm <span className="signature">Hesam Kalhor</span>
					</p>
					<p>
						I'm a Software Developer with more than six years of
						experience creating enterprise web applications, mainly
						using the .NET ecosystem and tools provided by
						Microsoft. Expert-level proficiency with various
						development tools such as .NET, C#, SQL Server, and
						Entity framework. I also have practical knowledge of
						SOLID Principles, REST, Clean Architecture, and tools
						like Git, Visual Studio, and VS Code. I'd the honor of
						working closely with lots of talented, inspirational,
						and bright people throughout my professional career.
						Additionally, I always do my best to be a useful,
						approachable, and friendly asset in the team because the
						way I see it, any success or failure affects the whole
						team. The team is the most proper environment to make
						all members thrive to their maximum excellence and
						capacity. I mostly prefer the front-end, back-end, and
						SQL Server development rather than implementing
						front-end designs. Moreover, I have plans of learning
						Docker and Azure in place, to acquire the
						afore-mentioned skills ASAP.
					</p>
				</Col>
				<Col md={{ span: 4 }}>
					<img
						className="aboutMe__hesamKalhor"
						src={HesamKalhor}
						alt="HesamKalhor"
					/>
				</Col>
			</Row>
		</>
	);
};

export default AboutMe;
