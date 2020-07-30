const homeReducer = (
	state = {
		content : 0
	}, action) => {

	switch (action.type) {
		case "SHOW_PAGE_COVID":{
			state = { ...state, content : Math.abs(action.content) % 3 }
			return state
		}
		default: {
			return state
		}
	}
}

export default homeReducer