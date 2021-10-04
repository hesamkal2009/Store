import * as actions from "../_actions/logger";

const logger =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		next(action);

		if (actions.logToConsole.type === action.type) {
		}
	};

export default logger;
