import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {this.props.list.map((user) => (
            <li key={user.id}>{user.email}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default User;
