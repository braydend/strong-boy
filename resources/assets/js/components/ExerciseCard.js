import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ExerciseCardRow from './ExerciseCardRow';
import {Collapse} from 'react-collapse';
import axios from "axios";
import Button from "react-bootstrap/lib/Button";
import InputGroup from "react-bootstrap/lib/InputGroup";
import FormControl from "react-bootstrap/lib/FormControl";
import ButtonGroup from "react-bootstrap/lib/ButtonGroup";
import ToggleButton from "react-bootstrap/lib/ToggleButton";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Table from "react-bootstrap/es/Table";
import DatePicker from "react-datepicker/es";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export default class ExerciseCard extends Component {
    constructor(props){
        super(props);
        this.state = {
            sets: [],
            id: props.exercise.id,
            showAdder: false,
            collapsed: true,
            newData: {
                date: new Date(),
                weight: 20,
                reps: 5,
                config: {
                    warmup: false,
                    lb: false
                }
            }
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleQuickAddChange = this.handleQuickAddChange.bind(this);
    }

    handleQuickAddChange(event){
        switch(event.target.name){
            case "weight":
                this.setState({
                    newData: {
                        date: this.state.newData.date,
                        weight: event.target.value,
                        reps: this.state.newData.reps,
                        config: {
                            warmup: this.state.newData.config.warmup,
                            lb: this.state.newData.config.lb
                        }
                    }
                });
                break;
            case "reps":
                this.setState({
                    newData: {
                        date: this.state.newData.date,
                        weight: this.state.newData.weight,
                        reps: event.target.value,
                        config: {
                            warmup: this.state.newData.config.warmup,
                            lb: this.state.newData.config.lb
                        }
                    }
                });
                break;
        }
    }

    componentDidMount() {
        this.updateSets(this.state.id);
    }

    componentWillUnmount() {
    }

    updateSets(id){
        axios.get('ajax/exercise/' + id + '/sets')
            .then((response) => {
                console.log(response);
                this.setState({sets: []});
                this.setState({sets: response.data.map((set, i) => <ExerciseCardRow key={i} id={set.id} exercise_id={this.state.id} date={set.date} weight={set.weight} reps={set.reps} />)});
            });
    }

    addSetToCard(){
        const LB_TO_KG = 2.2046;
        let data = this.state.newData;
        data.exercise_id = this.state.id;
        data.warmup = this.state.newData.config.warmup;
        if (this.state.newData.config.lb === true){
            data.weight = this.state.newData.weight / LB_TO_KG;
        }else{
            data.weight = this.state.newData.weight;
        }
        data.date = moment(this.state.newData.date).unix();
        console.log(data);
        axios.post('ajax/set/store', data)
            .then(() => {
                    this.updateSets(this.state.id);
                }
            )
            .catch(console.log("error saving data"));

    }

    saveSetToCard(){
        //Save Data
        this.addSetToCard();
        //Hide form
        this.setState({showAdder: false});
        //Clear Data
        this.resetForm();
    }

    resetForm(){
        //Clear Data
        this.setState({newData: {
                warmup: false,
                date: undefined,
                weight: 20,
                reps: 5,
                config: {
                    warmup: false,
                    lb: false
                }
        }});
    }

    changeWeight(value){
        this.setState({newData: {
                warmup: this.state.newData.warmup,
                date: this.state.newData.date,
                reps: this.state.newData.reps,
                weight: this.state.newData.weight + value,
                config: this.state.newData.config
            }})
    }

    changeReps(value){
        this.setState({newData: {
                warmup: this.state.newData.warmup,
                date: this.state.newData.date,
                reps: this.state.newData.reps + value,
                weight: this.state.newData.weight,
                config: this.state.newData.config
            }})
    }

    changeWarmup(value){
        this.setState({newData: {
                warmup: this.state.newData.warmup,
                date: this.state.newData.date,
                reps: this.state.newData.reps,
                weight: this.state.newData.weight,
                config: {
                    warmup: value,
                    lb: this.state.newData.config.lb
                }
            }});
    }

    changeWeightFormatToLb(value){
        this.setState({newData: {
                warmup: this.state.newData.warmup,
                date: this.state.newData.date,
                reps: this.state.newData.reps,
                weight: this.state.newData.weight,
                config: {
                    warmup: this.state.newData.config.warmup,
                    lb: value
                }
            }});
    }

    toggleQuickAdder(){
        this.setState({showAdder: !this.state.showAdder});
    }

    handleDateChange(date){
        console.log(date);
        this.setState({newData: {
            warmup: this.state.newData.warmup,
                date: date,
                reps: this.state.newData.reps,
                weight: this.state.newData.weight,
                config: {
                    warmup: this.state.newData.config.warmup,
                    lb: this.state.newData.config.lb
                }
            }
        });
    }

    render() {
        return(
            <Col md={6}>
                <div className="card text-center">
                    <div className="card-header">
                        <span className="maximise_card">
                            <img src="icons/baseline_keyboard_arrow_down_black_18dp.png" onClick={() => this.setState({collapsed: !this.state.collapsed})}/>
                        </span>
                        <span className="h3"><b>{this.props.exercise.name}</b></span>
                        <span className="exercise_icons">
                            <button className="btn btn-primary" title="Add Workout" id="quckAddSet" onClick={() => this.toggleQuickAdder()}>
                                <img src="icons/baseline_add_black_18dp.png" alt="Add Workout" />
                            </button>
                            <a className="btn btn-success" title="Show Progress" id="viewExercise" href={'exercise/' + this.props.exercise.id}>
                                <img src="icons/baseline_show_chart_black_18dp.png" alt="Show Progress" />
                            </a>
                        </span>
                    </div>
                        <Row className="card-body">
                            <Collapse isOpened={this.state.showAdder}>
                                <Row>
                                    <Col>
                                        <DatePicker selected={this.state.newData.date} onChange={this.handleDateChange}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                Warmup
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant={this.state.newData.config.warmup ? "secondary" : "outline-secondary"}
                                                    type="radio"
                                                    size="sm"
                                                    onClick={() => this.changeWarmup(true)}

                                                >
                                                    Warmup
                                                </Button>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant={this.state.newData.config.warmup ? "outline-success" : "success"}
                                                    type="radio"
                                                    size="sm"
                                                    onClick={() => this.changeWarmup(false)}
                                                >
                                                    Real
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        Weight
                                        <Row>
                                            <Col>
                                                <InputGroup>
                                                    <InputGroup.Prepend>
                                                        <Button size="sm" variant="warning" onClick={() => {this.changeWeight(-5)}}>-5</Button>
                                                    </InputGroup.Prepend>
                                                   <FormControl size="sm" name="weight" value={this.state.newData.weight} onChange={this.handleQuickAddChange}/>
                                                    <InputGroup.Append>
                                                        <Button size="sm" variant="success" onClick={() => {this.changeWeight(10)}}>10</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Button
                                                    variant={this.state.newData.config.lb ? "info" : "outline-info"}
                                                    size="sm"
                                                    onClick={() => this.changeWeightFormatToLb(true)}
                                                >
                                                    LB
                                                </Button>
                                                <Button
                                                    variant={this.state.newData.config.lb ? "outline-info" : "info"}
                                                    size="sm"
                                                    onClick={() => this.changeWeightFormatToLb(false)}
                                                >
                                                    KG
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        Reps
                                        <Row>
                                            <Col>
                                                <InputGroup className="mb-1">
                                                    <InputGroup.Prepend>
                                                        <Button size="sm" variant="danger" onClick={() => {this.changeReps(-1)}}>-</Button>
                                                    </InputGroup.Prepend>
                                                        <FormControl name="reps" size="sm" value={this.state.newData.reps} onChange={this.handleQuickAddChange}/>
                                                    <InputGroup.Append>
                                                        <Button size="sm" variant="success" onClick={() => {this.changeReps(1)}}>+</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col>
                                        Save
                                        <Row>
                                            <Col>
                                                <Button variant="success" size="sm" onClick={() => this.saveSetToCard()}>
                                                    <img src="icons/baseline_check_circle_outline_white_18dp.png"/>
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => this.resetForm()}>
                                                    <img src="icons/baseline_close_white_18dp.png"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Collapse>
                        </Row>
                    <Collapse isOpened={!this.state.collapsed}>
                        <Row>
                            <Col>
                                <Table responsive>
                                    <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Weight (KG)</th>
                                        <th scope="col">Reps</th>
                                        <th scope="col"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sets}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Collapse>
                </div>
                <hr />
            </Col>
        );
    }
}


