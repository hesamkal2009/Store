import { Redirect, Route, RouteProps } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

export interface IProtectedRouteProps extends RouteProps {}

export const ProtectedRoute = ({ component: Component, ...rest }: any) => (
	<Route
		{...rest}
		render={(props) =>
			getCurrentUser() ? (
				<Component {...props} />
			) : (
				<>
					<Redirect
						to={{
							pathname: "/login",
							state: { from: props.location },
						}}
					/>
				</>
			)
		}
	/>
);
