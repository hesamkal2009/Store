// @ts-ignore
import { Slide } from "react-slideshow-image";
import { Col, Row } from "react-bootstrap";
import "react-slideshow-image/dist/styles.css";
import "./slideShow.scss";

export const SlideShow = (props: any) => {
	return (
		<Row>
			<Col>
				<div className="slide-container">
					<Slide>
						{props.slideImages.map(
							(slideImage: any, index: any) => (
								<div className="each-slide" key={index}>
									<div
										style={{
											height: `900px`,
											backgroundSize: "cover",
											backgroundRepeat: "no-repeat",
											backgroundImage: `url(${slideImage.url})`,
										}}
									>
										<div className="slider__caption">
											<span className="slider__caption_text">
												{slideImage.caption}
											</span>
										</div>
									</div>
								</div>
							)
						)}
					</Slide>
				</div>
			</Col>
		</Row>
	);
};
