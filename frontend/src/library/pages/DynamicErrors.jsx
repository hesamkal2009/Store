import React from "react";
import {
  unAuthorized,
  forbidden,
  notFound,
  internalServerError,
} from "../constants/errorTypes";

const ErrorPage = (props) => {
  return (
    <React.Fragment>
      {props.errorType === unAuthorized && (
        <h1>This is an UnAuthorized Access</h1>
      )}
      {props.errorType === forbidden && <h1>This is an Forbidden Access</h1>}
      {props.errorType === notFound && <h1>the requested ULR Not Found</h1>}
      {props.errorType === internalServerError && (
        <h1>This is an Internal Server Error</h1>
      )}
    </React.Fragment>
  );
};

export default ErrorPage;
