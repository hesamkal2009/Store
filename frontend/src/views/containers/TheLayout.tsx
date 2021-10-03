import React from "react";
import { RouteComponentProps } from "react-router-dom";

import TheHeader from "./TheHeader";
import TheContent from "./TheContent";
import TheFooter from "./TheFooter";

class TheLayout extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<React.Fragment>
				<div className="container-fluid">
					<TheHeader {...this.props} />
					<TheContent {...this.props} />
					<TheFooter {...this.props} />
				</div>
			</React.Fragment>
		);
	}
}

export default TheLayout;
