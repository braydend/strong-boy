import React, { useState } from "react";
import moment from "moment";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";

export function CardRow({ id, exercise_id, date, weight, reps }) {
	const [setId, setSetId] = useState(id);
	const [exerciseId, setExerciseId] = useState(exercise_id);
	const [setDate, setSetDate] = useState(date);
	const [setWeight, setSetWeight] = useState(weight);
	const [setReps, setSetReps] = useState(reps);
	const [isLb, setIsLb] = useState(false);
	const [isWarmup, setIsWarmup] = useState(false);
	const [isEdit, setIsEdit] = useState(
		date === moment(new Date()).format("MMM DD[,] YYYY")
	);
	const [isEditMode, setIsEditMode] = useState(false);

	const updateSet = () => {
		const data = {
			weight: setWeight,
			reps: setReps,
			warmup: isWarmup,
			weightFormat: isLb ? "lb" : "kg"
		};
		axios
			.post(`/ajax/set/${setId}/update`, data)
			.catch(console.log("error updating set"));
		setIsEditMode(false);
	};

	const editButtons = () => (
		<span>
			<Button variant="success" size="sm" onClick={() => updateSet()}>
				<img src="icons/baseline_check_circle_outline_white_18dp.png" />
			</Button>
			<Button
				variant="danger"
				size="sm"
				onClick={() => setIsEditMode(!isEditMode)}
			>
				<img src="icons/baseline_close_white_18dp.png" />
			</Button>
		</span>
	);

	return (
		<tr>
			<td>
				{!isEditMode ? (
					setDate
				) : (
					<InputGroup>
						<FormControl disabled defaultValue={setDate} />
					</InputGroup>
				)}
			</td>
			<td>
				{!isEditMode ? (
					setWeight === 0 ? (
						"Bodyweight"
					) : setWeight < 0 ? (
						`Bodyweight - ${setWeight * -1}`
					) : (
						setWeight
					)
				) : (
					<InputGroup>
						<FormControl
							name="weight"
							defaultValue={setWeight}
							onChange={e => setSetWeight(e.target.value)}
						/>
					</InputGroup>
				)}
			</td>
			<td>
				{!isEditMode ? (
					setReps
				) : (
					<InputGroup>
						<FormControl
							name="reps"
							defaultValue={setReps}
							onChange={e => setSetReps(e.target.value)}
						/>
					</InputGroup>
				)}
			</td>
			<td hidden={!isEdit}>
				{!isEditMode ? (
					<Button variant="warning" onClick={() => setIsEditMode(!isEditMode)}>
						Edit
					</Button>
				) : (
					editButtons()
				)}
			</td>
		</tr>
	);
}
