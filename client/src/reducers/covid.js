const homeReducer = (
	state = {
		content: 0,
		dataUs: {},
	}, action) => {

	switch (action.type) {
		case "SHOW_PAGE_COVID": {
			state = { ...state, content: Math.abs(action.content) % 2 }
			return state
		}

		case "LOAD_DATA_COVID_US": {
			state = { ...state, dataUs: action.dataUs }
			return state
		}

		default: {
			return state
		}
	}
}

export default homeReducer