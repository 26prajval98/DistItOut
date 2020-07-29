import React, { Component } from 'react';
import './App.css';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Store from './stores';
import { Provider } from "react-redux";

import { PageNotFound, Home, Find } from './components'

class App extends Component {
	render() {
		return (
			<Provider store={Store}>
				<div>
					<Router>
						<div>
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/find" component={Find} />
								<Route component={PageNotFound} />
							</Switch>
						</div>
					</Router>
				</div>
			</Provider>
		);
	}
}

export default App;
