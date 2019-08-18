import React, { useState } from "react";
import WeightChart from "../components/weight/WeightChart";
import {Button, Card, Collapse} from "react-bootstrap";
import WeightTable from "../components/weight/WeightTable";
import WeightQuickAdder from "../components/weight/WeightQuickAdder";

export default function WeightLayout() {
	const [ isAdderOpen, setIsAdderOpen ] = useState(false);

	return (
		<div className={"weight-layout"}>
			<Card>
				<Card.Body>
					<WeightChart />
				</Card.Body>
				<Card.Footer>
					<Collapse in={isAdderOpen}>
	                    <WeightQuickAdder />
					</Collapse>
					<WeightTable/>
				</Card.Footer>
			</Card>
		</div>
	);
}
