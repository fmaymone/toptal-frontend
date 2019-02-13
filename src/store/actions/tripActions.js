//Import the Trip API 

import { TripApi } from "../../api/tripApi"



//Create
export const CREATE_TRIP = '[Trip] CREATE_TRIP' 
export const CREATE_TRIP_SUCCESS = '[Trip] CREATE_TRIP_SUCCESS' 
export const CREATE_TRIP_ERROR = '[Trip] CREATE_TRIP_ERROR' 


//Read
export const GET_TRIPS = '[Trip] GET_TRIPS' 
export const GET_TRIPS_SUCCESS = '[Trip] GET_TRIPS_SUCCESS' 
export const GET_TRIPS_ERROR = '[Trip] GET_TRIPS_ERROR' 

export const GET_TRIP = '[Trip] GET_TRIP' 
export const GET_TRIP_SUCCESS = '[Trip] GET_TRIP_SUCCESS' 
export const GET_TRIP_ERROR = '[Trip] GET_TRIP_ERROR' 


//Update
export const START_EDITING ='[Trip] START_EDITING'
export const CANCEL_EDITING = '[Trip] CANCEL_EDITING'

export const UPDATE_TRIP = '[Trip] UPDATE_TRIP' 
export const UPDATE_TRIP_SUCCESS = '[Trip] UPDATE_TRIP_SUCCESS' 
export const UPDATE_TRIP_ERROR = '[Trip] UPDATE_TRIP_ERROR' 

export const COMPLETE_TRIP = 'COMPLETE_TRIP'


//Delete
export const DELETE_TRIP = '[Trip] DELETE_TRIP' 
export const DELETE_TRIP_SUCCESS = '[Trip] DELETE_TRIP_SUCCESS' 
export const DELETE_TRIP_ERROR = '[Trip] DELETE_TRIP_ERROR' 



 
//These are the action types Also ordered in CRUD Order.

//Create

//The dispatch and getstate function is provided by the Redux-Thunk middleware, we can dispatch actions with it.

export function CreateTrip(trip){
    return (dispatch, getState) => {
        return TripApi.createTrip(trip).then(res => {
            dispatch(CreateTripSuccess(res.data.data))
        })
    }
}

export function CreateTripSuccess(trip){
    return {
        type:CREATE_TRIP_SUCCESS,
        trip
    }
}

export function GetTrip(id){
    return (dispatch, getState) => {
        return TripApi.getTrip(id).then(res => {
            dispatch(GetTripSuccess(res))
        })
    }
}

export function GetTripSuccess(trip){
    return {
        type:GET_TRIP_SUCCESS,
        trip
    }
}

export function GetTrips(){
    return (dispatch, getState) => {
        return TripApi.getTrips().then(res => {
            dispatch(GetTripsSuccess(res))
        })
    }
}

export function GetTripsSuccess(trips){
    return {
        type:GET_TRIPS_SUCCESS,
        trips
    }
}


//Update
export function StartEditing(_id) {
    return {
        type: START_EDITING,
        _id
    }
}
export function CancelEditing(_id) {
    return {
        type: CANCEL_EDITING,
        _id
    }
}

export function UpdateTrip(trip) {
    // return (dispatch, getState) => {
        
    

    //     dispatch({
    //         type: UPDATE_TRIP,
    //         trip
    //     })
    //     TripApi.updateTrip(trip).then(res => {
    //         dispatch(UpdateTripSuccess(res.data.data))
    //     })
    // }
    TripApi.updateTrip(trip)
}
export function UpdateTripSuccess(trip) {
    return {
        type: UPDATE_TRIP_SUCCESS,
        trip,
        _id: trip._id
    }
}


//Delete
export function DeleteTrip(trip) {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_TRIP,
            trip
        })
        TripApi.removeTrip(trip).then(res => {
            if (res.status == 204) {
                dispatch(DeleteTripSuccess(trip))
            }
        })
    }
}
export function DeleteTripSuccess(trip) {
    return {
        type: DELETE_TRIP_SUCCESS,
        trip,
        _id: trip._id
    }
}