import {
  FETCH_TRIP
} from './types'
import axios from 'axios'

export const fetchTrip = (tripId) => {

  return dispatch => {
    axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NDk5NzYyMDR9.nFjiVC4vcHyimZ8wauW1VraoXRydIz7rYIoFXHp7c_A'
    axios.defaults.headers.common['Accept'] = 'application/vnd.trips.v1+json'
    axios.get(`https://toptal-backend-fmaymone.c9users.io/trips/${tripId}`) 
      .then(res => {
        return res.data       
      })
  }
}
