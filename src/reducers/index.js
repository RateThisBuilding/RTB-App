import { combineReducers } from 'redux'
import routes from './routes'
import buildingSearch from './buildingSearch'
import users from './users'

export default combineReducers({
  routes,
  buildingSearch,
  users
  // others
})
