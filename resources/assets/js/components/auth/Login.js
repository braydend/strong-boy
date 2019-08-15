import React, { useState } from "react";
import { Row, Col, Card, Form, InputGroup, Button } from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export function Login({ setMessage }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleLogin = () => {
		setIsLoading(true);
		axios
			.post("login", {
				email: email,
				password: password
			})
			.then(response => {
				location.reload();
			})
			.catch(error => {
				setMessage(`
					${error.response.data.errors.email ? error.response.data.errors.email : ""}
					${
	error.response.data.errors.password
		? error.response.data.errors.password
		: ""
}
					`);
				setIsLoading(false);
			});
	};

	const handleEnterOnLogin = event => {
		if (event.key === "Enter") {
			handleLogin();
		}
	};

	return (
		<Card>
			<Card.Header>Login to Strongr</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group as={Row} controlId="loginEmail">
						<Form.Label column sm={2}>
							Email:
						</Form.Label>
						<Col sm={10}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>@</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="email"
									name="email"
									placeholder="email@here.com"
									value={email}
									onKeyPress={e => handleEnterOnLogin(e)}
									onChange={e => setEmail(e.target.value)}
								/>
							</InputGroup>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Form.Label column sm={2}>
							Password:
						</Form.Label>
						<Col sm={10}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>***</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="password"
									name="password"
									placeholder="YourSecretPassword"
									value={password}
									onKeyPress={e => handleEnterOnLogin(e)}
									onChange={e => setPassword(e.target.value)}
								/>
							</InputGroup>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="loginButtons">
						<Col className="center" sm={4}>
							<ReactLoading type="spin" color="#555555" hidden={!isLoading} />
						</Col>
						<Col sm={4}>
							<Button variant="success" onClick={() => handleLogin()}>
								Login
							</Button>
						</Col>
						<Col sm={4}>
							<Button
								variant="danger"
								onClick={() => {
									setPassword("");
									setEmail("");
								}}
							>
								Reset
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</Card.Body>
			<Card.Footer>
				<Link to="register">Click here to get Strongr</Link>
			</Card.Footer>
		</Card>
	);
}

Login.propTypes = {
	setMessage: PropTypes.func.isRequired
};
