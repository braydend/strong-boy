import React, { Component } from "react";
import axios from "axios";
import {
	Button, FormControl, InputGroup, Row, Spinner,
} from "react-bootstrap";
import ExerciseCard from "./ExerciseCard";

export default class ExerciseList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			exercises: undefined,
			filteredCards: [],
			loading: false,
		};
		this.saveExercise = this.saveExercise.bind(this);
		this.updateCards = this.updateCards.bind(this);
		this.searchCards = this.searchCards.bind(this);
		this.exerciseSearchAdder = this.exerciseSearchAdder.bind(this);
	}

	componentDidMount() {
		this.updateCards();
	}

	// Updates the list of exercise cards in the state of Component
	updateCards() {
		this.setState({ loading: true });
		axios.get("/ajax/exercise")
			.then((res) => {
				const exerciseCard = res.data.map((obj, i) => <ExerciseCard exercise={obj} key={i} />);
				this.setState({
					exercises: exerciseCard,
					loading: false,
				});
			})
			.catch((error) => {
				this.setState({
					exercises:
  <Row>
  	<p>Errors occurred on loading</p>
  </Row>,
				});
			});
	}

	// Adds new exercise via AJAX. Clears search bar and resets icon.
	saveExercise() {
		this.setState({ loading: true });
		axios.get(`/ajax/exercise/add?name=${$("#exercise-search-adder").val()}`)
			.then((res) => {
				$("#exercise-search-adder-btn").removeClass("fa-plus").addClass("fa-search");
				this.updateCards();
				$("#exercise-search-adder").val("");
				this.toggleExerciseAdder();
				this.setState({ loading: false });
			});
	}

	// Updates cards being displayed from query in the search bar
	searchCards() {
		const cards = this.state.exercises;
		const query = $("#exercise-search-adder").val();
		const filtered = [];
		if (query !== "") {
			cards.forEach((exercise) => {
				if (exercise.props.exercise.name.toLowerCase().includes(query.toLowerCase())) {
					filtered.push(exercise);
				}
				this.setState({
					filteredCards: filtered,
				});
			});
			if (filtered.length === 0) {
				$("#exercise-search-adder-btn").removeClass("fa-search").addClass("fa-plus");
			} else {
				$("#exercise-search-adder-btn").removeClass("fa-plus").addClass("fa-search");
			}
		} else {
			$("#exercise-search-adder-btn").removeClass("fa-plus").addClass("fa-search");
			this.setState({
				filteredCards: [],
			});
		}
	}

	// Process click of button, allows saving if addition icon
	exerciseSearchAdder() {
		if ($("#exercise-search-adder-btn").hasClass("fa-plus")) {
			this.saveExercise();
		}
	}

	render() {
		return (
			<div className="exerciseList">
				<div className="quickAdder">
					<InputGroup>
						<FormControl id="exercise-search-adder" onChange={this.searchCards} placeholder="Exercise name" />
						<InputGroup.Append>
							<Button onClick={this.exerciseSearchAdder} variant="outline-secondary" disabled={this.state.loading}>
								<i id="exercise-search-adder-btn" className="fas fa-search" hidden={this.state.loading} />
								<Spinner animation="border" variant="secondary" as="span" size="sm" hidden={!this.state.loading} />
								<span hidden={!this.state.loading}>&nbsp; Loading...</span>
							</Button>
						</InputGroup.Append>
					</InputGroup>
				</div>
				{ this.state.filteredCards.length === 0 ? this.state.exercises : this.state.filteredCards }
			</div>
		);
	}
}
