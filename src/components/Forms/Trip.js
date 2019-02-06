import AvatarImageField from 'rmw-shell/lib/components/ReduxFormFields/AvatarImageField'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { ImageCropDialog } from 'rmw-shell/lib/containers/ImageCropDialog'
import { TextField } from 'redux-form-material-ui'
import { connect } from 'react-redux'
import { injectIntl, intlShape } from 'react-intl'
import { setDialogIsOpen } from 'rmw-shell/lib/store/dialogs/actions'
import { withRouter } from 'react-router-dom'
import { withTheme } from '@material-ui/core/styles'

class Form extends Component {
  render() {
    const {
      handleSubmit,
      intl,
      initialized,
      setDialogIsOpen,
      dialogs,
      match
    } = this.props

    const uid = match.params.uid

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

          <AvatarImageField
            name='photoURL'
            disabled={!initialized}
            uid={uid}
            change={this.props.change}
            initialized={initialized}
            intl={intl}
            path={'trips'}
          />

          <div>
            <Field
              name='name'
              disabled={!initialized}
              component={TextField}
              placeholder={intl.formatMessage({ id: 'name_hint' })}
              label={intl.formatMessage({ id: 'name_label' })}
              ref='name'
              withRef
            />
          </div>

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
              component={TextField}
              placeholder={intl.formatMessage({ id: 'start_date_hint' })}
              label={intl.formatMessage({ id: 'start_date_label' })}
              ref='start_date'
              withRef
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

          <ImageCropDialog
            path={`trips/${uid}`}
            fileName={`photoURL`}
            onUploadSuccess={(s) => { this.handlePhotoUploadSuccess(s) }}
            open={dialogs.new_company_photo !== undefined}
            src={dialogs.new_company_photo}
            handleClose={() => { setDialogIsOpen('new_company_photo', undefined) }}
            title={intl.formatMessage({ id: 'change_photo' })}
          />
        </div>

      </form>
    )
  }
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  initialized: PropTypes.bool.isRequired,
  setDialogIsOpen: PropTypes.func.isRequired,
  dialogs: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

Form = reduxForm({ form: 'trip' })(Form)
const selector = formValueSelector('trip')

const mapStateToProps = state => {
  const { intl, vehicleTypes, users, dialogs } = state

  return {
    intl,
    vehicleTypes,
    users,
    dialogs,
    photoURL: selector(state, 'photoURL')
  }
}

export default connect(
  mapStateToProps, { setDialogIsOpen }
)(injectIntl(withRouter(withTheme()(Form))))
