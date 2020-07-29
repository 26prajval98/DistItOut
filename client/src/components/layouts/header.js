import React from 'react'
import { AppBar, Typography, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	toolbar: {
		minHeight: "35px",
		maxHeight: "100px",
		alignItems: 'flex-start',
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		fontStyle : 'oblique',
		alignItems : 'flex-end',
	},
}));


export default function () {

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.root} color="primary">
				<Toolbar>
					<Typography variant="h4" className={classes.title}>
						DistItOut
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}
