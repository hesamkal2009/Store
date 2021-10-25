import React from "react";

const home = React.lazy(() => import("../views/home/Home"));
const cart = React.lazy(() => import("../components/cart/cart"));
const shop = React.lazy(() => import("../components/shop/shop"));
const login = React.lazy(() => import("../components/login/Login"));
const register = React.lazy(() => import("../components/register/Register"));
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
	{ path: "/cart", name: "Cart", component: cart, protected: true },
	{ path: "/shop", name: "Shop", component: shop, protected: false },
	{ path: "/food", name: "Food", component: food, protected: false },
	{ path: "/about", name: "About Page", component: about, protected: false },
	{
		path: "/foodCategory",
		name: "Food Category",
		component: foodCategory,
		protected: false,
	},
	{ path: "/login", name: "Login", component: login, protected: false },
	{
		path: "/register",
		name: "Register",
		component: register,
		protected: false,
	},
	{ path: "/401", name: "Page 401", component: page401, protected: false },
	{ path: "/403", name: "Page 403", component: page403, protected: false },
	{ path: "/404", name: "Page 404", component: page404, protected: false },
	{ path: "/500", name: "Page 500", component: page500, protected: false },
	{ path: "/", exact: true, name: "Home", component: home, protected: false },
	{ path: "/", name: "Home", protected: false },
];

export default routes;
