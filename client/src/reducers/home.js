const homeReducer = (
	state = {
		loading: false,
		content : 0
	}, action) => {

	switch (action.type) {
		case "SHOW_PAGE":{
			state = { ...state, content : Math.abs(action.content) % 2 }
			return state
		}
		
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