import config from '../config'
import tripService from "../services/toptal-api"

export const initState = {
  auth: { isAuthorised: false },
  ...config.initial_state
}

export default initState
