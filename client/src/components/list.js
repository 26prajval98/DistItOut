import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: "100px",
		width: '80vw',
		marginTop: "20px",
		margin: 'auto',
		height: "30vh",
		maxHeight: "30vh",
		overflow : "auto"
	},
}));

export default function ListItems(props) {
	const classes = useStyles();
	return (
		<Grid container direction="row">
			<List className={classes.root}>
				{
					props.items.map((val, key) =>
						<Button  key={key} onClick={()=>{
							props.open(val.location)
						}} style={{ display: 'block', width: "100%" }}>
							<ListItem>
								<ListItemText primary={val.index + ". " + val.name} secondary={val.phoneNumber} />
							</ListItem>
						</Button>
					)
				}
			</List>
		</Grid>
	);
}
