import React from "react";

const Home = React.lazy(() => import("../views/home/Home"));
const Posts = React.lazy(() => import("../components/post/Posts"));
const About = React.lazy(() => import("../components/about/about"));
const Page401 = React.lazy(() => import("../pages/errors/Page401"));
const Page403 = React.lazy(() => import("../pages/errors/Page403"));
const Page404 = React.lazy(() => import("../pages/errors/Page404"));
const Page500 = React.lazy(() => import("../pages/errors/Page500"));

const routes = [
	{ path: "/posts", name: "Posts Page", component: Posts },
	{ path: "/about", name: "About Page", component: About },
	{ path: "/401", name: "Page 401", component: Page401 },
	{ path: "/403", name: "Page 403", component: Page403 },
	{ path: "/404", name: "Page 404", component: Page404 },
	{ path: "/500", name: "Page 500", component: Page500 },
	{ path: "/", exact: true, name: "Home", component: Home },
	{ path: "/", name: "Home" },
];

export default routes;
