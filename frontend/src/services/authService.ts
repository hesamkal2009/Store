import jwtDecode from "jwt-decode";
import agentInstance, { httpService } from "./httpService";
import { serviceUrl, auth } from "../config.json";
import {
	UserManagerClient,
	LoginCommand,
	LoginViewModel,
} from "./web-api-client";
import { toast } from "react-toastify";

httpService.setJwt(getJwt());

const userManagerClient = new UserManagerClient(serviceUrl, agentInstance);

function storeJwtToken(jwt: string) {
	localStorage.setItem(auth.tokenKeyName, jwt);
}

function removeJwtToken() {
	localStorage.removeItem(auth.tokenKeyName);
}

export async function login(
	email: string,
	password: string,
	rememberMe: boolean = false,
	prevPathName: string = "/"
) {
	const command: LoginCommand = {
		email: email,
		password: password,
		rememberMe: rememberMe,
	};

	let result: LoginViewModel;
	try {
		result = await userManagerClient.login(command);
		if (result.identityToken !== undefined) {
			storeJwtToken(result.identityToken);
			toast.success("Fabulous! Successful login, Welcome!", {
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			setTimeout(() => {
				window.location.href = prevPathName;
			}, 2000);
		}
	} catch (error) {
		console.log(error);
		toast.error(
			"Ooops! Login failed, You might want to check your credentials!",
			{
				position: toast.POSITION.TOP_RIGHT,
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			}
		);
	}
}

export function logout() {
	try {
		removeJwtToken();
		toast.warn("It's so sad to see you leaving, Have a great day!", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	} catch (error) {
		toast.error("Ooops! Logout failed!", {
			position: toast.POSITION.TOP_RIGHT,
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	}
}

export function getJwt(): string | null {
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
