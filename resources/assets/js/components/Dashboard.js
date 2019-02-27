import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import ExerciseCard from "./ExerciseCard";
import {Row, Col} from "react-bootstrap";
import DashboardStats from "./DashboardStats";

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: undefined
        };
        this.updateCards = this.updateCards.bind(this);
        this.updateCards();
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
                <DashboardStats/>
                <Row>
                    <Col>
                        {this.state.cards}
                    </Col>
                </Row>
            </div>
        );
    }
}
