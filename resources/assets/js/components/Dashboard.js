import React, {Component} from 'react';
import ExerciseCard from './ExerciseCard';
import axios from 'axios';

export default class Dashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
          exercises: {}
        };
        this.updateDashboard();
    }

    updateDashboard(){
        console.log("update dashboard");
        axios.get(`/ajax/exercise`)
            .then(res => {
                console.log(res.data);
                const cards = res.data.map((obj, i) => <ExerciseCard exercise={obj} key={i} updater={this.updateDashboard}/>);
                console.log(cards);
                this.setState({ cards: cards });
            });
    }

    componentDidMount() {
        this.updateDashboard();
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md">
                        <div id="modalDiv">
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md text-center">
                        <h2 className="display-2">Recent Workouts</h2>
                    </div>
                </div>
                <div className="row">
                    {this.state.cards}
                </div>
            </div>
        );
    }
}