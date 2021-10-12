import React from "react";
// @ts-ignore
import { Slide } from "react-slideshow-image";
import { Image } from "react-bootstrap";
import "react-slideshow-image/dist/styles.css";
import "./slideShow.scss";

export const Slideshow = (props: any) => {
	return (
		<div className="slide-container">
			<Slide>
				{props.slideImages.map((slideImage: any, index: any) => (
					<Image
						key={index}
						src={slideImage}
						width="1920"
						height="850"
					/>
				))}
			</Slide>
		</div>
	);
};
