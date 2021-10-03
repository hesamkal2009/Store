import React from "react";
import { RouteComponentProps } from "react-router-dom";

class ProductSearch extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<div>
				<input type="text" className="form-control" />
			</div>
		);
	}
}

export default ProductSearch;
