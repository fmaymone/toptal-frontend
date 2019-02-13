import AuthService from "./auth";
import { Exception } from "handlebars";

export default class TripService extends AuthService {
    constructor(baseUrl) {
        super(baseUrl);
    }

    defaultConfig() {
        return {
            headers: {
                Authorization: this._authToken,
                Accept: "application/vnd.trips.v1+json",
                'Content-Type': 'application/json'
            }
        };
    }

    async list() {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.get("/trips", defautConfig());
            console.log("[listTrips]: " + response.data);
            return response.data;
        }
        catch(ex) {
            console.log(ex.message)
            return [];
        }
    }

    async create(trip) {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.post("/trips", {
                destination: trip.destination,
                start_date: trip.start_date,
                end_date: trip.end_date,
                comment: trip.comment
            }, defautConfig());
            console.log("[createTrip]: " + response.data);
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async update(trip) {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.put(`/trips/${trip.id}`, trip, defautConfig());
            console.log("[updateTrip]: ok");
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }

    async delete(tripId) {
        if (!this._authenticated) {
            throw new Exception("Not Authenticated");
        }
        try {
            let response = await this._client.delete(`/trips/${tripId}`, defautConfig());
            console.log("[deleteTrip]: ok");
        }
        catch(ex) {
            console.log(ex.message)
            throw ex;
        }
    }
}