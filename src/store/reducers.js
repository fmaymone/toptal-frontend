import { combineReducers } from 'redux'
import initState from './init'
import { appReducers } from 'rmw-shell/lib/store/reducers'
import rootReducer from 'rmw-shell/lib/store/rootReducer'
import {TripListReducer} from './tripReducer'

const appReducer = combineReducers({
  ...appReducers,
  trips: TripListReducer
})

export default (state, action) => rootReducer(appReducer, initState, state, action)
