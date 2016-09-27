import { combineReducers } from 'redux'
import routes from './routes'
import buildingList from './buildingList'

export default combineReducers({
  routes,
  buildingList
  // others
})
