import {HttpClient} from './httpClient' 


const API = 'https://toptal-backend-fmaymone.c9users.io'

const TRIP_API = `${API}/trips`

const createTrip = trip => {
    return HttpClient.post(TRIP_API, trip)
}

const getTrip = (id) => {
    return HttpClient.get(`${TRIP_API}/${id}`)
}

const getTrips = () => {
    return HttpClient.get(TRIP_API)
}

const updateTrip = trip => {
    return HttpClient.put(TRIP_API, trip)
}

const removeTrip = trip => {
    return HttpClient.delete(`${TRIP_API}/${trip._id}`)
}

const TripApi = {createTrip, getTrips, getTrip, updateTrip, removeTrip}

export {TripApi}