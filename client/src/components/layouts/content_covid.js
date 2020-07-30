import React, { Component, Fragment } from "react";

import WorldMap from '../covid19/worldmap'
import UsMap from '../covid19/uschart'
import Nav from '../covid19/nav'
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return { ...state.covid }
}

class ContentCovid extends Component {

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
						< UsMap />
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