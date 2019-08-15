import React from "react";
import PropTypes from "prop-types";
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

NavItem.propTypes = {
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired
};
