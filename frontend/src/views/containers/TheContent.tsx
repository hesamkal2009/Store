import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

//! routes config
import routes from "../../routes/routes";

const loading = (
	<div className="pt-3 text-center">
		<div className="sk-spinner sk-spinner-pulse"></div>
	</div>
);

// const User = React.lazy(() => import("../components/user/User"));

class TheContent extends React.Component {
	render() {
		return (
			<main className="container-fluid">
				<Suspense fallback={loading}>
					<Switch>
						{routes.map((route, idx) => {
							return route.component && route.connector ? (
								<Route
									key={idx}
									path={route.path}
									exact={route.exact}
									name={route.name}
									render={(props) => (
										<route.connector>
											<route.component {...props} />
										</route.connector>
									)}
								/> //! You just need to wrap the child component ITSELF, NOT the route that is assigned to it.
							) : (
								route.component && (
									<Route
										key={idx}
										path={route.path}
										exact={route.exact}
										name={route.name}
										render={(props) => <route.component {...props} />}
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
