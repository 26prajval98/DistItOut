import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';

import { Grid } from '@material-ui/core'

import Header from './layouts/header'

import ContentNearBy from './layouts/content_nearby'
import ContentCovid from './layouts/content_covid'

import Footer from './layouts/footer'

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
		}, Math.random() * 1000)
	}

	render() {
		return (
			<Fragment>
				{
					this.props.loading ?
						<Loading /> :
						<Fragment>
							<Grid container direction="column">
								<Grid item>
									<Header />
								</Grid>
								<Grid item>
									{
										this.props.content ? <ContentCovid /> : <ContentNearBy />
									}
								</Grid>
							</Grid>
							<Footer showPage={home.showPage} />
						</Fragment>
				}
			</Fragment>
		)
	}
}

export default connect(mapStateToProps)(Home)