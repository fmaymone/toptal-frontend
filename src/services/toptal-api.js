import TripService from './trip'
import config from '../config'

let tripService = new TripService(config.baseURL);

tripService.login('mouse@test.com', 'password').then(res => {
    console.log(`Token: ${res}`);
    tripService.list().then(trips => {
        console.log(trips);
    }).catch(error => {
        console.log(error);
    });
});

export default tripService;
