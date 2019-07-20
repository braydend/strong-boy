import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import {
	Button, ButtonGroup, FormControl, InputGroup, Spinner,
} from "react-bootstrap";

export default class QuickAdder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.exercise_id,
			date: new Date(),
			weight: 20,
			reps: 5,
			warmup: false,
			lb: false,
			loading: false,
		};

		// Bind functions
		this.saveSet = this.saveSet.bind(this);
		this.perpareData = this.perpareData.bind(this);
		this.resetForm = this.resetForm.bind(this);
		this.handleDateChange = this.handleDateChange.bind(this);
		this.changeWeight = this.changeWeight.bind(this);
		this.changeReps = this.changeReps.bind(this);
		this.changeWarmup = this.changeWarmup.bind(this);
		this.changeWeightFormatToLb = this.changeWeightFormatToLb.bind(this);
		this.handleQuickAddChange = this.handleQuickAddChange.bind(this);
	}

	handleDateChange(date) {
		console.log(date);
		this.setState({ date });
	}

	perpareData() {
		const KG_PER_LB = 2.2046;
		const data = this.state;
		data.exercise_id = this.state.id;
		// Is this line redundant?
		data.warmup = this.state.warmup;
		if (this.state.lb === true) {
			data.weight = this.state.weight / KG_PER_LB;
		} else {
			data.weight = this.state.weight;
		}
		data.date = moment(this.state.date).unix();
		return data;
	}

	saveSet() {
		this.setState({ loading: true });
		// Save Data
		const data = this.perpareData();
		axios.post("/ajax/set/store", data)
			.then(() => {
				this.props.updater(this.state.id);
				// Hide form
				// tell parent component to close collapse holding this component
				this.props.toggle();
				// Clear Data
				this.resetForm();
				this.setState({ loading: false });
			})
			.catch(console.log("error saving data to database"));
	}

	resetForm() {
		// Clear Data
		this.setState({
			warmup: false,
			date: new Date(),
			weight: 20,
			reps: 5,
			lb: false,
		});
	}

	changeWeight(value) {
		if (this.state.weight + value >= 0) {
			this.setState({ weight: Number(this.state.weight) + value });
		}
	}

	changeReps(value) {
		if (this.state.reps + value >= 1) {
			this.setState({ reps: Number(this.state.reps) + value });
		}
	}

	changeWarmup(value) {
		this.setState({ warmup: value });
	}

	changeWeightFormatToLb(value) {
		this.setState({ lb: value });
	}

	handleQuickAddChange(event) {
		switch (event.target.name) {
		case "weight":
			this.setState({ weight: event.target.value });
			break;
		case "reps":
			this.setState({ reps: event.target.value });
			break;
		}
	}

	render() {
		return (
			<div className="quickadder-container">
				<div className="date">
					<DatePicker selected={this.state.date} onChange={this.handleDateChange} />
				</div>
				<div className="set-data">
					<div className="weight">
						<span>Weight</span>
						<InputGroup>
							<InputGroup.Prepend>
								<Button size="sm" variant="warning" onClick={() => { this.changeWeight(-5); }}>-5</Button>
							</InputGroup.Prepend>
							<FormControl size="sm" className="number-field" name="weight" value={this.state.weight} onChange={this.handleQuickAddChange} />
							<InputGroup.Append>
								<Button size="sm" variant="success" onClick={() => { this.changeWeight(10); }}>10</Button>
							</InputGroup.Append>
						</InputGroup>
						<ButtonGroup className="adder-buttons">
							<Button
								variant={this.state.lb ? "info" : "outline-info"}
								size="sm"
								onClick={() => this.changeWeightFormatToLb(true)}
							>
                                LB
							</Button>
							<Button
								variant={this.state.lb ? "outline-info" : "info"}
								size="sm"
								onClick={() => this.changeWeightFormatToLb(false)}
							>
                                KG
							</Button>
						</ButtonGroup>
					</div>
					<div className="reps">
						<span>Reps</span>
						<InputGroup>
							<InputGroup.Prepend>
								<Button size="sm" variant="danger" onClick={() => { this.changeReps(-1); }}>-</Button>
							</InputGroup.Prepend>
							<FormControl name="reps" size="sm" className="number-field" value={this.state.reps} onChange={this.handleQuickAddChange} />
							<InputGroup.Append>
								<Button size="sm" variant="success" onClick={() => { this.changeReps(1); }}>+</Button>
							</InputGroup.Append>
						</InputGroup>
						<ButtonGroup className="adder-buttons">
							<Button
								variant={this.state.warmup ? "secondary" : "outline-secondary"}
								type="radio"
								size="sm"
								onClick={() => this.changeWarmup(true)}
							>
                                Warmup
							</Button>
							<Button
								variant={this.state.warmup ? "outline-success" : "success"}
								type="radio"
								size="sm"
								onClick={() => this.changeWarmup(false)}
							>
                                Real
							</Button>
						</ButtonGroup>
					</div>
				</div>
				<div className="save">
					<ButtonGroup>
						<Button className="save-button" variant="success" size="sm" onClick={() => this.saveSet()}>
							<i className="fa fa-check fa-3x" />
						</Button>
						<Button className="save-button" variant="danger" size="sm" onClick={() => this.resetForm()}>
							<i className="fa fa-times fa-3x" />
						</Button>
					</ButtonGroup>
				</div>
				<div className="loader" hidden={!this.state.loading}>
					<Spinner animation="border" variant="secondary" />
				</div>
			</div>
		);
	}
}
