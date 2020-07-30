import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import FavoriteSharpIcon from '@material-ui/icons/FavoriteSharp';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: "100vw",
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
		<Tab icon={<PersonPinIcon />} label="NEARBY" />
        <Tab icon={<FavoriteSharpIcon />} label="COVID-19" />
      </Tabs>
    </Paper>
  );
}