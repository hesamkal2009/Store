import { createAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../_store/store";

export const logToConsole = createAction("log/logToConsole");

export const log = (dispatch: AppDispatch, getState: Function) => {
	return dispatch(logToConsole());
};
