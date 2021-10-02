import * as actions from "../_actions/logger";

const logger =
  (params) =>
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    next(action);

    if (actions.logToConsole.type === action.type) {
      console.log("action.payload :>> ", action.payload);
    }
  };

export default logger;
