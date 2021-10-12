import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Slideshow } from "../../components/slideShow/slideShow";
import legend from "../../assets/images/legend.jpg";
import haftseen from "../../assets/images/haftseen.jpg";
import baqlava from "../../assets/images/baqlava.jpg";
import dizi from "../../assets/images/dizi.jpg";
import hen from "../../assets/images/hen.jpg";
import shandiz from "../../assets/images/shandiz.jpg";
import sweets from "../../assets/images/sweets.jpg";
import "./Home.scss";

const foodPics = [legend, haftseen, baqlava, dizi, hen, shandiz, sweets];
class Home extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<>
				<div className="legend">
					<Slideshow slideImages={foodPics} />
					<section className="about">
						<div className="sub-title">
							<p></p>
						</div>
					</section>
					<section className="about2"></section>
				</div>
			</>
		);
	}
}

export default Home;
