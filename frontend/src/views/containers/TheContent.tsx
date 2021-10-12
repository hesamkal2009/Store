import React, { Suspense } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

//! routes config
import routes from "../../routes/routes";

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

class TheContent extends React.Component<RouteComponentProps<{}>> {
	render() {
		return (
			<Suspense fallback={loading}>
				<Switch>
					{routes.map((route, idx) => {
						return (
							route.component && (
								<Route
									key={idx}
									path={route.path}
									exact={route.exact}
									render={(props) => (
										<route.component {...props} />
									)}
								/>
							)
						);
					})}
					<Redirect exact from="/home" to="/" />
					<Redirect to="/404" />
				</Switch>
			</Suspense>
		);
	}
}

export default TheContent;
