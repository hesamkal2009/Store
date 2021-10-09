import axios from "axios";
import * as actions from "../_actions/api";
import { baseURL } from "../../config.json";

const api: any = (store: any) => (next: any) => async (action: any) => {
	if (action.type !== actions.apiCallBegan.type) return next(action);
	const { url, method, data, onStart, onSuccess, onError, logResponse } =
		action.payload;

	if (onStart) store.dispatch({ type: onStart });

	next(action);

	await axios
		.request({
			baseURL,
			url,
			method,
			data,
		})
		.then((response) => {
			if (logResponse) {
				console.table(response);
			}

			// General
			store.dispatch(actions.apiCallSuccess(response.data));
			// Specific
			if (onSuccess)
				store.dispatch({ type: onSuccess, payload: response.data });
		})
		.catch((error) => {
			// General
			store.dispatch(actions.apiCallFailed(error.message));
			// Specific
			if (onError)
				store.dispatch({ type: onError, payload: error.message });
		});
};

export default api;
