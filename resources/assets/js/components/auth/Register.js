import React, { useState } from "react";
import {
	Row, Col, Card, Form, InputGroup, Button,
} from "react-bootstrap";
import axios from "axios";
import ReactLoading from "react-loading";
import {Link} from "react-router-dom";

export function Register({ setMessage }) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [cPassword, setCPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleEnterOnLogin = (event) => {
		if (event.key === "Enter") {
			handleRegistration();
		}
	};

	const handleRegistration = () => {
		setIsLoading(true);
		axios.post("register", {
			name: name,
			email: email,
			password: password,
			password_confirmation: cPassword,
		})
			.then((response) => {
				location.reload();
			})
			.catch((error) => {
				setMessage(`
					${error.response.data.errors.name ? error.response.data.errors.name : ""}
					${error.response.data.errors.email ? error.response.data.errors.email : ""}
					${error.response.data.errors.password ? error.response.data.errors.password : ""}
					`);
				setIsLoading(false);
			});
	};

	const handleReset = () => {
		setName("");
		setEmail("");
		setPassword("");
		setCPassword("");
	};

	return (
		<Card>
			<Card.Header>
				Register to Strongr
			</Card.Header>
			<Card.Body>
				<Form>
					<Form.Group as={Row} controlId="userName">
						<Form.Label column sm={2}>Name:</Form.Label>
						<Col sm={10}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>ABC</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="text"
									name="name"
									placeholder="Your Name"
									value={name}
									onKeyPress={(e) => handleEnterOnLogin(e)}
									onChange={(e) => setName(e.target.value)}
								/>
							</InputGroup>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="userEmail">
						<Form.Label column sm={2}>Email:</Form.Label>
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
						<Form.Label column sm={2}>Password:</Form.Label>
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
					<Form.Group as={Row}>
						<Form.Label column sm={2}>Confirm Password:</Form.Label>
						<Col sm={10}>
							<InputGroup>
								<InputGroup.Prepend>
									<InputGroup.Text>***</InputGroup.Text>
								</InputGroup.Prepend>
								<Form.Control
									type="password"
									name="passwordC"
									placeholder="YourSecretPassword"
									value={cPassword}
									onKeyPress={e => handleEnterOnLogin(e)}
									onChange={e => setCPassword(e.target.value)}
								/>
							</InputGroup>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="loginButtons">
						<Col sm={4}>
							<Button variant="success" onClick={() => handleRegistration()}>Register</Button>
						</Col>
						<Col sm={4}>
							<ReactLoading type="spin" color="#555555" hidden={!isLoading}/>
						</Col>
						<Col sm={4}>
							<Button variant="danger" onClick={() => handleReset()}>Reset</Button>
						</Col>
					</Form.Group>
				</Form>
			</Card.Body>
			<Card.Footer>
				<Link to="/login">Already have an account? Click here to login</Link>
			</Card.Footer>
		</Card>
	);
}