import AvatarImageField from 'rmw-shell/lib/components/ReduxFormFields/AvatarImageField'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { ImageCropDialog } from 'rmw-shell/lib/containers/ImageCropDialog'
import { TextField, DatePicker } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import { TimePicker } from 'material-ui-pickers'
import { DateTimePicker } from 'material-ui-pickers'
import {Test} from './Test'
import axios from 'axios'
import { load as loadAccount } from './account'
import { initialize } from 'redux-form'
import { fetchTrip } from '../../store/actions/tripActions';


import config from '../../config'
const data = {
  // used to populate "account" reducer when "Load" is clicked
  destination: 'From Data',
}

class Form extends Component {


  render() {
    const {
      intl,
      setDialogIsOpen,
      dialogs,
      match,
      values,
      handleSubmit,
      load,
      mySubmit
    } = this.props

    const uid = match.params.uid

    const initialized = true
    
    return (
      <form onSubmit={handleSubmit} style={{
        height: '100%',
        alignItems: 'strech',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button type='submit' style={{ display: 'none' }} />

        <div style={{ margin: 15, display: 'flex', flexDirection: 'column' }}>

          <div>
            <Field
              name='destination'
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'destination_hint' })}
              label={intl.formatMessage({ id: 'destination_label' })}
              ref='destination'
              withRef
            />
          </div>


          <div>
            
            <Field
              name='start_date'
              disabled={!initialized}
              placeholder={intl.formatMessage({ id: 'start_date_hint' })}
              label={intl.formatMessage({ id: 'start_date_label' })}
              ref='start_date'
              withRef
              component={TextField} 

            />
          </div>
         
          <div>
            <Field
              name='end_date'
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'end_date_hint' })}
              label={intl.formatMessage({ id: 'end_date_label' })}
              ref='end_date'
              withRef
            />
          </div>

          <div>
            <Field
              name='comment'
              disabled={!initialized}
              component={TextField}
              multiline
              rows={2}
              placeholder={intl.formatMessage({ id: 'comment_hint' })}
              label={intl.formatMessage({ id: 'comment_label' })}
              ref='comment'
              withRef
            />
          </div>
        </div>

      </form>
    )
  }
}

Form.propTypes = {
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

Form = reduxForm({ form: 'trip', enableReinitialize : true })(Form)

const selector = formValueSelector('trip')

const mapStateToProps = (state, ownProps) => {
  const { intl, vehicleTypes, users, dialogs, trip } = state

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    initialValues: ownProps.initValues

  }
}

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(withTheme()(Form))))
