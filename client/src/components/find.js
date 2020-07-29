import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import { Grid, Paper, Typography, Box } from '@material-ui/core'

import qs from 'query-string'

import ListItems from './list'

import loadBingApi from './helpers/maps';

import { find } from "../actions"

import { httpGet } from "../methods/axios"

function mapStateToProps(state) {
	return { ...state.find }
}

var Microsoft, directionsManager, resp;


class Find extends Component {
	async FetchListItems() {
		try {
			var entityType

			switch (this.props.category.toLowerCase()) {
				case "shop":
					entityType = "stores"
					break;
				case "recreation":
					entityType = "recreation"
					break;
				case "eat":
					entityType = "eat"
					break;
				default:
					entityType = "stores"
					break;
			}

			resp = await httpGet('local_info', {
				lattitude: this.props.userLocation.latitude,
				longitude: this.props.userLocation.longitude,
				entityType: entityType,
			})

			resp = resp.data
			for (var i = 0; i < resp.resourceSets[0].resources.length; ++i) {
				var location = new window.Microsoft.Maps.Location(resp.resourceSets[0].resources[i].point.coordinates[0], resp.resourceSets[0].resources[i].point.coordinates[1])

				find.addPlace({
					name: resp.resourceSets[0].resources[i].name,
					location: location,
					phoneNumber: resp.resourceSets[0].resources[i].PhoneNumber,
					index: i + 1
				})

				var pin = this.CreatePins(location, {
					text: (i + 1) + ""
				})

				find.addPin(pin)
			}

			this.GetMap({
				center: this.props.userLocation
			}, this.props.pins)
		}
		catch (e) {
			find.setCategory("Error")
		}
	}

	GetMap(opts, pins = []) {
		var map = new Microsoft.Maps.Map('#showMap', opts);

		for (var i = 0; i < pins.length; i++) {
			map.entities.push(pins[i]);
		}

		if (this.props.destination) {
			Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
				//Create an instance of the directions manager.
				directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

				//Create waypoints to route between.
				var seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({ location: this.props.userLocation });
				directionsManager.addWaypoint(seattleWaypoint);

				var workWaypoint = new Microsoft.Maps.Directions.Waypoint({ location: this.props.destination });
				directionsManager.addWaypoint(workWaypoint);

				//Specify the element in which the itinerary will be rendered.
				directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

				//Calculate directions.
				directionsManager.calculateDirections();
			});
		}
	}

	CreateLocation(lat, lon) {
		return new Microsoft.Maps.Location(lat, lon)
	}

	CreatePins(location, opts) {
		return new Microsoft.Maps.Pushpin(location, opts);
	}

	GenerateLink(location1, location2) {
		return `https://bing.com/maps/default.aspx?rtp=pos.${location1.latitude}_${location1.longitude}~pos.${location2.latitude}_${location2.longitude}`
	}

	OpenLink(location1) {
		return location2 => {
			var url = this.GenerateLink(location1, location2)
			window.open(url, '_blank');
		}
	}

	componentDidMount() {
		var filters = qs.parse(this.props.location.search)
		console.log(filters)
		find.setCategory(filters.category)

		window.httpGet = httpGet

		loadBingApi()
			.then(() => {
				Microsoft = window.Microsoft

				var location = new window.Microsoft.Maps.Location(47.602038, -122.333964)

				find.setUserLocation(location)

				var pin = this.CreatePins(this.props.userLocation, {
					text: 'Me'
				})

				find.addPin(pin)

				this.FetchListItems()

				this.GetMap({
					center: this.props.userLocation
				}, this.props.pins)

			})
			.catch(e => {
				console.log(e)
			})
	}


	render() {
		if (this.props.updateMap) {
			this.GetMap({
				center: this.props.userLocation
			}, this.props.pins)

			find.resetUpdateMap()
		}
		return (
			<Grid container direction="column">
				<Grid item>
					<Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
						<Box p={1}>
							<Typography variant="h4" align="justify">Here are our top picks</Typography>
						</Box>
					</Box>
				</Grid>
				<Grid item>
					<Paper id="showMap" style={{ position: 'relative', minWidth: "100px", width: '80vw', height: '60vh', margin: 'auto', marginTop: "10px", maxHeight: "400px" }} />
				</Grid>
				<Grid item>
					<ListItems open={this.OpenLink(this.props.userLocation)} items={this.props.places} />
				</Grid>
				{this.props.redirect ? <Redirect to="Error" /> : <Fragment />}
			</Grid>
		)
	}
}

export default connect(mapStateToProps)(Find)

// https://bing.com/maps/default.aspx?rtp=pos.45.23423_-122.1232~pos.47.602038_-122.333964
