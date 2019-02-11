import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withTheme } from '@material-ui/core/styles'
import { injectIntl } from 'react-intl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import { withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import { withFirebase } from 'firekit-provider'
import isGranted from 'rmw-shell/lib/utils/auth'
import { Activity, Scrollbar } from 'rmw-shell'
import axios from 'axios';

class Trips extends Component {
  state = {
    isLoading: true,
    trips: []
  };
  
  componentDidMount () {
    this.fetchData();
  }

  fetchData = async () => {
    axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NDk5NzYyMDR9.nFjiVC4vcHyimZ8wauW1VraoXRydIz7rYIoFXHp7c_A';
    axios.defaults.headers.common['Accept'] = 'application/vnd.trips.v1+json';
    await axios.get(`https://toptal-backend-fmaymone.c9users.io/trips`) 
    .then(res => {
      const trips = res.data;
      this.setState({ 
        trips: trips,
        isLoading: false
       });
    })
  }


  renderList (trips) {
    const { history, auth } = this.props

    if (trips === undefined) {
      return <div />
    }

    return trips.map((trip, index) => {
      return <div key={index}>
        <ListItem
          key={index}
          id={trip.id}
          onClick={() => { history.push(`/trips/edit/${trip.id}`) }}
          id={index}>
          <ListItemText primary={trip.destination} secondary={trip.start_date} />
        </ListItem>
        <Divider inset />
      </div>
    })
  }

  render () {
    const { intl,  theme, history, isAuthorised } = this.props

    const { trips, isLoading} = this.state

    if(isLoading){
      return <div/>
    }
    else{
    return (
      <Activity
        isLoading={isLoading}
        containerStyle={{ overflow: 'hidden' }}
        title={intl.formatMessage({ id: 'trips' })}>
        <Scrollbar>

          <div style={{ overflow: 'none', backgroundColor: theme.palette.convasColor }}>
            <List id='test' style={{ height: '100%' }} ref={(field) => { this.list = field }}>
              {this.renderList(trips)}
            </List>
          </div>

          <div style={{ position: 'fixed', right: 18, zIndex: 3, bottom: 18 }}>
            {
              isAuthorised &&
              <Button variant='fab' color='secondary' onClick={() => { history.push(`/trips/create`) }} >
                <Icon className='material-icons' >add</Icon>
              </Button>
            }
          </div>

        </Scrollbar>

      </Activity>
    )
          }
  }
}

Trips.propTypes = {
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { auth, trips, isLoading } = state

  return {
    trips,
    isLoading,
    auth,
    isGranted: grant => isGranted(state, grant),
    isAuthorised: auth.isAuthorised,
  }
}

export default connect(
  mapStateToProps
)(injectIntl(withTheme()(withRouter(withFirebase(Trips)))))
