import React from "react";

const home = React.lazy(() => import("../views/home/Home"));
const login = React.lazy(() => import("../views/login/Login"));
const register = React.lazy(() => import("../views/register/Register"));
const about = React.lazy(() => import("../views/about/about"));
const food = React.lazy(() => import("../components/food/foodList"));
const foodCategory = React.lazy(
	() => import("../components/foodCategory/foodCategoryList")
);
const page401 = React.lazy(() => import("../pages/errors/Page401"));
const page403 = React.lazy(() => import("../pages/errors/Page403"));
const page404 = React.lazy(() => import("../pages/errors/Page404"));
const page500 = React.lazy(() => import("../pages/errors/Page500"));

const routes = [
	{ path: "/login", name: "Login", component: login },
	{ path: "/register", name: "Register", component: register },
	{ path: "/food", name: "Food", component: food },
	{ path: "/foodCategory", name: "Food Category", component: foodCategory },
	{ path: "/about", name: "About Page", component: about },
	{ path: "/401", name: "Page 401", component: page401 },
	{ path: "/403", name: "Page 403", component: page403 },
	{ path: "/404", name: "Page 404", component: page404 },
	{ path: "/500", name: "Page 500", component: page500 },
	{ path: "/", exact: true, name: "Home", component: home },
	{ path: "/", name: "Home" },
];

export default routes;
