import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from "moment";
import Button from "react-bootstrap/es/Button";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import InputGroup from "react-bootstrap/lib/InputGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import {Collapse} from "react-collapse";
import axios from "axios";

export default class ExerciseCardRow extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.id,
            exercise_id: props.exercise_id,
            date: props.date,
            weight: props.weight,
            reps: props.reps,
            warmup: false,
            lb: false,
            edit: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        //check if set is editable
        if(this.state.date === moment(new Date()).format("MMM DD[,] YYYY")){
            this.setState({edittable: true});
        }else{
            this.setState({edittable: false})
        }
    }

    toggleEdit(){
        this.setState({edit: !this.state.edit});
    }

    updateSet(){
        console.log(this.state);
        const data = {
            weight: this.state.weight,
            reps: this.state.reps,
            warmup: this.state.warmup,
            weightFormat: this.state.lb ? "lb" : "kg"
        };
        axios.post('ajax/set/' + this.state.id + '/update', data)
            .catch(
                console.log("error updating set")
            );
        this.toggleEdit();
    }

    editButtons(){
        return(
            <span>
            <Button variant="success" size="sm" onClick={() => this.updateSet()}>
                <img src="icons/baseline_check_circle_outline_white_18dp.png"/>
            </Button>
            <Button variant="danger" size="sm" onClick={() => this.toggleEdit()}>
                <img src="icons/baseline_close_white_18dp.png"/>
            </Button>
            </span>
        );
    }

    changeWeightFormatToLb(value){  this.setState({lb: value}); }

    changeWarmup(value){  this.setState({warmup: value}); }

    weightFormatButtons(){
        return(
            <span>
            <Button
                variant={this.state.lb ? "info" : "outline-info"}
                size="sm"
                onClick={() => this.changeWeightFormatToLb(true)}
            >
                LB
            </Button>
            <Button
                variant={this.state.lb ? "outline-info" : "info"}
                size="sm"
                onClick={() => this.changeWeightFormatToLb(false)}
            >
                KG
            </Button>
            </span>
        );
    }

    warmupButtons(){
        return(
            <span>
                <Button
                    variant={this.state.warmup ? "secondary" : "outline-secondary"}
                    type="radio"
                    size="sm"
                    onClick={() => this.changeWarmup(true)}

                >
                    Warmup
                </Button>
                <Button
                    variant={this.state.warmup ? "outline-success" : "success"}
                    type="radio"
                    size="sm"
                    onClick={() => this.changeWarmup(false)}
                >
                    Real
                </Button>
            </span>
        );
    }
    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return(
            <tr>
                <td>{!this.state.edit ? this.state.date : <InputGroup><FormControl disabled={true} defaultValue={ this.state.date }/></InputGroup>}</td>
                <td>{!this.state.edit ? this.state.weight : <InputGroup><FormControl name="weight" defaultValue={ this.state.weight } onChange={this.handleChange}/></InputGroup>}</td>
                <td>{!this.state.edit ? this.state.reps : <InputGroup><FormControl name="reps" defaultValue={ this.state.reps } onChange={this.handleChange}/></InputGroup>}</td>
                <td hidden={!this.state.edittable}>{ !this.state.edit ? <Button variant="warning" onClick={() => this.toggleEdit()}>Edit</Button> : this.editButtons()}</td>
            </tr>
        )
    }
}
