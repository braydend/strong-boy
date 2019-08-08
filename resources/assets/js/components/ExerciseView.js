import React, { Component } from "react";
import { Card, Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Chart from "chart.js";

export default class ExerciseView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sets: <tr>
				<td>Please wait...</td>
				<td><Spinner animation="border" variant="secondary" /></td>
				<td>Data is Loading...</td>
			</tr>,
			id: this.props.match.params.exerciseId,
			chartData: {},
		};
		this.getSets = this.getSets.bind(this);
		this.getChartData = this.getChartData.bind(this);

		// Chart setup
		ReactChartkick.addAdapter(Chart);
	}

	// Update sets on mount
	componentDidMount() {
		this.getSets();
		this.getChartData();
	}

	// Get sets related to the exercise
	getSets() {
		axios.get(`/api/exercise/${this.state.id}/sets`)
			.then((res) => {
				this.setState({
					sets: res.data.map((set, i) => (
						<tr key={i}>
							<td>{set.date}</td>
							<td>{set.weight}</td>
							<td>{set.reps}</td>
						</tr>
					)),
				});
			});
	}

	// Get sets to be displayed in chart and update
	getChartData() {
		axios.get(`/ajax/exercise/${this.state.id}/chart`)
			.then((res) => {
				res.data.map((set, i) => {
					const obj = this.state.chartData;
					let date = set[0].date;
					date = date.match("(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)")[0];
					obj[date] = set[1];
					this.setState({ chartData: obj });
				});
			});
	}

	render() {
		return (
			<div className="exercise-view">
				<Card>
					<Card.Header>
						<Link to="/exercise/">
                            Back to exercises
						</Link>
					</Card.Header>
					<Card.Body>
						<LineChart data={this.state.chartData} />
					</Card.Body>
					<Card.Footer>
						<Table striped bordered hover>
							<thead>
								<tr>
									<th>Date</th>
									<th>Weight</th>
									<th>Reps</th>
								</tr>
							</thead>
							<tbody>
								{ this.state.sets }
							</tbody>
						</Table>
					</Card.Footer>
				</Card>
			</div>
		);
	}
}
