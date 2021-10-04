import jwtDecode from "jwt-decode";
import { httpService } from "./httpService";
import { baseURL, auth } from "../config.json";
import { UserManagerClient } from "../services/web-api-client";

httpService.setJwt(getJwt());

const command = {
	email: String,
	password: String,
};

var userManagerClient = new UserManagerClient(baseURL)();

export async function login(email, password) {
	const { data: jwt } = await userManagerClient.login(
		command.email,
		command.password
	);
	storeJwtToken(auth.tokenKeyName, jwt);
}

export function logout() {
	removeJwtToken();
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

function storeJwtToken(jwt) {
	localStorage.setItem(auth.tokenKeyName, jwt);
}

function removeJwtToken() {
	localStorage.removeItem(auth.tokenKeyName);
}

export const authService = {
	login,
	logout,
	getCurrentUser,
	getJwt,
};
