import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./adminDashboard.scss";
import { getCurrentUser } from "./../../../services/authService";

export interface IAdminDashboardProps {}

const AdminDashboard: React.FC<IAdminDashboardProps> = (props) => {
	return (
		<>
			<div className="dashboard__intro">
				<div className="dashboard__intro-text">
					<p>
						This is just a demonstration of accessing a Protected
						Page/Route.
					</p>
				</div>
				<div className="dashboard__intro-text">
					<span>
						Your current assigned role is:{" "}
						{JSON.stringify(getCurrentUser()?.role)}
					</span>
				</div>
				<div className="dashboard__intro-button">
					<LinkContainer to="/">
						<Button variant="primary">Back to Site</Button>
					</LinkContainer>
				</div>
				<div className="dashboard__intro-text">
					<p></p>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
