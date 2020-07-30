import store from '../stores'

const showPage = (content)=>{
	return store.dispatch({
        type: "SHOW_PAGE_COVID",
        content
    })
}

const home = {
    showPage,
}

export default home