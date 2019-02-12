import {
  FETCH_TRIP
} from './types';

export const fetchTrip = (trip) => {
    return  {
        type: FETCH_TRIP,
        payload: {destination: 'Test Reducer'}
    }
}
