import {
    FETCH_TRIP
  } from './actions/types';


  const initialState = {

}

export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TRIP:
        return action.payload
      default:
        return state
  }
}