import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';

import { Grid } from '@material-ui/core'

import Header from './layouts/header'
import Content from './layouts/content'
import Loading from './loading'

import { home } from '../actions'

function mapStateToProps(state) {
	return { ...state.home }
}

class Home extends Component {

	componentWillMount() {
		home.startLoading()
		setTimeout(() => {
			home.doneLoading()
		}, 2000)
	}

	render() {
		return (
			<Fragment>
				{
					this.props.loading ?
						<Loading /> :
						<Grid container direction="column">
							<Grid item>
								<Header />
							</Grid>
							<Grid item>
								<Content />
							</Grid>
						</Grid>
				}
			</Fragment>
		)
	}
}

export default connect(mapStateToProps)(Home)