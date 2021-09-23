import { callForUsers, getUsersCount } from "../../app/users";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import User from "./User";

function mapDispatchToProps(dispatch) {
	return {
		callForUsers: () => {
			dispatch(callForUsers());
		},
	};
}

function mapStateToProps(state, ownProps) {
	return {
		getUsersCount: getUsersCount(),
		state,
	};
}

// * https://stackoverflow.com/questions/49384270/does-order-in-which-you-wrap-component-with-connect-and-withrouter-matter
export const UserConnect = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(User)
);
