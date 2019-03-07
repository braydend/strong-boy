import React, { Component } from 'react';
import axios from "axios";
import {Row} from "react-bootstrap";

export default class ExerciseList extends Component {
    constructor(props){
        super(props);
        this.state = {
            exercises: undefined,
        };
        this.getExercises = this.getExercises.bind(this);
    }

    componentDidMount() {
        this.getExercises();
    }

    getExercises(){
        axios.get(`/ajax/exercise`)
            .then(res => {
                const exercises = res.data.map(
                    (obj, i) =>
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

    render() {
        return (
            <div className="exerciselist-container">
                <h2>Exercises</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Exercise</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.exercises}
                    </tbody>
                </table>
            </div>
        );
    }
}

