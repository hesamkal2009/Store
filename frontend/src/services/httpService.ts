import axios from "axios";
import { logger } from "./logService";
import { toast } from "react-toastify";

axios.interceptors.response.use(undefined, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status < 500;

	if (!expectedError) {
		logger.log(error);
		toast.error("An unexpected error occurred.");
	}

	return Promise.reject(error);
});

var jwtToken: string | null = "";
function setJwt(jwt: string | null) {
	axios.defaults.headers.common["x-auth-token"] = jwt;
	jwtToken = jwt;
}

const agentInstance = axios.create({
	headers: {
		common: {
			Authorization: `x-auth-token ${jwtToken}`,
		},
	},
	transformResponse: [],
});
export default agentInstance;

export const httpService = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
	setJwt,
};
