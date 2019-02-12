import { combineReducers } from 'redux'
import initState from './init'
import { appReducers } from 'rmw-shell/lib/store/reducers'
import rootReducer from 'rmw-shell/lib/store/rootReducer'
import tripReducer from './TripReducer'

const appReducer = combineReducers({
  ...appReducers,
  tripReducer: tripReducer
})

export default (state, action) => rootReducer(appReducer, initState, state, action)
