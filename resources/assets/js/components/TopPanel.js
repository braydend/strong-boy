import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Col, Row} from "react-bootstrap";

export default class TopPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            context: this.props.pageName,
            user: this.props.user
        };
    }

    render() {
        return (
            <div className="dashboard-top-panel">
                <Row>
                    <Col md={12} lg={4}>
                        <div className="brand">
                            Strongr
                        </div>
                    </Col>
                    <Col md={12} lg={4}>
                        <div className="context">
                            {this.state.context}
                        </div>
                    </Col>
                    <Col md={12} lg={4}>
                        <div className="auth">
                            <span className="icon">
                                icon
                            </span>
                            {this.state.user}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}