import React from 'react';
import Carousel from '../helpers/carousel'
import {Link} from 'react-router-dom'
import { Button, Grid, Card, CardActions, CardActionArea, CardMedia, CardContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

import shop from "../../images/shop.jpg"
import recreation from "../../images/recreation.jpg"
import eat from "../../images/eat.jpg"

export default function Main() {
	var items = [
		{
			name: "Shop",
			description: "Need to shop? No worries. Search for the best socially distanced shops near you.",
			img: shop
		},
		{
			name: "Recreation",
			description: "Feeling bored? Want to have fun? Search for cool entertainment recreation activities here.",
			img: recreation
		},
		{
			name: "Eat",
			description: "Getting hungry or too bored to cook? Fulfil your food desires by clicking here.",
			img: eat
		}
	]

	return (
		<Carousel>
			{
				items.map((item, i) => <Item key={i} item={item} />)
			}
		</Carousel>
	)
}

const useStyles = makeStyles({
	root: {
		marginTop: "40px",
		marginLeft: "10px",
		marginRight: "10px",
	},
	media: {
		height: 200,
	},
	link : {
		textDecoration : 'none'
	}
});

function Item(props) {
	return (
		<Grid container direction="row" justify="center">
			<Grid item xs={false} sm={4} />
			<Grid item xs={12} sm={4}>
				<MediaCard name={props.item.name} description={props.item.description} title={props.item.name} img={props.item.img} />
			</Grid>
			<Grid item xs={false} sm={4} />
		</Grid>
	)
}

function MediaCard(props) {
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={props.img}
					title={props.title}
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.name}
					</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						{props.description}
					</Typography>
				</CardContent>
			</CardActionArea>

			<CardActions>
				<Link to={"/find?category="+props.name} className={classes.link}>
					<Button size="medium" color="primary" endIcon={<SearchIcon />}>
						Find
		  			</Button>
				</Link>
			</CardActions>
		</Card>
	);
}