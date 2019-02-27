import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class DashboardStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: "Loading",
            sets: "Loading",
            currentStreak: "Loading",
            bestStreak: "Loading",
            exercise: "Loading"
        }
        this.updateStats = this.updateStats.bind(this);
    }

    updateStats(){
        axios.get(`/ajax/dashboard-stats`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    weight: res.data.weight,
                    sets: res.data.sets,
                    currentStreak: res.data.currentStreak,
                    bestStreak: res.data.bestStreak,
                    exercise: res.data.exercise
                });
            }
        );
    }

    componentDidMount() {
        this.updateStats();
    }

    render(){
        return(
            <div className="dashboard-stats">
                <div className="stat">
                    <h3>Current Weight</h3>
                    <h1>{ this.state.weight }</h1>
                </div>
                <div className="stat">
                    <h3>Sets Logged</h3>
                    <h1>{ this.state.sets }</h1>
                </div>
                <div className="stat">
                    <h3>Streak</h3>
                    <h1>{ this.state.currentStreak }</h1>
                    <small>Best: { this.state.weight }</small>
                </div>
                <div className="stat">
                    <h3>Most Logged</h3>
                    <h1>{ this.state.exercise }</h1>
                </div>
            </div>
        );
    }
}