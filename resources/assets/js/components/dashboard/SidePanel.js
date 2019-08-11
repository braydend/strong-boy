import React, { Component } from "react";
import NavItem from "../NavItem";

export function SidePanel()
{
	return (
		<div className="dashboard-side-panel">
			<NavItem name="Dashboard" link="/" />
			<NavItem name="Exercises" link="/exercise" />
			{/* <NavItem name="Muscle Map" link="/musclemap" /> */}
		</div>
	);
}
