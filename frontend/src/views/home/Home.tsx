import React from "react";
import { RouteComponentProps } from "react-router-dom";

class Home extends React.Component<RouteComponentProps<{}>> {
	render() {
		return <h1>This is Home</h1>;
	}
}

export default Home;
