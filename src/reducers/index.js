import { combineReducers } from 'redux'
import routes from './routes'
import buildingSearch from './buildingSearch'

export default combineReducers({
  routes,
  buildingSearch
  // others
})
