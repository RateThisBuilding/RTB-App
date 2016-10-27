import { combineReducers } from 'redux'
import routes from './routes'
import buildingSearch from './buildingSearch'
import users from './users'
import ui from './ui'

export default combineReducers({
  routes,
  buildingSearch,
  users,
  ui
  // others
})
