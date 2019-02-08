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

class Trips extends Component {
  state = {
    isLoading: true,
    trips: []
  };
  
  componentDidMount () {
    const { watchList, watchPath, firebaseApp, auth } = this.props
    let ref = firebaseApp.database().ref('/trips/' + auth.uid)
    watchList(ref, "listTrips")
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
          onClick={() => { history.push(`/trips/edit/${auth.uid}/${trip.key}`) }}
          id={index}>
          {trip.val.photoURL && <Avatar src={trip.val.photoURL} alt='bussines' />}
          {!trip.val.photoURL && <Avatar> <Icon > business </Icon>  </Avatar>}
          <ListItemText primary={trip.val.name} secondary={trip.val.destination} />
        </ListItem>
        <Divider inset />
      </div>
    })
  }

  render () {
    const { intl, trips, theme, history, isGranted, isAuthorised, isLoading} = this.props

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

Trips.propTypes = {
  trips: PropTypes.array,
  history: PropTypes.object,
  isGranted: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { auth, lists, trips } = state

  return {
    trips: lists.listTrips,
    auth,
    isGranted: grant => isGranted(state, grant),
    isAuthorised: auth.isAuthorised,
  }
}

export default connect(
  mapStateToProps
)(injectIntl(withTheme()(withRouter(withFirebase(Trips)))))
