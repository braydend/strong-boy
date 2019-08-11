import React from "react";
import { TopPanel } from "../components/dashboard/TopPanel";
import { SidePanel } from "../components/dashboard/SidePanel";
import { Dashboard } from "../components/Dashboard";
import {List as ExerciseList} from "../components/exercise/List";
import {Graph as ExerciseGraph} from "../components/exercise/Graph";
import {BrowserRouter, Route} from "react-router-dom";

export function DashboardLayout()
{
	return(
		<BrowserRouter>
			<div className="layout">
				<TopPanel pageName="Exercises" user="bar" />
				<SidePanel />
				{/* Routes */}
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/exercise/" component={ExerciseList} />
				<Route path="/exercise/:exerciseId" component={ExerciseGraph} />
			</div>
		</BrowserRouter>
	);
}