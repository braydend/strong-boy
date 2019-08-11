import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TopPanel from "../components/TopPanel";
import SidePanel from "../components/SidePanel";
import { List as ExerciseList } from "../components/exercise/List";
import { Graph as ExerciseGraph } from "../components/exercise/Graph";

export default class ExerciseLayout extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="layout">
					<TopPanel pageName="Exercises" user="bar" />
					<SidePanel />
					<Route exact path="/exercise/" component={ExerciseList} />
					<Route path="/exercise/:exerciseId" component={ExerciseGraph} />
				</div>
			</BrowserRouter>
		);
	}
}
