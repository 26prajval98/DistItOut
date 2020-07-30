import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import PersonPinIcon from '@material-ui/icons/PersonPin';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';

const useStyles = makeStyles(theme => ({
	appBar: {
		top: "auto",
		bottom: 0
	}
}));

export default function BottomAppBar(props) {
	const classes = useStyles();

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<AppBar color="inherit" className={classes.appBar}>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="fullWidth"
				indicatorColor="secondary"
				textColor="secondary"
				aria-label="icon label tabs example"
			>
				<Tab onClick={()=>{props.showPage(0)}} icon={<PersonPinIcon />} label="NEARBY" />
				<Tab onClick={()=>{props.showPage(1)}} icon={<FavoriteSharpIcon />} label="COVID-19" />
			</Tabs>
		</AppBar>
	);
}