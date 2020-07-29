import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'

import { connect } from 'react-redux';

import { Grid, Paper, Typography, Box } from '@material-ui/core'

import qs from 'query-string'

import ListItems from './list'

import Loading from './loading'

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
			for (var i = 0; i < resp.length; ++i) {
				var location = new window.Microsoft.Maps.Location(resp[i].latitude, resp[i].longitude)

				find.addPlace({
					name: resp[i].name,
					location: location,
					numPeople: resp[i].numPeople,
					phoneNumber: resp[i].phoneNumber,
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
		var initial = window.location.href.split(":")[0]
		return `${initial}://bing.com/maps/default.aspx?rtp=pos.${location1.latitude}_${location1.longitude}~pos.${location2.latitude}_${location2.longitude}`
	}

	OpenLink(location1) {
		return location2 => {
			var url = this.GenerateLink(location1, location2)
			window.open(url, '_blank');
		}
	}

	Distance(location1) {
		return location2 => {
			var lat1 = location1.latitude
			var lat2 = location2.latitude
			var lon1 = location1.longitude
			var lon2 = location2.longitude
			var p = 0.017453292519943295;
			var c = Math.cos;
			var a = 0.5 - c((lat2 - lat1) * p) / 2 +
				c(lat1 * p) * c(lat2 * p) *
				(1 - c((lon2 - lon1) * p)) / 2;
			return 12742 * Math.asin(Math.sqrt(a));
		}
	}

	componentDidMount() {
		var filters = qs.parse(this.props.location.search)
		
		find.startLoading()

		find.setCategory(filters.category)

		window.httpGet = httpGet

		loadBingApi(find.doneLoading)
			.then(() => {
				Microsoft = window.Microsoft

				var location = new window.Microsoft.Maps.Location(window.userLocation.latitude, window.userLocation.longitude)

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

	componentWillUnmount() {
		find.removePins()
		find.removePlaces()
	}

	render() {
		if (this.props.updateMap) {
			this.GetMap({
				center: this.props.userLocation
			}, this.props.pins)

			find.resetUpdateMap()
		}
		return (
			<div>
				{
					this.props.loading ?
						<Loading /> :
						< Grid container direction="column" >
							<Grid item>
								<Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
									<Box p={1}>
										<Typography variant="h5" align="justify">Here are our top picks</Typography>
									</Box>
								</Box>
							</Grid>
							<Grid item>
								<Paper id="showMap" style={{ position: 'relative', minWidth: "100px", width: '80vw', height: '50vh', margin: 'auto', marginTop: "10px", maxHeight: "400px" }} />
							</Grid>
							<Grid item>
								<ListItems dis={this.Distance(this.props.userLocation)} open={this.OpenLink(this.props.userLocation)} items={this.props.places} />
							</Grid>
							{this.props.redirect ? <Redirect to="Error" /> : <Fragment />}
						</Grid >
				}
			</div>
		)
	}
}

export default connect(mapStateToProps)(Find)

// https://bing.com/maps/default.aspx?rtp=pos.45.23423_-122.1232~pos.47.602038_-122.333964
