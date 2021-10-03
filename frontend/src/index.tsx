import "ts-polyfill/lib/es2016-array-include";
import "ts-polyfill/lib/es2017-object";
import "ts-polyfill/lib/es2017-string";
import "ts-polyfill/lib/es2018-async-iterable"; // for-await-of
import "ts-polyfill/lib/es2018-promise";
import "ts-polyfill/lib/es2019-array";
import "ts-polyfill/lib/es2019-object";
import "ts-polyfill/lib/es2019-string";
import "ts-polyfill/lib/es2019-symbol";
import "ts-polyfill/lib/es2020-promise";
import "ts-polyfill/lib/es2020-string";
import "ts-polyfill/lib/es2020-symbol-wellknown";
import "ts-polyfill/lib/es2020-global-this"; // globalThis (no tsconfig.json lib)

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/_store/store";
import * as serviceWorker from "./serviceWorker";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
