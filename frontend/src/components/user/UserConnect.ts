import { callForUsers, getUsers } from "../../app/users";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { useAppDispatch } from "../../app/_hooks";
import User from "./User";

interface Dispatch {
	dispatch(): () => typeof useAppDispatch;
}

interface StateRoot{
	state,
	ownProps
}

function mapDispatchToProps(dispatch: Dispatch) {
	return {
		callForUsers: () => {
			dispatch(callForUsers());
		},
	};
}

function mapStateToProps(state, ownProps) {
	return {
		state,
		ownProps,
	};
}

// * https://stackoverflow.com/questions/49384270/does-order-in-which-you-wrap-component-with-connect-and-withrouter-matter
export const UserConnect = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(User)
);
