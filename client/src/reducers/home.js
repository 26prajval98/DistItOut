const homeReducer = (
	state = {
		loading: false,
	}, action) => {

	switch (action.type) {
		case "START_LOADING": {
			state = { ...state, loading: true }
			return state
		}

		case "DONE_LOADING": {
			state = { ...state, loading: false }
			return state
		}

		default: {
			return state
		}
	}
}

export default homeReducer