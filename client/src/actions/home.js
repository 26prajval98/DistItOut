import store from '../stores'

const showPage = (content)=>{
	return store.dispatch({
        type: "SHOW_PAGE",
        content
    })
}

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
    showPage,
	startLoading,
	doneLoading,
}

export default home