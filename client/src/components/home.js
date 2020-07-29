import React, { Fragment } from 'react'

import { Grid } from '@material-ui/core'

import Header from './layouts/header'
import Content from './layouts/content'

export default function Home() {
	return (
		<Fragment>
			<Grid container direction="column">
				<Grid item>
					<Header />
				</Grid>
				<Grid item>
					<Content />
				</Grid>
			</Grid>
		</Fragment>
	)
}