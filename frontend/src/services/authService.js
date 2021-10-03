import jwtDecode from "jwt-decode";
import http from "./httpService";
import { baseURL, auth } from "../config.json";

const apiEndpoint = baseURL + auth.urls.loginUrl;

http.setJwt(getJwt());

export async function login(email, password) {
	const { data: jwt } = await http.post(apiEndpoint, { email, password });
	console.log("JWT Answer IS  :>> ", jwt);
	//localStorage.setItem(auth.tokenKeyName, jwt);
}

export function storeJwtToken(jwt) {
	localStorage.setItem(auth.tokenKeyName, jwt);
}

export function removeJwtToken() {
	localStorage.removeItem(auth.tokenKeyName);
}

export function getCurrentUser() {
	try {
		const jwt = getJwt();

		if (jwt && jwt !== undefined && jwt !== null) return jwtDecode(jwt);
		else return null;
	} catch (ex) {
		return null;
	}
}

export function getJwt() {
	return localStorage.getItem(auth.tokenKeyName);
}

export const authService = {
	login,
	storeJwtToken,
	removeJwtToken,
	getCurrentUser,
	getJwt,
};
