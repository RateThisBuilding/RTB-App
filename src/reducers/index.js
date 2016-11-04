import { combineReducers } from 'redux'
import routes from './routes'
import buildingSearch from './buildingSearch'
import users from './users'
import ui from './ui'
import buildings from './buildings'
import reviews from './reviews'

export default combineReducers({
  routes,
  buildingSearch,
  users,
  ui,
  buildings,
  reviews
  // others
})
