import React, { Component } from "react";
import TopPanel from "../components/TopPanel";
import SidePanel from "../components/SidePanel";
import Dashboard from "../components/Dashboard";

export default class DashboardLayout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: undefined,
			loading: true,
			exercises: {},
		};
		this.dashboard = this.dashboard.bind(this);
	}

	dashboard() {
		this.setState({
			content: <Dashboard />,
		});
	}

	componentDidMount() {
		this.dashboard();
	}

	render() {
		return (
			<div className="layout">
				<TopPanel pageName="Dashboard" user="bar" />
				<SidePanel />
				{this.state.content}
			</div>
		);
	}
}
