import { combineReducers } from 'redux'
import find from './find'
import home from './home'

export default combineReducers({
	find : find,
	home: home
})