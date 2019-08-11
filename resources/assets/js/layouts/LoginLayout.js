import React, {useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {Collapse} from "react-collapse";
import {Login} from "../components/auth/Login";
import {BrowserRouter, Route} from "react-router-dom";
import {Register} from "../components/auth/Register";

export function LoginLayout()
{
	const [ message, setMessage ] = useState("");
	return(
		<BrowserRouter>
			<Row id="login-card">
				<Col className="text-center">
					<Collapse isOpened={message.length > 0}>
						<Card bg="danger" text="white">{message}</Card>
					</Collapse>
					{/* Login page routes */}
					<Route exact path="/login" component={() => <Login setMessage={setMessage} />} />
					<Route path="/register" component={() => <Register setMessage={setMessage} />} />
				</Col>
			</Row>
		</BrowserRouter>
	);
}