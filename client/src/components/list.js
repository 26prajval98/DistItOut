import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Grid, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: "100px",
		width: '80vw',
		marginTop: "20px",
		margin: 'auto',
		height: "30vh",
		maxHeight: "300px",
		overflow: "auto"
	},
}));

export default function ListItems(props) {
	const classes = useStyles();
	return (
		<Grid container direction="row">
			<List className={classes.root}>
				{
					props.items.map((val, key) =>
						<Button key={key} onClick={() => {
							props.open(val.location)
						}} style={{ display: 'block', width: "100%" }}>
							<ListItem alignItems="flex-start">
								<ListItemText
									primary={`${val.index}. ${val.name}`}
									secondary={
										<Typography
											component="span"
											variant="caption"
											className={classes.inline}
											color="textPrimary">
											
											{`Distance : ${props.dis(val.location).toFixed(2)}kms`}
											<br />
											{`Average density : 5 humans/sq meters`}
											<br />
											{`Phone : ${val.phoneNumber}`}
										</Typography>
									} />
							</ListItem>
						</Button>
					)
				}
			</List>
		</Grid>
	);
}
