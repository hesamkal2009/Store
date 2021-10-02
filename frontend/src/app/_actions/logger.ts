import { createAction } from "@reduxjs/toolkit";

export const logToConsole = createAction("log/logToConsole");

export const log = (params) => (dispatch, getState) => {
  return dispatch(logToConsole(params));
};
