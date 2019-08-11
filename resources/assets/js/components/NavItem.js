import React from "react";
import { Link } from "react-router-dom";

export function NavItem({ name, link }) {
	return (
		<Link to={link}>
			<div className="nav-item">
				<h2>{name}</h2>
			</div>
		</Link>
	);
}
