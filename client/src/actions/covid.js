import store from '../stores'

const showPage = (content)=>{
	return store.dispatch({
        type: "SHOW_PAGE_COVID",
        content
    })
}

const loadCovidUS = (dataUs)=>{
	return store.dispatch({
        type: "LOAD_DATA_COVID_US",
        dataUs
    })
}

const loadCovidWorld = (dataWorld)=>{
	return store.dispatch({
        type: "LOAD_DATA_COVID_WORLD",
        dataWorld
    })
}

const home = {
	showPage,
	loadCovidUS,
	loadCovidWorld
}

export default home