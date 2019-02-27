import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import {Row, Col} from "react-bootstrap";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: undefined
        };
        this.updateCards = this.updateCards.bind(this);
        this.updateCards()
    }

    updateCards(){
        axios.get(`/ajax/exercise`)
            .then(res => {
                const cards = res.data.map((obj, i) => <ExerciseCard exercise={obj} key={i} />);
                this.setState({
                    cards: cards
                });
            })
            .catch((error) => {
                this.setState({
                    cards:
                        <Row>
                            <p>Errors occurred on loading</p>
                        </Row>
                });
            });
    }

    render() {
        return (
            <div className="dashboard-container">
                <div className="dashboard-stats">
                    <div className="stat">
                        <h3>Current Weight</h3>
                        <h1>70KG</h1>
                    </div>
                    <div className="stat">
                        <h3>Sets Logged</h3>
                        <h1>69</h1>
                    </div>
                    <div className="stat">
                        <h3>Streak</h3>
                        <h1>2 Days</h1>
                        <small>Best: 10 Days</small>
                    </div>
                    <div className="stat">
                        <h3>Most Logged</h3>
                        <h1>Bench Press</h1>
                    </div>
                </div>
                <Row>
                    <Col>
                        {this.state.cards}
                    </Col>
                </Row>
            </div>
        );
    }
}
