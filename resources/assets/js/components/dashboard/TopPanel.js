import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

export function TopPanel({ pageName, user })
{
	return (
		<div className="dashboard-top-panel">
			<Row>
				<Col md={12} lg={4}>
					<div className="brand">
						Strongr
					</div>
				</Col>
				<Col md={12} lg={4}>
					<div className="context">
						{ pageName}
					</div>
				</Col>
				<Col md={12} lg={4}>
					<div className="auth">
						<span className="icon">icon</span>
						{ user }
					</div>
				</Col>
			</Row>
		</div>
	);
}
