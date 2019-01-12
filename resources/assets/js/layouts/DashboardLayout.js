import React, {Component} from 'react';
import ExerciseCard from '../components/ExerciseCard';
import axios from 'axios';
import ReactLoading from 'react-loading';
import {Col, Row} from "react-bootstrap";
import TopPanel from "../components/TopPanel";
import SidePanel from "../components/SidePanel";
import Dashboard from "../components/Dashboard";

export default class DashboardLayout extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: undefined,
            loading: true,
            exercises: {}
        };
        this.dashboard = this.dashboard.bind(this);
    }

    updateDashboard(){

    }

    dashboard(){
        this.setState({
            content: <Dashboard/>
        });
    }

    componentDidMount() {
        this.dashboard()
    }

    render(){
        return(
            <div className="dashboard-layout">
                <TopPanel pageName="Dashboard" user="bar" />
                <SidePanel />
                {this.state.content}
            </div>
        );
    }
}