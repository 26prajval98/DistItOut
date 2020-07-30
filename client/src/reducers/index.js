import { combineReducers } from 'redux'
import find from './find'
import home from './home'
import covid from './covid'

export default combineReducers({
	find : find,
	home: home,
	covid : covid
})