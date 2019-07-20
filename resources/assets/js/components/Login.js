import React, { Component } from "react";
import {
	Row, Col, Card, Form, InputGroup, Button,
} from "react-bootstrap";
import { Collapse } from "react-collapse";
import axios from "axios";
import ReactLoading from "react-loading";
import { forEach } from "react-bootstrap/es/utils/ElementChildren";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			status: "unauthenticated",
			name: "",
			email: "",
			password: "",
			passwordC: "",
			message: undefined,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleRegistration = this.handleRegistration.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleEnterOnLogin = this.handleEnterOnLogin.bind(this);
	}

	handleRegistration() {
		this.setState({
			loading: true,
			message: undefined,
		});
		axios.post("register", {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password,
			password_confirmation: this.state.passwordC,
		})
			.then((response) => {
				location.reload();
			})
			.catch((error) => {
				this.state.message === undefined ? this.setState({ message: "" }) : null;
				error.response.data.errors.name !== undefined ? this.setState({ message: `${this.state.message + error.response.data.errors.name} | ` }) : null;
				error.response.data.errors.email !== undefined ? this.setState({ message: `${this.state.message + error.response.data.errors.email} | ` }) : null;
				error.response.data.errors.password !== undefined ? this.setState({ message: this.state.message + error.response.data.errors.password }) : null;
				this.setState({
					loading: false,
				});
			});
	}

	handleLogin() {
		this.setState({
			loading: true,
			message: undefined,
		});
		axios.post("login", {
			email: this.state.email,
			password: this.state.password,
		})
			.then((response) => {
				location.reload();
			})
			.catch((error) => {
				this.state.message === undefined ? this.setState({ message: "" }) : null;
				error.response.data.errors.email !== undefined ? this.setState({ message: this.state.message + error.response.data.errors.email }) : null;
				error.response.data.errors.password !== undefined ? this.setState({ message: this.state.message + error.response.data.errors.password }) : null;
				this.setState({
					loading: false,
				});
			});
	}

	handleReset() {
		this.setState({
			name: "",
			email: "",
			password: "",
			passwordC: "",
		});
	}

	handleChange(event) {
		switch (event.target.name) {
		case "name":
			this.setState({ name: event.target.value });
			break;

		case "email":
			this.setState({ email: event.target.value });
			break;

		case "password":
			this.setState({ password: event.target.value });
			break;

		case "passwordC":
			this.setState({ passwordC: event.target.value });
			break;
		}
	}

	loading() {
		return (
			<ReactLoading type="spin" color="#555555" hidden={!this.state.loading} />
		);
	}

	handleEnterOnLogin(event) {
		if (event.key === "Enter") {
			this.handleLogin();
		}
	}

	login() {
		return (
			<Card>
				<Card.Header>
                    Login to Strongr
				</Card.Header>
				<Card.Body>
					<Form>
						<Form.Group as={Row} controlId="loginEmail">
							<Form.Label column sm={2}>Email:</Form.Label>
							<Col sm={10}>
								<InputGroup>
									<InputGroup.Prepend>
										<InputGroup.Text>@</InputGroup.Text>
									</InputGroup.Prepend>
									<Form.Control type="email" name="email" placeholder="email@here.com" value={this.state.email} onKeyPress={this.handleEnterOnLogin} onChange={this.handleChange} />
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
									<Form.Control type="password" name="password" placeholder="YourSecretPassword" value={this.state.password} onKeyPress={this.handleEnterOnLogin} onChange={this.handleChange} />
								</InputGroup>
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="loginButtons">
							<Col className="center" sm={4}>
								{ this.state.loading ? this.loading() : null}
							</Col>
							<Col sm={4}>
								<Button variant="success" onClick={this.handleLogin}>Login</Button>
							</Col>
							<Col sm={4}>
								<Button variant="danger" onClick={this.handleReset}>Reset</Button>
							</Col>
						</Form.Group>
					</Form>
				</Card.Body>
				<Card.Footer>
					<b onClick={() => this.setState({ status: "register" })}>Click here to get Strongr</b>
				</Card.Footer>
			</Card>
		);
	}

	register() {
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
									<Form.Control type="text" name="name" placeholder="Your Name" value={this.state.name} onKeyPress={this.handleEnterOnLogin} onChange={this.handleChange} />
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
									<Form.Control type="email" name="email" placeholder="email@here.com" value={this.state.email} onKeyPress={this.handleEnterOnLogin} onChange={this.handleChange} />
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
									<Form.Control type="password" name="password" placeholder="YourSecretPassword" value={this.state.password} onKeyPress={this.handleEnterOnLogin} onChange={this.handleChange} />
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
									<Form.Control type="password" name="passwordC" placeholder="YourSecretPassword" value={this.state.passwordC} onKeyPress={this.handleEnterOnLogin} onChange={this.handleChange} />
								</InputGroup>
							</Col>
						</Form.Group>
						<Form.Group as={Row} controlId="loginButtons">
							<Col sm={4}>
								<Button variant="success" onClick={this.handleRegistration}>Register</Button>
							</Col>
							<Col sm={4}>
								{ this.state.loading ? this.loading() : null}
							</Col>
							<Col sm={4}>
								<Button variant="danger" onClick={this.handleReset}>Reset</Button>
							</Col>
						</Form.Group>
					</Form>
				</Card.Body>
				<Card.Footer>
					<b onClick={() => this.setState({ status: "unauthenticated" })}>Already have an account? Click here to login</b>
				</Card.Footer>
			</Card>
		);
	}

	render() {
		return (
			<Row id="login-card">
				<Col className="text-center">
					<Collapse isOpened={this.state.message !== undefined}>
						<Card bg="danger" text="white">{this.state.message}</Card>
					</Collapse>
					{ this.state.status === "unauthenticated" ? this.login() : this.register() }
				</Col>
			</Row>
		);
	}
}
