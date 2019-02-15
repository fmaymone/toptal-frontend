import { combineReducers } from 'redux'
import initState from './init'
import { appReducers } from 'rmw-shell/lib/store/reducers'
import rootReducer from 'rmw-shell/lib/store/rootReducer'
import {TripListReducer} from './tripReducer'
import {UserListReducer} from './userReducer'

const appReducer = combineReducers({
  ...appReducers,
  trips: TripListReducer,
  users: UserListReducer
})

export default (state, action) => rootReducer(appReducer, initState, state, action)
