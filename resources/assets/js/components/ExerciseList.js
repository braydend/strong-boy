import React, { Component } from 'react';
import axios from "axios";
import {Button, FormControl, InputGroup, Row, Table} from "react-bootstrap";
import {Collapse} from 'react-collapse';

export default class ExerciseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            exercises: undefined,
            showAdder: false,
        };
        this.getExercises = this.getExercises.bind(this);
        this.toggleExerciseAdder = this.toggleExerciseAdder.bind(this);
        this.saveExercise = this.saveExercise.bind(this);
    }

    componentDidMount() {
        this.getExercises();
    }

    getExercises(){
        axios.get(`/ajax/exercise`)
            .then(res => {
                const exercises = res.data.map((obj, i) =>
                        <tr key={i}>
                            <td>{obj.name}</td>
                            <td><a href={"/exercise/" + obj.id}>View</a></td>
                        </tr>);
                this.setState({
                    exercises: exercises,
                });
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    cards:
                        <Row>
                            <p>Errors occurred on loading. See console.</p>
                        </Row>
                });
            });
    }

    toggleExerciseAdder(){
        this.setState({showAdder: !this.state.showAdder});
    }

    saveExercise(){
        axios.get(`/ajax/exercise/add?name=` + $("#exerciseName").val())
            .then(res => {
                this.getExercises();
                $("#exerciseName").val("");
                this.toggleExerciseAdder();
            }
        );
    }

    render() {
        return (
            <div className="exerciselist-container">
                <h2>Exercises</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.exercises}
                    </tbody>
                </Table>
                <span id="add-exercise" onClick={this.toggleExerciseAdder}>Add Exercise <i className="fas fa-plus-circle"></i></span>
                <Collapse isOpened={this.state.showAdder}>
                    <div className="exercise-adder">
                        <InputGroup className="mb-2">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="exercise-name-field">Exercise Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                id="exerciseName"
                                placeholder="Exercise Name"
                                aria-label="Exercise Name"
                                aria-describedby="exercise-name-field"
                            />
                            <InputGroup.Append>
                                <Button variant="success" onClick={this.saveExercise}>Add Exercise</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                </Collapse>
            </div>
        );
    }
}

