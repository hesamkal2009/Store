import axios from "axios";
import * as actions from "../_actions/api";
import { baseURL } from "../../config.json";

const api =
	({ dispatch, getState }) =>
	(next) =>
	async (action) => {
		if (action.type !== actions.apiCallBegan.type) return next(action);

		const { url, method, data, onStart, onSuccess, onError } = action.payload;

		if (onStart) dispatch({ type: onStart });

		next(action);

		await axios
			.request({
				baseURL,
				url,
				method,
				data,
			})
			.then((response) => {
				// General
				dispatch(actions.apiCallSuccess(response.data));
				// Specific
				if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
			})
			.catch((error) => {
				// General
				dispatch(actions.apiCallFailed(error.message));
				// Specific
				if (onError) dispatch({ type: onError, payload: error.message });
			});
	};

export default api;
