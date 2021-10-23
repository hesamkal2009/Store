import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { SlideShow } from "../../components/slideShow/slideShow";
import AboutMe from "../../components/aboutMe/aboutMe";
import { Row, Col } from "react-bootstrap";
//!
import legend from "../../assets/images/legend.jpg";
import haftseen from "../../assets/images/haftseen.jpg";
import baqlava from "../../assets/images/baqlava.jpg";
import dizi from "../../assets/images/dizi.jpg";
import hen from "../../assets/images/hen.jpg";
import shandiz from "../../assets/images/shandiz.jpg";
import sweets from "../../assets/images/sweets.jpg";
//!
import "./Home.scss";
import ContactMe from "../../components/contactMe/contactMe";
import Motivation from "../../components/motivation/motivation";

const slideImages = [
	{
		url: legend,
		caption: "An Introduction to Persian Culture and Foods",
	},
	{
		url: haftseen,
		caption:
			"Explaining Traditional Customs and Ceremonies like Haft Seen ",
	},
	{
		url: baqlava,
		caption: "Sweets! Iranian Sweets are the Sweetest One",
	},
	{
		url: dizi,
		caption: "Read Stories about our Ancient Culture Customs and Foods",
	},
	{
		url: hen,
		caption: "Introducing current Popular Foods",
	},
	{
		url: shandiz,
		caption: "An Overview on luxurious Iranian Foods",
	},
	{
		url: sweets,
		caption:
			"Are you interested to know more about other Iranian Ceremonies and Customs?",
	},
];

class Home extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<>
				<SlideShow slideImages={slideImages} />
				<AboutMe />
				<Motivation />
				<ContactMe {...this.props} />
			</>
		);
	}
}

export default Home;
