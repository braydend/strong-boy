import React, {Component} from 'react';
import TopPanel from "../components/TopPanel";
import SidePanel from "../components/SidePanel";
import ExerciseList from "../components/ExerciseList";

export default class ExerciseLayout extends Component{
    render(){
        return(
            <div className="dashboard-layout">
                <TopPanel pageName="Dashboard" user="bar" />
                <SidePanel />
                <ExerciseList/>
            </div>
        );
    }
}