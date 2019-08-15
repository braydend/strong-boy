import React, { useState } from "react";
import { Collapse } from "react-collapse";
import axios from "axios";
import { Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CardRow as ExerciseCardRow } from "./CardRow";
import { QuickAdder } from "./QuickAdder";
import moment from "moment";
import PropTypes from "prop-types";

export function Card({ exercise }) {
	const [sets, setSets] = useState([]);
	const [exerciseId, setExerciseId] = useState(exercise.id);
	const [showAdder, setShowAdder] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [showEdit, setShowEdit] = useState(false);

	const updateSets = async () => {
		setIsLoading(true);
		await axios
			.get(`/ajax/dashboard/exercise/${exercise.id}/sets`)
			.then(response => {
				setSets(
					response.data.map((set, i) => {
						if (set.date === moment(new Date()).format("MMM DD[,] YYYY")) {
							setShowEdit(true);
						}
						return (
							<ExerciseCardRow
								key={i}
								id={set.id}
								exercise_id={exerciseId}
								date={set.date}
								weight={set.weight}
								reps={set.reps}
							/>
						);
					})
				);
				setIsLoading(false);
			});
	};

	return (
		<div className="card-container">
			<div className="card text-center">
				<div className="card-header">
					<span className="maximise-card">
						<i
							className="fas fa-plus-circle"
							hidden={!isCollapsed}
							onClick={() => {
								setIsCollapsed(!isCollapsed);
								updateSets();
							}}
						/>
						<i
							className="fas fa-minus-circle"
							hidden={isCollapsed}
							onClick={() => setIsCollapsed(!isCollapsed)}
						/>
					</span>
					<span className="h3">
						<b>{exercise.name}</b>
					</span>
					<span className="exercise-icons">
						<button
							className="btn btn-primary"
							title="Add Workout"
							id="quckAddSet"
							onClick={() => setShowAdder(!showAdder)}
						>
							<i className="fas fa-plus" />
						</button>
						<Link to={`/exercise/${exerciseId}`}>
							<button
								className="btn btn-success"
								title="Show Progress"
								id="viewExercise"
							>
								<i className="fas fa-chart-line" />
							</button>
						</Link>
					</span>
				</div>
				<div className="card-body">
					<Collapse className="quickadder-collapse" isOpened={showAdder}>
						<QuickAdder
							toggle={() => setShowAdder(!showAdder)}
							exercise_id={exercise.id}
							updater={() => updateSets()}
						/>
					</Collapse>
					<Collapse isOpened={!isCollapsed}>
						<div className="loader" hidden={!isLoading}>
							<Spinner
								animation="border"
								variant="secondary"
								hidden={!isLoading}
							/>
						</div>
						<div className="card-data">
							<Table responsive>
								<thead>
									<tr>
										<th scope="col">Date</th>
										<th scope="col">Weight (KG)</th>
										<th scope="col">Reps</th>
										<th scope="col" hidden={!showEdit} />
									</tr>
								</thead>
								<tbody>{sets}</tbody>
							</Table>
						</div>
					</Collapse>
				</div>
			</div>
			<br />
		</div>
	);
}

Card.propTypes = {
	exercise: PropTypes.shape({
		name: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired
	}).isRequired
};
