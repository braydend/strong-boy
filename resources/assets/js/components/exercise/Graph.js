import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";

export function Graph({ match }) {
	const [exerciseId, setExerciseId] = useState(match.params.exerciseId);
	const [init, setInit] = useState(false);
	const [sets, setSets] = useState([]);
	const [chartData, setChartData] = useState({});

	const updateSets = () => {
		axios.get(`/ajax/exercise/${exerciseId}/sets`).then(res => {
			setSets(
				res.data.map((set, i) => (
					<tr key={i}>
						<td>{set.date}</td>
						<td>{set.weight}</td>
						<td>{set.reps}</td>
					</tr>
				))
			);
		});
	};

	const updateChartData = () => {
		axios.get(`/ajax/exercise/${exerciseId}/chart`).then(res => {
			setChartData(() => {
				let obj = {};
				res.data.forEach(set => {
					const date = set[0].date.match(
						"(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)"
					)[0];
					obj[date] = set[1];
				});
				return obj;
			});
		});
	};

	useEffect(() => {
		ReactChartkick.addAdapter(Chart);
		if (!init) {
			updateSets();
			updateChartData();
			setInit(true);
		}
	});

	return (
		<div className="exercise-view">
			<Card>
				<Card.Header>
					<Link to="/exercise/">Back to exercises</Link>
				</Card.Header>
				<Card.Body>
					<LineChart data={chartData} />
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
						<tbody>{sets}</tbody>
					</Table>
				</Card.Footer>
			</Card>
		</div>
	);
}
