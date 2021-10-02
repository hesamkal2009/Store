import React from "react";
import {
	unAuthorized,
	forbidden,
	notFound,
	internalServerError,
} from "../../library/constants/errorTypes";

const ErrorPage = (props) => {
	return (
		<React.Fragment>
			<h1>Page 403</h1>
		</React.Fragment>
	);
};

export default ErrorPage;
