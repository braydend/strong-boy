import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

export function TopPanel({ pageName, userName }) {
	return (
		<div className="dashboard-top-panel">
			<Row>
				<Col md={12} lg={4}>
					<div className="brand">Strongr</div>
				</Col>
				<Col md={12} lg={4}>
					<div className="context">{pageName}</div>
				</Col>
				<Col md={12} lg={4}>
					<div className="auth">
						<span className="icon">icon</span>
						{userName}
					</div>
				</Col>
			</Row>
		</div>
	);
}

TopPanel.propTypes = {
	pageName: PropTypes.string.isRequired,
	userName: PropTypes.string.isRequired
};
