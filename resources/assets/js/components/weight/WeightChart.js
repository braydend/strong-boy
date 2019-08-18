import React, { useState, useEffect } from "react";
import {
	Card,
	Collapse,
	Spinner,
	Table,
	Button,
	Col,
	Row,
	FormText,
	FormControl
} from "react-bootstrap";
import axios from "axios";
import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";

export default function WeightChart(){
	const [ chartData, setChartData ] = useState({});
	const [ isLoading, setIsLoading ] = useState(true);

	const getChartData = () => {
		axios.get("/api/weight").then(res => {
			setChartData({data: res.data.map(weightData => ({weight: weightData.weight, date: weightData.date}))});
			setIsLoading(false);
		});
	};

	useEffect(() => {
		if(isLoading) {
			// WeightChart setup
			ReactChartkick.addAdapter(Chart);
			getChartData();
		}
	});



	return (
		<div>
			{ isLoading ? <Spinner/> : <LineChart data={chartData} /> }
		</div>
	);
}