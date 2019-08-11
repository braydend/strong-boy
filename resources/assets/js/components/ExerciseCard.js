import React, { Component } from "react";
import { Collapse } from "react-collapse";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ExerciseCardRow from "./ExerciseCardRow";
import QuickAdder from "./exercise/QuickAdder";
import moment from "moment";

export default class ExerciseCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sets: [],
			id: props.exercise.id,
			showAdder: false,
			collapsed: true,
			loading: false,
			showEdit: false,
		};
		this.toggleQuickAdder = this.toggleQuickAdder.bind(this);
		this.toggleCollapse = this.toggleCollapse.bind(this);
		this.updateSets = this.updateSets.bind(this);
	}

	toggleCollapse() {
		if (this.state.collapsed) {
			this.updateSets(this.state.id);
		}
		this.setState({ collapsed: !this.state.collapsed });
	}


	async updateSets(id) {
		this.setState({ loading: true });
		await axios.get(`/int-api/exercise/${id}/sets`)
			.then((response) => {
				this.setState({ sets: [] });
				this.setState({ sets: response.data.map((set, i) => {
					if (set.date === moment(new Date()).format("MMM DD[,] YYYY")) {
						this.setState({showEdit: true});
					}
					return <ExerciseCardRow key={i} id={set.id} exercise_id={this.state.id} date={set.date} weight={set.weight} reps={set.reps} />;
				}) });
				this.setState({ loading: false });
			});
	}

	toggleQuickAdder() {
		this.setState({ showAdder: !this.state.showAdder });
	}

	render() {
		return (
			<div className="card-container">
				<div className="card text-center">
					<div className="card-header">
						<span className="maximise-card">
							<i className="fas fa-plus-circle" hidden={!this.state.collapsed} onClick={() => this.toggleCollapse()} />
							<i className="fas fa-minus-circle" hidden={this.state.collapsed} onClick={() => this.toggleCollapse()} />
						</span>
						<span className="h3"><b>{this.props.exercise.name}</b></span>
						<span className="exercise-icons">
							<button className="btn btn-primary" title="Add Workout" id="quckAddSet" onClick={() => this.toggleQuickAdder()}>
								<i className="fas fa-plus" />
							</button>
							<Link to={`/exercise/${this.state.id}`}>
								<button className="btn btn-success" title="Show Progress" id="viewExercise">
									<i className="fas fa-chart-line" />
								</button>
							</Link>
						</span>
					</div>
					<div className="card-body">
						<Collapse className="quickadder-collapse" isOpened={this.state.showAdder}>
							<QuickAdder toggle={this.toggleQuickAdder} exercise_id={this.state.id} updater={this.updateSets} />
						</Collapse>
						<Collapse isOpened={!this.state.collapsed}>
							<div className="loader" hidden={!this.state.loading}>
								<Spinner animation="border" variant="secondary" hidden={!this.state.loading} />
							</div>
							<div className="card-data">
								<Table responsive>
									<thead>
										<tr>
											<th scope="col">Date</th>
											<th scope="col">Weight (KG)</th>
											<th scope="col">Reps</th>
											<th scope="col" hidden={!this.state.showEdit} />
										</tr>
									</thead>
									<tbody>
										{this.state.sets}
									</tbody>
								</Table>
							</div>
						</Collapse>
					</div>
				</div>
				<br />
			</div>

		);
	}
}
