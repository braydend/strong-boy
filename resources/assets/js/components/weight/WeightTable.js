import React, { useState, useEffect } from 'react';
import {Card, Table} from "react-bootstrap";
import axios from 'axios';

export default function WeightTable(){
	const [ isLoading, setIsLoading ] = useState(true);
	const [ tableData, setTableData ] = useState([]);

	const getWeights = () => {
		axios.get("/api/weight").then(res => {
			setIsLoading(false);
			setTableData(res.data);
		});
	};

	useEffect(() => {
		if(isLoading){
			getWeights();
		}
	});

	return (
		<Table striped bordered hover>
			<thead>
				<tr>
					<th>Date</th>
					<th>Weight</th>
				</tr>
			</thead>
			<tbody>
				{tableData.length > 0
					? (!isLoading && tableData.map((weight) => {
						return (
							<tr key={`${weight.created_at}-${weight.weight}`}>
								<td>
									{weight.created_at ? weight.created_at : "Date not set"}
								</td>
								<td>{weight.weight}</td>
							</tr>
						);
					}))
					: (
						<tr>
							<td>No weights recorded</td>
							<td>Add one!</td>
						</tr>
					)}
			</tbody>
		</Table>
	);
}