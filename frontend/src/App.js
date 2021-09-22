import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {
  notFound,
  internalServerError,
  unAuthorized,
  forbidden,
} from "./library/constants/errorTypes";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Layout
const Home = React.lazy(() => import("./pages/Home"));

// Pages
const User = React.lazy(() => import("./pages/user/User"));
const Posts = React.lazy(() => import("./pages/posts/Posts"));
const Login = React.lazy(() => import("./pages/login/Login"));
const UserConnect = React.lazy(() => import("./pages/user/UserConnect"));
const Register = React.lazy(() => import("./pages/register/Register"));
const ErrorPage = React.lazy(() => import("./library/pages/DynamicErrors"));

function App() {
  return (
    <React.Fragment>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            path="/users"
            name="User Page"
            render={(props) => (
              <UserConnect>
                <User {...props} />
              </UserConnect>
            )}
          />
          <Route
            path="/posts"
            name="Login Page"
            render={(props) => <Posts {...props} />}
          />
          <Route
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />}
          />
          <Route
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          />
          <Route
            exact
            path="/401"
            name="Page 401"
            render={(props) => (
              <ErrorPage {...props} errorType={unAuthorized} />
            )}
          />
          <Route
            exact
            path="/403"
            name="Page 403"
            render={(props) => <ErrorPage {...props} errorType={forbidden} />}
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <ErrorPage {...props} errorType={notFound} />}
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => (
              <ErrorPage {...props} errorType={internalServerError} />
            )}
          />
          <Route
            exact
            path="/"
            name="Home"
            render={(props) => <Home {...props} />}
          />
          <Redirect from="/" to="/" />
          <Redirect to="/404" />
        </Switch>
      </React.Suspense>
    </React.Fragment>
  );
}

export default App;
