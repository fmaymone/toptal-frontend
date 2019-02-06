import React from 'react'
import Loadable from 'react-loadable'
import getMenuItems from './menuItems'
import LoadingComponent from 'rmw-shell/lib/components/LoadingComponent'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'

const Loading = () => <LoadingComponent />

const LPAsync = Loadable({
  loader: () => import('../../src/pages/LandingPage'),
  loading: Loading
})

const config = {
  firebase_config: {
    apiKey: 'AIzaSyClErg5_br0n6rh863romTewtDXUwczYqQ',
    authDomain: 'toptal-trips.firebaseapp.com',
    databaseURL: 'https://toptal-trips.firebaseio.com',
    projectId: 'toptal-trips',
    storageBucket: '',
    messagingSenderId: '851204810915'
  },
  firebase_config_dev: {
    apiKey: 'AIzaSyClErg5_br0n6rh863romTewtDXUwczYqQ',
    authDomain: 'toptal-trips.firebaseapp.com',
    databaseURL: 'https://toptal-trips.firebaseio.com',
    projectId: 'toptal-trips',
    storageBucket: '',
    messagingSenderId: '851204810915'
  },
  firebase_providers: ['google.com', 'password'],
  initial_state: {
    themeSource: {
      isNightModeOn: false,
      source: 'light'
    },
    locale: 'en'
  },
  drawer_width: 256,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
  landingPage: LPAsync
}

export default config
