import React from "react";
import { RouteComponentProps } from "react-router-dom";
import AboutMe from "../../components/aboutMe/aboutMe";

class About extends React.Component<RouteComponentProps<{}>> {
	render() {
		return <AboutMe />;
	}
}

export default About;
