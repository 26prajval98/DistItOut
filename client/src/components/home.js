import React, { Component, Fragment } from 'react'

import { connect } from 'react-redux';

import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

import Header from './layouts/header'
import Content from './layouts/content'
import Footer from './layouts/footer'

import Loading from './loading'

import { home } from '../actions'

function mapStateToProps(state) {
	return { ...state.home }
}

const useStyles = makeStyles({
	root: {
		display: "flex",
		maxWidth: "100vw",
		height: "100vh"
	},
	footer: {
		display: "flex",
		flex: "1 0 auto",
		alignItems : "flex-end"
	}
});

function PageHome() {
	var classes = useStyles();

	return (
		<Grid container direction="column" className={classes.root}>
			<Grid item>
				<Header />
			</Grid>
			<Grid item>
				<Content />
			</Grid>
			<Grid item direction="column" className={classes.footer}>
				<Footer />
			</Grid>
		</Grid>
	)
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
						<PageHome />
				}
			</Fragment>
		)
	}
}

export default connect(mapStateToProps)(Home)