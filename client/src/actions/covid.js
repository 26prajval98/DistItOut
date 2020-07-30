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

const home = {
	showPage,
	loadCovidUS
}

export default home