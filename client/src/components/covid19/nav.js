import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PublicIcon from '@material-ui/icons/Public';
import NearMeIcon from '@material-ui/icons/NearMe';
import SearchIcon from '@material-ui/icons/Search';
import { covid } from '../../actions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100vw"
    },
}));

export default function ScrollableTabsButtonPrevent() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab onClick={() => { covid.showPage(0) }} icon={<PublicIcon />} aria-label="World" />
                <Tab onClick={() => { covid.showPage(1) }} icon={<NearMeIcon />} aria-label="Favorite" />
                <Tab onClick={() => { covid.showPage(2) }} icon={<SearchIcon />} aria-label="Search" />
            </Tabs>
        </Paper>
    );
}