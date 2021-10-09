import jwtDecode from "jwt-decode";
import agentInstance, { httpService } from "./httpService";
import { serviceUrl, auth } from "../config.json";
import { UserManagerClient, LoginCommand } from "./web-api-client";

httpService.setJwt(getJwt());

const userManagerClient = new UserManagerClient(serviceUrl, agentInstance);

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

	const result = await userManagerClient.login(command);
	console.log(result);
	if (result.identityToken !== undefined) {
		storeJwtToken(result.identityToken);
		window.location.href = "/";
	}
}

export function logout() {
	removeJwtToken();
	window.location.reload();
}

export function getJwt() {
	return localStorage.getItem(auth.tokenKeyName);
}

export interface jwtData {
	nameId: string;
	email: string;
	UserName: string;
	PhoneNumberConfirmed: boolean;
	EmailConfirmed: boolean;
	role: string;
	nbf: number;
	exp: number;
	iat: number;
}

export function getCurrentUser(): jwtData | null {
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
