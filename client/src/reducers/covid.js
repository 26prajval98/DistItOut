const homeReducer = (
	state = {
		content: 0,
		dataUs: {},
		dataWorld: {}
	}, action) => {

	switch (action.type) {
		case "SHOW_PAGE_COVID": {
			let dataUs = { ...state.dataUs }
			let dataWorld = { ...state.dataWorld }
			state = { ...state, content: Math.abs(action.content) % 2, dataUs, dataWorld }
			return state
		}

		case "LOAD_DATA_COVID_US": {
			let dataUs = { ...action.dataUs }
			let dataWorld = { ...state.dataWorld }
			state = { ...state, dataUs, dataWorld }
			return state
		}

		case "LOAD_DATA_COVID_WORLD": {
			let dataUs = { ...state.dataUs }
			let dataWorld = { ...action.dataWorld }
			state = { ...state, dataUs, dataWorld }
			return state
		}

		default: {
			return state
		}
	}
}

export default homeReducer