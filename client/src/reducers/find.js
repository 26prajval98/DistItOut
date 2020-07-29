const valid = ['shop', 'recreation', 'eat']

const findReducer = (
	state = {
		category: "Shop",
		redirect: false,
		userLocation: undefined,
		pins: [],
		destination : undefined,
		updateMap : false,
		places : []
	}, action) => {

	switch (action.type) {

		case "SET_CATEGORY": {
			console.log(action.category)
			if (valid.indexOf(action.category.toLowerCase()) + 1) {
				state = { ...state, category: action.category }
			}
			else {
				state = { ...state, redirect: true }
			}
			return state
		}

		case "SET_USER_LOCATION": {
			state = { ...state, userLocation: action.userLocation }
			return state
		}

		case "ADD_PIN": {
			var pins = [...state.pins]
			pins.push(action.pin)
			state = { ...state, pins: pins, updateMap : true}
			return state
		}

		case "REMOVE_PINS": {
			state = { ...state, pins: [] }
			return state
		}

		case "ADD_PLACE": {
			var places = [...state.places]
			places.push(action.place)
			state = { ...state, places: places }
			return state
		}

		case "REMOVE_PLACES": {
			state = { ...state, places: [] }
			return state
		}

		case "SELECT_DESTINATION": {
			state = { ...state, destination: action.destination, updateMap : true}
			return state
		}

		case "RESET_UPDATE_MAP" : {
			state = { ...state, updateMap : false}
			return state
		}

		default: {
			return state
		}
	}
}

export default findReducer