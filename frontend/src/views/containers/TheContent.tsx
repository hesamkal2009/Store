import React, { Suspense } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

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
			<main className="container-fluid content-panel">
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
			</main>
		);
	}
}

export default TheContent;
