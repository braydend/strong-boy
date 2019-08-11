import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import {
	Button, ButtonGroup, FormControl, InputGroup, Spinner,
} from "react-bootstrap";
import {DEFAULT_SET_REPS, DEFAULT_SET_WEIGHT, KG_PER_LB} from "../../const";

export function QuickAdder({exercise_id, updater, toggle})
{
	const [ exerciseId, setExerciseId ] = useState(exercise_id);
	const [ date, setDate ] = useState(new Date());
	const [ weight, setWeight ] = useState(DEFAULT_SET_WEIGHT);
	const [ reps, setReps ] = useState(DEFAULT_SET_REPS);
	const [ isWarmup, setIsWarmup ] = useState(false);
	const [ isLb, setIsLb ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);

	const resetForm = () => {
		setIsWarmup(false);
		setDate(new Date());
		setWeight(DEFAULT_SET_WEIGHT);
		setReps(DEFAULT_SET_REPS);
		setIsLb(false);
	};

	const saveSet = () => {
		setIsLoading(true);
		const data = {
			exercise_id: exerciseId,
			warmup: isWarmup,
			weight: isLb ? weight / KG_PER_LB : weight,
			reps: reps,
			date: moment(date).unix(),
		};
		axios.post("/ajax/set/store", data)
			.then(() => {
				updater(exerciseId);
				toggle();
				resetForm();
				setIsLoading(false);
			})
			.catch(console.log("error saving data to database"));
	};

	return (
		<div className="quickadder-container">
			<div className="date">
				<DatePicker selected={date} onChange={date => setDate(date)} />
			</div>
			<div className="set-data">
				<div className="weight">
					<span>Weight</span>
					<InputGroup>
						<InputGroup.Prepend>
							<Button size="sm" variant="warning" onClick={() => { setWeight(weight - 5); }}>-5</Button>
						</InputGroup.Prepend>
						<FormControl size="sm" className="number-field" name="weight" value={weight} onChange={e => setWeight(e.target.value)} />
						<InputGroup.Append>
							<Button size="sm" variant="success" onClick={() => { setWeight(weight + 10); }}>10</Button>
						</InputGroup.Append>
					</InputGroup>
					<ButtonGroup className="adder-buttons">
						<Button
							variant={isLb ? "info" : "outline-info"}
							size="sm"
							onClick={() => setIsLb(true)}
						>
							LB
						</Button>
						<Button
							variant={isLb ? "outline-info" : "info"}
							size="sm"
							onClick={() => setIsLb(false)}
						>
							KG
						</Button>
					</ButtonGroup>
				</div>
				<div className="reps">
					<span>Reps</span>
					<InputGroup>
						<InputGroup.Prepend>
							<Button size="sm" variant="danger" onClick={() => { setReps(reps - 1); }}>-</Button>
						</InputGroup.Prepend>
						<FormControl name="reps" size="sm" className="number-field" value={reps} onChange={e => setReps(e.target.value)} />
						<InputGroup.Append>
							<Button size="sm" variant="success" onClick={() => { setReps(reps + 1); }}>+</Button>
						</InputGroup.Append>
					</InputGroup>
					<ButtonGroup className="adder-buttons">
						<Button
							variant={isWarmup ? "secondary" : "outline-secondary"}
							type="radio"
							size="sm"
							onClick={() => setIsWarmup(true)}
						>
							Warmup
						</Button>
						<Button
							variant={isWarmup ? "outline-success" : "success"}
							type="radio"
							size="sm"
							onClick={() => setIsWarmup(false)}
						>
							Real
						</Button>
					</ButtonGroup>
				</div>
			</div>
			<div className="save">
				<ButtonGroup>
					<Button className="save-button" variant="success" size="sm" onClick={() => saveSet()}>
						<i className="fa fa-check fa-3x" />
					</Button>
					<Button className="save-button" variant="danger" size="sm" onClick={() => resetForm()}>
						<i className="fa fa-times fa-3x" />
					</Button>
				</ButtonGroup>
			</div>
			<div className="loader" hidden={!isLoading}>
				<Spinner animation="border" variant="secondary" />
			</div>
		</div>
	);
}