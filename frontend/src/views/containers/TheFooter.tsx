import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class TheFooter extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<footer className="row">
				<div className="col-12  py-3 bg-dark">
					<span className="text-muted">
						All rights reserved © Copyright
					</span>
				</div>
			</footer>
		);
	}
}

export default TheFooter;
