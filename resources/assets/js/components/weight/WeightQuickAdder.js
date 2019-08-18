import React, { useState } from 'react';
import axios from 'axios';
import {Button} from "react-bootstrap";

export default function WeightQuickAdder(){
	const [ weight, setWeight ] = useState(0);

	const saveWeight = (weight) => {
		axios.post('api/weight', {weight: weight});
	};

	return (
		<div className={'weight-quickadder'}>
			<input className={'weight-input'} onChange={e => setWeight(e.target.value)} />
			<button className={'btn btn-primary'} onClick={() => saveWeight(weight)}>
				<i className={"fa fa-plus"} />
			</button>
		</div>
	);
}