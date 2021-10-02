import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap-reboot.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css.map";
import "bootstrap";

//! font-awesome config
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons"; //TODO: Check theses sizes
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "./scss/style.scss";

library.add(far, fas, fab);

const loading = (
	<div className="pt-3 text-center">
		<FontAwesomeIcon icon={["fas", "spinner"]} spin={true} size="6x" />
	</div>
);

//? Layout
const TheLayout = React.lazy(() => import("./views/containers/TheLayout"));

//? Pages

const Login = React.lazy(() => import("./pages/login/Login"));
const Register = React.lazy(() => import("./pages/register/Register"));
const Page401 = React.lazy(() => import("./pages/errors/Page401"));
const Page403 = React.lazy(() => import("./pages/errors/Page403"));
const Page404 = React.lazy(() => import("./pages/errors/Page404"));
const Page500 = React.lazy(() => import("./pages/errors/Page500"));

function App() {
	return (
		<BrowserRouter>
			<React.Suspense fallback={loading}>
				<Switch>
					<Route
						exact
						path="/login"
						render={(props) => <Login {...props} />}
					/>
					<Route
						exact
						path="/register"
						render={(props) => <Register {...props} />}
					/>
					<Route
						exact
						path="/401"
						render={(props) => <Page401 {...props} />}
					/>
					<Route
						exact
						path="/403"
						render={(props) => <Page403 {...props} />}
					/>
					<Route
						exact
						path="/404"
						render={(props) => <Page404 {...props} />}
					/>
					<Route
						exact
						path="/500"
						render={(props) => <Page500 {...props} />}
					/>
					<Route
						path="/"
						render={(props) => <TheLayout {...props} />}
					/>
				</Switch>
			</React.Suspense>
		</BrowserRouter>
	);
}

export default App;
