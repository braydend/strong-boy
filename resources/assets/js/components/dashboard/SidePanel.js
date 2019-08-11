import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Col, Row } from "react-bootstrap";
import NavItem from "./NavItem";

export default class SidePanel extends Component {
	render() {
		return (
			<div className="dashboard-side-panel">
				<NavItem name="Dashboard" link="/" />
				<NavItem name="Exercises" link="/exercise" />
				{/* <NavItem name="Muscle Map" link="/musclemap" /> */}
			</div>
		);
	}
}
