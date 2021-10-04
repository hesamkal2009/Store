import jwtDecode from "jwt-decode";
import agentInstance, { httpService } from "./httpService";
import { baseURL, auth } from "../config.json";
import { UserManagerClient, LoginCommand } from "./web-api-client";

httpService.setJwt(getJwt());

const userManagerClient = new UserManagerClient(baseURL, agentInstance);

function storeJwtToken(jwt: string) {
	localStorage.setItem(auth.tokenKeyName, jwt);
}

function removeJwtToken() {
	localStorage.removeItem(auth.tokenKeyName);
}

export async function login(email: string, password: string) {
	const command: LoginCommand = {
		email: email,
		password: password,
	};

	const jwt = await userManagerClient.login(command);
	storeJwtToken(jwt);
}

export function logout() {
	removeJwtToken();
}

export function getJwt() {
	return localStorage.getItem(auth.tokenKeyName);
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

export const authService = {
	login,
	logout,
	getCurrentUser,
	getJwt,
};
