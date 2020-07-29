import store from '../stores'

const startLoading = ()=>{
	return store.dispatch({
        type: "START_LOADING",
    })
}

const doneLoading = ()=>{
	return store.dispatch({
        type: "DONE_LOADING",
    })
}

const home = {
	startLoading,
	doneLoading,
}

export default home