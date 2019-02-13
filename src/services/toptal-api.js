import TripService from './trip'
import config from '../config'

let tripService = TripService.create(config.baseURL);

export default tripService;
