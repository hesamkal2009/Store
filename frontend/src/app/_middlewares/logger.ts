import * as actions from "../_actions/logger";

const logger =
	(params: string) => (store: any) => (next: any) => (action: any) => {
		next(action);

		if (actions.logToConsole.type === action.type) {
			console.log("action.payload :>> ", action.payload);
		}
	};

export default logger;
