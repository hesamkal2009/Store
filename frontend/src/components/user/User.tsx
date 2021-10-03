import React from "react";
import { RouteComponentProps } from "react-router-dom";

class User extends React.Component<RouteComponentProps<{}>> {
	constructor(props) {
		super(props);
		this.props.callForUsers();
	}

	render() {
		return (
			<div>
				<h1>Users</h1>
				<ul>
					{this.props.state.entities.users.list.map((user) => (
						<li key={user.id}>{user.email}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default User;
