import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Collapse } from "react-collapse";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";

export function LoginLayout() {
	const [message, setMessage] = useState("");
	const [isLoginMode, setIsLoginMode] = useState(true);

	return (
		<Row id="login-card">
			<Col className="text-center">
				<Collapse isOpened={message.length > 0}>
					<Card bg="danger" text="white">
						{message}
					</Card>
				</Collapse>
				<Card>
					<Card.Header>
						{isLoginMode ? "Login to Strongr" : "Register for Strongr"}
					</Card.Header>
					<Card.Body>
						{isLoginMode ? (
							<Login setMessage={setMessage} />
						) : (
							<Register setMessage={setMessage} />
						)}
					</Card.Body>
					<Card.Footer onClick={() => setIsLoginMode(!isLoginMode)}>
						<span>
							{isLoginMode
								? "Click here to get Strongr"
								: "Already have an account? Click here to login"}
						</span>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
	);
}
