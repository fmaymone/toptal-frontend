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
  componentDidMount () {
    const { watchList, firebaseApp } = this.props

    let ref = firebaseApp.database().ref('trips').limitToFirst(20)

    watchList(ref)
  }

  renderList (trips) {
    const { history } = this.props

    if (trips === undefined) {
      return <div />
    }

    return trips.map((trip, index) => {
      return <div key={index}>
        <ListItem
          key={index}
          onClick={() => { history.push(`/trips/edit/${trip.key}`) }}
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
    const { intl, trips, theme, history, isGranted } = this.props

    return (
      <Activity
        isLoading={trips === undefined}
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
              isGranted('create_trip') &&
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
  const { auth, lists } = state

  return {
    trips: lists.trips,
    auth,
    isGranted: grant => isGranted(state, grant)
  }
}

export default connect(
  mapStateToProps
)(injectIntl(withTheme()(withRouter(withFirebase(Trips)))))
