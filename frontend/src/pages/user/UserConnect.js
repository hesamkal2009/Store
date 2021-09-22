import { getUsers, getUsersCount } from "../../app/users";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import User from "./User";

function mapDispatchToProps(dispatch) {
  return {
    getUsers: () => {
      dispatch(getUsers());
    },
    getUsersCount: () => {
      dispatch(getUsersCount());
    },
  };
}

function mapStateToProps(state, ownProps) {
  return state.entities.users;
}
// * https://stackoverflow.com/questions/49384270/does-order-in-which-you-wrap-component-with-connect-and-withrouter-matter
export const UsersConnect = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(User)
);
