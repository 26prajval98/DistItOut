import store from '../stores'

const setCategory = (category)=>{
    return store.dispatch({
        type: "SET_CATEGORY",
        category
    })
}

const setUserLocation = (userLocation)=>{
	return store.dispatch({
        type: "SET_USER_LOCATION",
        userLocation
    })
} 

const addPin = (pin)=>{
	return store.dispatch({
        type: "ADD_PIN",
        pin
    })
}

const removePins = ()=>{
	return store.dispatch({
		type: "REMOVE_PINS"
	})
}

const addPlace = (place)=>{
	return store.dispatch({
        type: "ADD_PLACE",
        place
    })
}

const removePlaces = ()=>{
	return store.dispatch({
		type: "REMOVE_PLACES"
	})
}

const selectDestination = (destination)=>{
	return store.dispatch({
        type: "SELECT_DESTINATION",
        destination
    })
}

const resetUpdateMap = ()=>{
	return store.dispatch({
        type: "RESET_UPDATE_MAP",
    })
}

const find = {
	setCategory,
	setUserLocation,
	addPin,
	removePins,
	addPlace,
	removePlaces,
	selectDestination,
	resetUpdateMap
}

export default find