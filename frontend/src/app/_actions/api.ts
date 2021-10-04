import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction<object>("api/callBegan");
export const apiCallSuccess = createAction<object>("api/callSuccess");
export const apiCallFailed = createAction<object>("api/callFailed");
