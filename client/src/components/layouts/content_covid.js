import React, { Component, Fragment } from "react";

import { connect } from 'react-redux';

import { httpGet } from "../../methods/axios";

import { covid } from '../../actions'

import WorldMap from '../covid19/worldmap'
import UsMap from '../covid19/uschart'
import Nav from '../covid19/nav'

function mapStateToProps(state) {
	return { ...state.covid }
}

class ContentCovid extends Component {

	async componentDidMount() {
		try {
			var r = await httpGet("covid_us")
			r = r.data
			var dataUS = {}
			for (var i = 0; i < r.length; ++i)
				dataUS[r[i].name] = r[i]
			covid.loadCovidUS(dataUS)
		}
		catch (e) {
			console.log(e)
		}

	}

	ConditionalRender() {
		switch (this.props.content) {
			case 0:
				return (
					<div>
						<WorldMap />
					</div>
				)
			case 1:
				return (
					<div>
						< UsMap dataUS={this.props.dataUs} />
					</div>
				)
			case 2:
				return (
					<div>
						<WorldMap />
					</div>
				)
			default:
				break;
		}
	}

	render() {
		return (
			<Fragment>
				<Nav />
				{this.ConditionalRender()}
			</Fragment>

		)
	}
}

export default connect(mapStateToProps)(ContentCovid)