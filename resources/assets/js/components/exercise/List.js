import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, FormControl, InputGroup, Row, Spinner } from "react-bootstrap";
import { Card as ExerciseCard } from "./Card";
import $ from "jquery";

export function List() {
	const [exercises, setExercises] = useState(undefined);
	const [filteredCards, setFilteredCards] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [init, setInit] = useState(false);

	const updateCards = () => {
		setIsLoading(true);
		axios
			.get("/ajax/exercise")
			.then(res => {
				setExercises(
					res.data.map((obj, i) => <ExerciseCard exercise={obj} key={i} />)
				);
				setIsLoading(false);
			})
			.catch(error => {
				setExercises(
					<Row>
						<p>Errors occurred on loading</p>
					</Row>
				);
			});
	};

	const saveExercise = () => {
		setIsLoading(true);
		axios
			.get(`/ajax/exercise/add?name=${$("#exercise-search-adder").val()}`)
			.then(res => {
				$("#exercise-search-adder-btn")
					.removeClass("fa-plus")
					.addClass("fa-search");
				updateCards();
				$("#exercise-search-adder").val("");
				setIsLoading(false);
			});
	};

	const searchCards = () => {
		const query = $("#exercise-search-adder").val();
		const filtered = [];
		if (query !== "") {
			exercises.forEach(exercise => {
				if (
					exercise.props.exercise.name
						.toLowerCase()
						.includes(query.toLowerCase())
				) {
					filtered.push(exercise);
				}
				setFilteredCards(filtered);
			});
			if (filtered.length === 0) {
				$("#exercise-search-adder-btn")
					.removeClass("fa-search")
					.addClass("fa-plus");
			} else {
				$("#exercise-search-adder-btn")
					.removeClass("fa-plus")
					.addClass("fa-search");
			}
		} else {
			$("#exercise-search-adder-btn")
				.removeClass("fa-plus")
				.addClass("fa-search");
			setFilteredCards([]);
		}
	};

	const exerciseSearchAdder = () => {
		if ($("#exercise-search-adder-btn").hasClass("fa-plus")) {
			saveExercise();
		}
	};

	useEffect(() => {
		if (!init) {
			updateCards();
			setInit(true);
		}
	});

	return (
		<div className="exerciseList">
			<div className="quickAdder">
				<InputGroup>
					<FormControl
						id="exercise-search-adder"
						onChange={() => searchCards()}
						placeholder="Exercise name"
					/>
					<InputGroup.Append>
						<Button
							onClick={() => exerciseSearchAdder()}
							variant="outline-secondary"
							disabled={isLoading}
						>
							<i
								id="exercise-search-adder-btn"
								className="fas fa-search"
								hidden={isLoading}
							/>
							<Spinner
								animation="border"
								variant="secondary"
								as="span"
								size="sm"
								hidden={!isLoading}
							/>
							<span hidden={!isLoading}>&nbsp; Loading...</span>
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</div>
			{filteredCards.length === 0 ? exercises : filteredCards}
		</div>
	);
}
