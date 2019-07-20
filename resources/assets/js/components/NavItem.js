import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class NavItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			name: this.props.name,
			link: this.props.link
		};
	}

	render() {
		return (
			<a href={this.state.link}>
				<div className="nav-item">
					<h2>{this.state.name}</h2>
				</div>
			</a>
		);
	}
}

